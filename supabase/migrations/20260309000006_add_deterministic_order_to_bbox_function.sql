-- Add ORDER BY listing_key to get_listings_in_bbox for deterministic pagination.
-- Without a stable sort, PostgREST .range() pagination can return duplicates
-- when rows shift between pages.

CREATE OR REPLACE FUNCTION public.get_listings_in_bbox(
    bbox_west double precision,
    bbox_south double precision,
    bbox_east double precision,
    bbox_north double precision,
    filter_agent_id integer DEFAULT NULL,
    filter_office_id integer DEFAULT NULL,
    filter_agent_key text DEFAULT NULL,
    filter_office_key text DEFAULT NULL,
    filter_status text DEFAULT 'Active',
    filter_tt text DEFAULT NULL,
    filter_min_price numeric DEFAULT NULL,
    filter_max_price numeric DEFAULT NULL,
    filter_min_beds integer DEFAULT NULL,
    filter_min_baths integer DEFAULT NULL,
    filter_property_type text DEFAULT NULL,
    max_results integer DEFAULT 5000
)
RETURNS TABLE (
    id text,
    lat double precision,
    lng double precision,
    price numeric,
    beds smallint,
    baths smallint,
    sqft integer,
    address text,
    photo text,
    "propertyType" text,
    "isRental" boolean,
    status text,
    "listDate" timestamptz
) AS $$
BEGIN
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
