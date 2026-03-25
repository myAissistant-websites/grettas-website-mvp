import { NextRequest, NextResponse } from 'next/server'
import { getAllMapPins, type MapPin } from '@/lib/listings'

/**
 * GET /api/listings?bbox=lng1,lat1,lng2,lat2
 *
 * Returns listings within a bounding box. Fetches ALL pins from the DDF API
 * as a single cached dataset (Next.js ISR, 5 min revalidate) and filters
 * by bbox, transaction type, price, beds, baths, and property type in-memory.
 *
 * Query params:
 *   bbox - required: "west,south,east,north"
 *   tt   - optional: sale|rent (transaction type)
 *   lp   - optional: min price
 *   hp   - optional: max price
 *   bd   - optional: min beds
 *   ba   - optional: min baths
 *   pt   - optional: property type
 *   q    - optional: text search (address/MLS number)
 */
export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams

    const bbox = params.get('bbox')
    if (!bbox) {
        return NextResponse.json({ error: 'bbox parameter is required (west,south,east,north)' }, { status: 400 })
    }

    const parts = bbox.split(',').map(Number)
    if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) {
        return NextResponse.json({ error: 'Invalid bbox format. Expected: west,south,east,north' }, { status: 400 })
    }

    const [west, south, east, north] = parts

    if (south < -90 || north > 90 || west < -180 || east > 180 || south >= north) {
        return NextResponse.json({ error: 'Invalid bbox coordinates' }, { status: 400 })
    }

    try {
        // Fetch all pins from DDF — single cached blob, no per-filter cache fragmentation
        const { pins: allPins } = await getAllMapPins()

        // Apply all filters in-memory
        let pins = allPins.filter(
            (p: MapPin) =>
                p.lat != null && p.lng != null && p.lat >= south && p.lat <= north && p.lng >= west && p.lng <= east
        )

        const tt = params.get('tt')
        if (tt === 'sale') pins = pins.filter((p) => !p.isRental)
        else if (tt === 'rent') pins = pins.filter((p) => p.isRental)

        const lp = params.get('lp') ? Number(params.get('lp')) : NaN
        const hp = params.get('hp') ? Number(params.get('hp')) : NaN
        if (Number.isFinite(lp)) pins = pins.filter((p) => p.price >= lp)
        if (Number.isFinite(hp)) pins = pins.filter((p) => p.price <= hp)

        const bd = params.get('bd') ? Number(params.get('bd')) : NaN
        if (Number.isFinite(bd)) pins = pins.filter((p) => p.beds >= bd)

        const ba = params.get('ba') ? Number(params.get('ba')) : NaN
        if (Number.isFinite(ba)) pins = pins.filter((p) => p.baths >= ba)

        const pt = params.get('pt')
        if (pt) pins = pins.filter((p) => p.propertyType === pt)

        const q = params.get('q')?.trim().toLowerCase()
        if (q) pins = pins.filter((p) => p.address.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))

        return NextResponse.json(
            { pins, totalCount: pins.length },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
                },
            }
        )
    } catch (error) {
        console.error('Listings query error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
