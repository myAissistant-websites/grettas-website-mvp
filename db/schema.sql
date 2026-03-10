-- Multi-tenant real estate listings database schema
-- Requires PostgreSQL with PostGIS extension

CREATE EXTENSION IF NOT EXISTS postgis;

-- ─── Offices ──────────────────────────────────────────────────────────────

CREATE TABLE offices (
    id          SERIAL PRIMARY KEY,
    office_key  TEXT UNIQUE NOT NULL,             -- CREA DDF ListOfficeKey
    name        TEXT NOT NULL,
    phone       VARCHAR(30),
    email       VARCHAR(255),
    address     TEXT,
    city        TEXT,
    province    TEXT,
    postal_code TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Agents ───────────────────────────────────────────────────────────────

CREATE TABLE agents (
    id          SERIAL PRIMARY KEY,
    agent_key   TEXT UNIQUE NOT NULL,             -- CREA DDF ListAgentKey
    office_id   INT REFERENCES offices(id) ON DELETE SET NULL,
    first_name  VARCHAR(100),
    last_name   VARCHAR(100),
    email       VARCHAR(255),
    phone       VARCHAR(30),
    photo_url   TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_agents_office_id ON agents (office_id);

-- ─── Listings ─────────────────────────────────────────────────────────────

CREATE TABLE listings (
    id              SERIAL PRIMARY KEY,
    listing_key     TEXT UNIQUE NOT NULL,          -- CREA DDF ListingKey
    mls_number      TEXT,
    agent_id        INT REFERENCES agents(id) ON DELETE SET NULL,
    office_id       INT REFERENCES offices(id) ON DELETE SET NULL,

    -- Address
    street_number   TEXT,
    street_name     TEXT,
    street_suffix   TEXT,
    unit_number     TEXT,
    city            TEXT,
    province        TEXT DEFAULT 'ON',
    postal_code     TEXT,
    neighbourhood   TEXT,
    full_address    TEXT NOT NULL,

    -- Geographic (PostGIS)
    location        GEOMETRY(Point, 4326),         -- SRID 4326 = WGS84

    -- Pricing
    list_price      NUMERIC,
    rent_price      NUMERIC,
    is_rental       BOOLEAN NOT NULL DEFAULT FALSE,
    rent_frequency  TEXT,

    -- Property details
    beds            SMALLINT NOT NULL DEFAULT 0,
    beds_above      SMALLINT,
    beds_below      SMALLINT,
    baths           SMALLINT NOT NULL DEFAULT 0,
    baths_full      SMALLINT,
    baths_half      SMALLINT,
    sqft            INT,
    lot_size        TEXT,
    lot_dimensions  TEXT,
    property_type   TEXT,
    building_type   TEXT,
    storeys         TEXT,
    year_built      SMALLINT,
    description     TEXT,
    status          TEXT NOT NULL DEFAULT 'Active',

    -- Media
    photos          TEXT[],                        -- Array of photo URLs
    virtual_tour    TEXT,

    -- Building & structure
    construction_material TEXT,
    foundation      TEXT,
    roof            TEXT,
    exterior_features TEXT,

    -- Interior
    flooring        TEXT,
    interior_features TEXT,
    appliances      TEXT,
    basement        TEXT,

    -- Utilities
    heating         TEXT,
    heating_fuel    TEXT,
    cooling         TEXT,
    water_source    TEXT,
    sewer           TEXT,

    -- Parking
    parking_total   SMALLINT,
    garage_spaces   SMALLINT,
    parking_features TEXT,

    -- Financial
    tax_amount      NUMERIC,
    tax_year        SMALLINT,
    association_fee NUMERIC,
    association_fee_frequency TEXT,

    -- Rooms (JSON array for flexibility)
    rooms           JSONB DEFAULT '[]',
    rooms_total     SMALLINT,

    -- Misc
    zoning          TEXT,
    community_features TEXT,
    pool_features   TEXT,
    fencing         TEXT,

    -- Required
    realtor_ca_url  TEXT,
    listing_brokerage TEXT,

    -- Timestamps
    list_date           TIMESTAMPTZ,
    modification_date   TIMESTAMPTZ,
    ddf_last_synced     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Spatial index for bounding-box queries
CREATE INDEX idx_listings_location ON listings USING GIST (location);

-- Filtering indexes
CREATE INDEX idx_listings_agent_id ON listings (agent_id);
CREATE INDEX idx_listings_office_id ON listings (office_id);
CREATE INDEX idx_listings_status ON listings (status);
CREATE INDEX idx_listings_city ON listings (city);
CREATE INDEX idx_listings_property_type ON listings (property_type);
CREATE INDEX idx_listings_list_date ON listings (list_date DESC);

-- Composite index for common multi-tenant + bbox query pattern
CREATE INDEX idx_listings_agent_status ON listings (agent_id, status);
CREATE INDEX idx_listings_office_status ON listings (office_id, status);

-- ─── Row Level Security ──────────────────────────────────────────────────
-- All listing data is public (read-only). Writes require the service role key.

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE offices ENABLE ROW LEVEL SECURITY;

-- Public read access (anon and authenticated roles)
CREATE POLICY "listings_public_read" ON listings FOR SELECT USING (true);
CREATE POLICY "agents_public_read" ON agents FOR SELECT USING (true);
CREATE POLICY "offices_public_read" ON offices FOR SELECT USING (true);

-- ─── RPC Functions ──────────────────────────────────────────────────────

-- Update listing location via PostGIS (called from DDF importer)
CREATE OR REPLACE FUNCTION update_listing_location(
    p_listing_key TEXT,
    p_lat DOUBLE PRECISION,
    p_lng DOUBLE PRECISION
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.listings
    SET location = public.ST_SetSRID(public.ST_MakePoint(p_lng, p_lat), 4326)
    WHERE listing_key = p_listing_key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Only the service role (postgres) should call this write function
REVOKE EXECUTE ON FUNCTION update_listing_location FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION update_listing_location FROM anon;
REVOKE EXECUTE ON FUNCTION update_listing_location FROM authenticated;

-- Spatial query: find listings within a bounding box with optional filters
CREATE OR REPLACE FUNCTION get_listings_in_bbox(
    bbox_west DOUBLE PRECISION,
    bbox_south DOUBLE PRECISION,
    bbox_east DOUBLE PRECISION,
    bbox_north DOUBLE PRECISION,
    filter_agent_id INT DEFAULT NULL,
    filter_office_id INT DEFAULT NULL,
    filter_agent_key TEXT DEFAULT NULL,
    filter_office_key TEXT DEFAULT NULL,
    filter_status TEXT DEFAULT 'Active',
    filter_tt TEXT DEFAULT NULL,
    filter_min_price NUMERIC DEFAULT NULL,
    filter_max_price NUMERIC DEFAULT NULL,
    filter_min_beds INT DEFAULT NULL,
    filter_min_baths INT DEFAULT NULL,
    filter_property_type TEXT DEFAULT NULL,
    max_results INT DEFAULT 5000
)
RETURNS TABLE (
    id TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    price NUMERIC,
    beds SMALLINT,
    baths SMALLINT,
    sqft INT,
    address TEXT,
    photo TEXT,
    "propertyType" TEXT,
    "isRental" BOOLEAN,
    status TEXT,
    "listDate" TIMESTAMPTZ
) AS $$
BEGIN
    -- Validate bbox coordinates (west > east is allowed for antimeridian-crossing boxes)
    IF bbox_south < -90 OR bbox_north > 90 OR bbox_west < -180 OR bbox_east > 180 OR bbox_south >= bbox_north THEN
        RAISE EXCEPTION 'Invalid bbox coordinates';
    END IF;

    RETURN QUERY
    SELECT
        l.listing_key AS id,
        public.ST_Y(l.location) AS lat,
        public.ST_X(l.location) AS lng,
        COALESCE(l.list_price, l.rent_price, 0) AS price,
        l.beds,
        l.baths,
        l.sqft,
        l.full_address AS address,
        l.photos[1] AS photo,
        l.property_type AS "propertyType",
        l.is_rental AS "isRental",
        l.status,
        l.list_date AS "listDate"
    FROM public.listings l
    LEFT JOIN public.agents a ON l.agent_id = a.id
    LEFT JOIN public.offices o ON l.office_id = o.id
    WHERE l.location IS NOT NULL
      AND l.location OPERATOR(public.&&) public.ST_MakeEnvelope(bbox_west, bbox_south, bbox_east, bbox_north, 4326)
      AND (filter_status IS NULL OR l.status = filter_status)
      AND (filter_agent_id IS NULL OR l.agent_id = filter_agent_id)
      AND (filter_office_id IS NULL OR l.office_id = filter_office_id)
      AND (filter_agent_key IS NULL OR a.agent_key = filter_agent_key)
      AND (filter_office_key IS NULL OR o.office_key = filter_office_key)
      AND (filter_tt IS NULL
           OR (filter_tt = 'sale' AND l.is_rental = FALSE)
           OR (filter_tt = 'rent' AND l.is_rental = TRUE))
      AND (filter_min_price IS NULL OR COALESCE(l.list_price, l.rent_price, 0) >= filter_min_price)
      AND (filter_max_price IS NULL OR COALESCE(l.list_price, l.rent_price, 0) <= filter_max_price)
      AND (filter_min_beds IS NULL OR l.beds >= filter_min_beds)
      AND (filter_min_baths IS NULL OR l.baths >= filter_min_baths)
      AND (filter_property_type IS NULL OR l.property_type = filter_property_type)
    ORDER BY l.listing_key
    LIMIT max_results;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER STABLE SET search_path = '';
