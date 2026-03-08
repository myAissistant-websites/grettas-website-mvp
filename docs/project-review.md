# Project Review: Abdul Basharmal Real Estate Website

**Date:** 2026-03-08
**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Supabase, Mapbox, CREA DDF API, Resend

---

## Security Issues

### Critical

- **No server-side validation on `/api/contact`** -- Client-side Zod validation is easily bypassed. Malicious users can POST arbitrary data directly to the endpoint, consuming Resend email quota or sending malformed emails.
- **HTML injection in email templates** (`app/api/contact/route.ts:56-100`) -- User input is interpolated directly into HTML email templates without escaping. A user submitting `<script>` tags or malicious HTML gets it rendered in the email.
- **OData injection in listing filters** (`lib/listings.ts:171,174,209`) -- Filter values like `city` and `propertyType` are string-interpolated directly into OData queries without escaping. Crafted input could manipulate the query.

### High

- **No rate limiting on contact form API** -- Bots can spam the endpoint, exhausting Resend quota.
- **No CSP headers configured** -- Increases XSS attack surface.
- **Mapbox token has no domain restriction** -- `NEXT_PUBLIC_MAPBOX_TOKEN` is exposed to the client (required), but should be restricted to your domains in the Mapbox dashboard.

### Low

- No CSRF protection on form submissions (mitigated somewhat by same-origin policy).

---

## Performance Issues

### Critical

- **DDF API responses exceed 2MB Next.js cache limit** (`lib/listings.ts:getAllMapPins`) -- Map-pins endpoint fetches full property objects (~2MB+ per batch of 100) without `$select`, so Next.js cannot cache responses. **FIXED:** Added `$select` with only the 18 fields `normalizeDdfToPin` needs.
- **Unoptimized static images** -- `abdul-photo-no-bg-v2.png` (1.2MB), `house-1.jpg` (750KB), `listing-placeholder.jpg` (718KB). These should be converted to WebP and compressed.
- **Plain `<img>` tags instead of `next/image`** in `ListingMap.tsx`, `MapPinCard.tsx`, and `ListingDisclaimer.tsx` -- Missing lazy loading, sizing hints, and format optimization.

### High

- **Mapbox GL not lazy-loaded** (`MapView.tsx`) -- ~500KB+ library imports at module level even on mobile where the map is hidden. Should use `next/dynamic` with `ssr: false`.
- **Framer Motion loaded unconditionally** -- No `prefers-reduced-motion` check; animation library loads even when animations are disabled.
- **Missing `<Suspense>` boundary** on home page (`app/page.tsx:19`) -- Comment mentions it but no actual Suspense wrapping for `FeaturedListings`.

### Medium

- `MortgageCalculator` component not lazy-loaded on tool pages.
- `filterPins()` in MapView creates intermediate arrays on every filter change.
- `ContactForm` not wrapped in `React.memo()`.

---

## Bugs & Code Quality

### High

- **Race condition in MapView** (`MapView.tsx:73`) -- `cancelled` flag set on unmount, but state can still be set on an unmounted component before the flag is checked.
- **Non-null assertion on canvas context** (`ListingMap.tsx:82`) -- `ctx.getContext('2d')!` will throw if context is null.
- **Missing error boundary on listings page** -- If `getListings()` throws in the server component, the entire page crashes with no fallback.
- **Console warnings in production** (`lib/listings.ts:236,301`) -- `console.warn` statements leak configuration details.

### Medium

- **Invalid date handling** (`ListingCard.tsx:8`) -- `new Date(listing.listDate).getTime()` can return NaN for malformed dates.
- **Generic alt text on images** (`ImageGallery.tsx:40`) -- "Property Photo 1" is not descriptive for accessibility.
- **Inconsistent error response format** across API routes.
- **MortgageCalculator** doesn't validate negative numbers or unreasonable interest rate ranges.

---

## Recommended Priority Order

1. **Server-side validation + input sanitization** on `/api/contact` (security)
2. **Escape user input in email templates** (security)
3. **Escape OData filter values** in `lib/listings.ts` (security)
4. **Optimize/compress static images** to WebP (performance)
5. **Replace `<img>` with `next/image`** in map components (performance)
6. **Lazy-load Mapbox GL** with `next/dynamic` (performance)
7. **Add rate limiting** to contact API (security)
8. **Add error boundary** for listings page (reliability)
9. **Fix race condition** in MapView useEffect (bug)
10. **Add Suspense boundary** for async data on home page (performance)
