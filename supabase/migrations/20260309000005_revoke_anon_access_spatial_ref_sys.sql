-- Revoke direct PostgREST API access to spatial_ref_sys
-- We cannot enable RLS (owned by supabase_admin), but we can prevent
-- anon/authenticated from querying it directly via the API.
-- PostGIS functions still access it internally via superuser privileges.
REVOKE SELECT ON public.spatial_ref_sys FROM anon;
REVOKE SELECT ON public.spatial_ref_sys FROM authenticated;
