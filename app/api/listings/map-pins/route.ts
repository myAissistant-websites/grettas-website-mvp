import { NextResponse } from 'next/server'
import { getAllMapPins } from '@/lib/listings'

// ISR: regenerate this response every 5 minutes.
// On Vercel, the result is cached at the CDN edge — subsequent requests
// within the revalidate window are served instantly from the edge cache.
// After expiry, the next request triggers a background regeneration
// (stale-while-revalidate) so users never wait for the DDF fetch.
export const revalidate = 300
export const dynamic = 'force-static'

export async function GET() {
    try {
        const { pins, totalCount } = await getAllMapPins()
        return NextResponse.json({ pins, totalCount })
    } catch (error) {
        console.error('Map pins query error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
