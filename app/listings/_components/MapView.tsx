'use client'

import { useState, useCallback, useEffect, useRef, useMemo, useSyncExternalStore } from 'react'
import { ListingMap, type MapBounds } from './ListingMap'
import { MapPinCard } from './MapPinCard'
import { ChevronLeft, ChevronRight, MapPin as MapPinIcon, Home } from 'lucide-react'
import type { MapPin } from '@/lib/listings'
import { filterPins } from '@/lib/filter-pins'

interface MapViewProps {
    filterParams: Record<string, string>
    initialPins?: MapPin[]
}

const PER_PAGE = 20

const DESKTOP_QUERY = '(min-width: 1024px)'

function subscribeDesktop(callback: () => void) {
    const mq = window.matchMedia(DESKTOP_QUERY)
    mq.addEventListener('change', callback)
    return () => mq.removeEventListener('change', callback)
}

function getDesktopSnapshot() {
    return window.matchMedia(DESKTOP_QUERY).matches
}

function getDesktopServerSnapshot() {
    return false
}

function parseBbox(bbox: string | null): MapBounds | undefined {
    if (!bbox) return undefined
    const parts = bbox.split(',').map(Number)
    if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) return undefined
    const [west, south, east, north] = parts
    return { west, south, east, north }
}

// ─── Loading neighbourhood messages ──────────────────────────────────────

function getLoadingAreas(): string[] {
    return ['Cambridge', 'Kitchener', 'Waterloo', 'Guelph', 'Brantford']
}

function useRotatingText(items: string[], intervalMs = 2200) {
    const [index, setIndex] = useState(0)
    const [fade, setFade] = useState(true)

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false)
            setTimeout(() => {
                setIndex((i) => (i + 1) % items.length)
                setFade(true)
            }, 300)
        }, intervalMs)
        return () => clearInterval(timer)
    }, [items.length, intervalMs])

    return { text: items[index], fade }
}

function LoadingSidebar() {
    const areas = useMemo(() => getLoadingAreas(), [])
    const { text, fade } = useRotatingText(areas)

    return (
        <>
            <div className="px-3 py-3 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <div className="relative w-4 h-4">
                        <Home className="w-4 h-4 text-brand-accent animate-pulse" />
                    </div>
                    <p className="text-sm text-gray-500">
                        Searching{' '}
                        <span
                            className={`font-semibold text-brand-accent inline-block transition-all duration-300 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
                        >
                            {text}
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex gap-3 p-3 border-b border-gray-200"
                        style={{ animationDelay: `${i * 150}ms` }}
                    >
                        <div
                            className="w-[140px] h-[100px] rounded flex-shrink-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
                            style={{
                                backgroundSize: '200% 100%',
                                animation: `shimmer 1.5s ease-in-out infinite ${i * 150}ms`,
                            }}
                        />
                        <div className="flex-1 space-y-2.5 py-1">
                            <div
                                className="h-4 rounded w-2/3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
                                style={{
                                    backgroundSize: '200% 100%',
                                    animation: `shimmer 1.5s ease-in-out infinite ${i * 150 + 75}ms`,
                                }}
                            />
                            <div
                                className="h-3 rounded w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
                                style={{
                                    backgroundSize: '200% 100%',
                                    animation: `shimmer 1.5s ease-in-out infinite ${i * 150 + 150}ms`,
                                }}
                            />
                            <div
                                className="h-3 rounded w-1/2 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
                                style={{
                                    backgroundSize: '200% 100%',
                                    animation: `shimmer 1.5s ease-in-out infinite ${i * 150 + 225}ms`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
            `}</style>
        </>
    )
}

function LoadingMapOverlay() {
    const areas = useMemo(() => getLoadingAreas(), [])
    const { text, fade } = useRotatingText(areas, 2200)

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-full px-5 py-2.5 flex items-center gap-3">
            <div className="relative w-5 h-5">
                <MapPinIcon
                    className="w-5 h-5 text-brand-accent animate-bounce"
                    style={{ animationDuration: '1.5s' }}
                />
            </div>
            <div className="text-sm">
                <span className="text-gray-500">Loading </span>
                <span
                    className={`font-semibold text-brand-accent transition-all duration-300 inline-block ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
                >
                    {text}
                </span>
                <span className="text-gray-400 ml-0.5">...</span>
            </div>
        </div>
    )
}

export function MapView({ filterParams, initialPins }: MapViewProps) {
    const [pins, setPins] = useState<MapPin[] | null>(initialPins?.length ? initialPins : null)
    const [page, setPage] = useState(0)
    const [fetching, setFetching] = useState(!initialPins?.length)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const abortRef = useRef<AbortController | null>(null)
    const [currentBounds, setCurrentBounds] = useState<MapBounds | null>(null)

    // Parse initial bounds from URL bbox param (for shared links)
    const initialBounds = useMemo(() => parseBbox(filterParams.bbox), [filterParams.bbox])

    // Stabilize filterParams reference to prevent unnecessary re-fetches
    const filterKey = useMemo(() => JSON.stringify(filterParams), [filterParams])
    const stableFilterParams = useMemo(() => filterParams, [filterKey]) // eslint-disable-line react-hooks/exhaustive-deps

    // Detect desktop (lg breakpoint = 1024px)
    const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, getDesktopServerSnapshot)

    // Reset page when filters change (React-approved "set state during render" pattern)
    const [prevFilterKey, setPrevFilterKey] = useState(filterKey)
    if (filterKey !== prevFilterKey) {
        setPrevFilterKey(filterKey)
        setPage(0)
    }

    // Fetch ALL pins once from the ISR-cached endpoint
    // On Vercel this is served from CDN edge cache — instant after first build
    useEffect(() => {
        if (pins !== null) return // already fetched

        abortRef.current?.abort()
        const controller = new AbortController()
        abortRef.current = controller

        fetch('/api/listings/map-pins', { signal: controller.signal })
            .then((r) => {
                if (!r.ok) throw new Error(`API error: ${r.status}`)
                return r.json()
            })
            .then((data) => {
                if (!controller.signal.aborted) {
                    setPins(data.pins || [])
                    setFetching(false)
                }
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    console.error('Failed to fetch listings:', err)
                    setPins([])
                    setFetching(false)
                }
            })

        return () => controller.abort()
    }, [pins])

    // Track bounds changes for the sidebar
    const handleBoundsChange = useCallback((b: MapBounds) => {
        setCurrentBounds(b)
        setPage(0)
    }, [])

    // All filtered pins (for the map — always show all markers)
    const allFilteredPins = useMemo(() => {
        if (!pins) return []
        return filterPins(pins, stableFilterParams)
    }, [pins, stableFilterParams])

    // Viewport-restricted pins (for the sidebar), with photo listings first
    const visiblePins = useMemo(() => {
        const filtered = !currentBounds
            ? allFilteredPins
            : allFilteredPins.filter(
                  (p) =>
                      p.lat != null &&
                      p.lng != null &&
                      p.lat >= currentBounds.south &&
                      p.lat <= currentBounds.north &&
                      p.lng >= currentBounds.west &&
                      p.lng <= currentBounds.east
              )
        // Prioritize listings with photos
        return filtered.toSorted((a, b) => (b.photo ? 1 : 0) - (a.photo ? 1 : 0))
    }, [allFilteredPins, currentBounds])

    const totalPages = Math.max(1, Math.ceil(visiblePins.length / PER_PAGE))
    const sidebarPins = useMemo(() => visiblePins.slice(page * PER_PAGE, (page + 1) * PER_PAGE), [visiblePins, page])

    // Scroll sidebar to top on page change
    useEffect(() => {
        sidebarRef.current?.scrollTo({ top: 0 })
    }, [page])

    const loading = pins === null

    return (
        <div className="flex h-[calc(100vh-180px)] min-h-[500px]">
            {/* Sidebar */}
            <div className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 flex flex-col bg-white border-r border-gray-200">
                {loading ? (
                    <LoadingSidebar />
                ) : (
                    <>
                        <div className="px-3 py-2 border-b border-gray-200 flex-shrink-0">
                            <p className="text-sm text-gray-600">
                                Results:{' '}
                                <strong className="text-gray-900">
                                    {visiblePins.length.toLocaleString()} Listings
                                </strong>
                            </p>
                        </div>

                        <div ref={sidebarRef} className="flex-1 overflow-y-auto">
                            {sidebarPins.length > 0 ? (
                                sidebarPins.map((pin) => <MapPinCard key={pin.id} pin={pin} />)
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500 text-sm p-4 text-center">
                                    No listings in the current map area. Try zooming out or panning.
                                </div>
                            )}
                        </div>

                        {visiblePins.length > PER_PAGE && (
                            <div className="flex items-center justify-center gap-3 px-3 py-2.5 border-t border-gray-200 flex-shrink-0 bg-white">
                                <button
                                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                                    disabled={page === 0}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-medium text-gray-600">
                                    {page + 1} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                    disabled={page === totalPages - 1}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Map — only mounted on desktop */}
            {isDesktop && (
                <div className="flex-1 relative">
                    <ListingMap
                        pins={allFilteredPins}
                        initialBounds={initialBounds}
                        onBoundsChange={handleBoundsChange}
                    />

                    {(loading || fetching) && <LoadingMapOverlay />}
                </div>
            )}
        </div>
    )
}
