-- Enable Row Level Security on all public tables
-- All listing data is public (read-only). Writes require the service role key.

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offices ENABLE ROW LEVEL SECURITY;

-- Public read access (anon and authenticated roles)
CREATE POLICY "listings_public_read" ON public.listings FOR SELECT USING (true);
CREATE POLICY "agents_public_read" ON public.agents FOR SELECT USING (true);
CREATE POLICY "offices_public_read" ON public.offices FOR SELECT USING (true);
