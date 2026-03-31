import Link from 'next/link'
import { getFeaturedListings } from '@/lib/listings'
import { ListingCard } from '@/app/listings/_components/ListingCard'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionLabel } from '@/components/ui/SectionLabel'

export async function FeaturedListings() {
    const listings = await getFeaturedListings(6)

    if (!listings || listings.length === 0) {
        return null
    }

    return (
        <section className="py-20 md:py-28 bg-brand-bg relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="mb-16">
                    <SectionLabel text="Featured Listings" />
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <h2 className="font-display text-4xl md:text-5xl text-brand-text mb-6">
                                Homes Available in the Area
                            </h2>
                            <p className="text-brand-text-muted text-base leading-relaxed font-light">
                                Browse current listings across Waterloo Region, Brant County, and beyond. New
                                properties added daily.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <Link
                                href="/listings"
                                className="inline-flex items-center gap-3 text-brand-text font-medium text-sm uppercase tracking-[0.2em] group"
                            >
                                <span>View All Listings</span>
                                <span className="w-8 h-[1px] bg-brand-text group-hover:w-12 transition-all duration-300" />
                            </Link>
                        </div>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {listings.map((listing, index) => (
                        <AnimatedSection key={listing.id} className={index > 0 ? `hidden sm:block` : ''}>
                            <ListingCard listing={listing} />
                        </AnimatedSection>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link
                        href="/listings"
                        className="inline-block bg-brand-text hover:bg-brand-text/85 text-white font-medium px-8 py-4 transition-all text-center uppercase tracking-[0.2em] text-xs"
                    >
                        View All Listings
                    </Link>
                </div>
            </div>
        </section>
    )
}
