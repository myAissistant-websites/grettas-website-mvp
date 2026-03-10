-- Drop duplicate function overloads caused by VARCHAR/text type mismatch
-- and recreate with correct text types + search_path fix

-- Drop the old insecure overloads (text-based, no search_path)
DROP FUNCTION IF EXISTS public.get_listings_in_bbox(
    double precision, double precision, double precision, double precision,
    integer, integer, text, text, text, text, numeric, numeric, integer, integer, text, integer
);
DROP FUNCTION IF EXISTS public.update_listing_location(text, double precision, double precision);

-- Drop the varchar-based overloads from migration 000002
DROP FUNCTION IF EXISTS public.get_listings_in_bbox(
    double precision, double precision, double precision, double precision,
    character varying, integer, integer, character varying, character varying, character varying,
    numeric, numeric, integer, integer, character varying, integer
);
DROP FUNCTION IF EXISTS public.update_listing_location(character varying, double precision, double precision);

-- Recreate update_listing_location with text types and search_path fix
CREATE OR REPLACE FUNCTION public.update_listing_location(
    p_listing_key text,
    p_lat double precision,
    p_lng double precision
)
RETURNS void AS $$
BEGIN
    UPDATE public.listings
    SET location = public.ST_SetSRID(public.ST_MakePoint(p_lng, p_lat), 4326)
    WHERE listing_key = p_listing_key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

REVOKE EXECUTE ON FUNCTION public.update_listing_location(text, double precision, double precision) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_listing_location(text, double precision, double precision) FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_listing_location(text, double precision, double precision) FROM authenticated;

-- Recreate get_listings_in_bbox with text types and search_path fix
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
    LIMIT max_results;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER STABLE SET search_path = '';
