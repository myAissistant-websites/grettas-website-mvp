-- Drop redundant indexes (duplicated by UNIQUE constraint indexes)
DROP INDEX IF EXISTS idx_agents_agent_key;
DROP INDEX IF EXISTS idx_offices_office_key;

-- Drop unused low-value indexes
-- These are not used by the spatial bbox query path and have low selectivity
DROP INDEX IF EXISTS idx_listings_is_rental;
DROP INDEX IF EXISTS idx_listings_list_price;
DROP INDEX IF EXISTS idx_listings_rent_price;
DROP INDEX IF EXISTS idx_listings_beds;
DROP INDEX IF EXISTS idx_listings_baths;
