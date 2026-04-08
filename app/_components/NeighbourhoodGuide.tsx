import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { MapPin } from 'lucide-react'

export function NeighbourhoodGuide({ showHeader = true }: { showHeader?: boolean }) {
    const neighbourhoods = [
        {
            name: 'Hespeler',
            city: 'Cambridge',
            desc: 'Small-town charm with big upside. Growing fast, family-friendly, and still undervalued compared to KW. Smart buyers are moving here now.',
            tags: ['Families', 'Growth Area', 'Value'],
            link: '/listings',
        },
        {
            name: 'Preston',
            city: 'Cambridge',
            desc: "Riverside living, established streets, and a tight-knit community feel. One of Cambridge's most desirable pockets. Listings move fast.",
            tags: ['Riverside', 'Established', 'Walkable'],
            link: '/listings',
        },
        {
            name: 'Galt',
            city: 'Cambridge',
            desc: "Historic architecture, the Grand River, and price points that still make sense. Galt is quietly becoming one of Ontario's best-kept secrets.",
            tags: ['Character Homes', 'Grand River', 'Opportunity'],
            link: '/listings',
        },
        {
            name: 'Downtown Kitchener',
            city: 'Kitchener',
            desc: 'The innovation district is booming. LRT access, new condo developments, and a vibrant food scene. Perfect for young professionals and investors.',
            tags: ['LRT Access', 'Investment', 'Urban'],
            link: '/listings',
        },
        {
            name: 'Uptown Waterloo',
            city: 'Waterloo',
            desc: 'Vibrant, walkable, and growing fast. Perfect for young professionals and investors. High demand means you need to act quickly.',
            tags: ['Walkable', 'LRT Access', 'Investment'],
            link: '/listings',
        },
        {
            name: 'Eagle Place',
            city: 'Brantford',
            desc: 'Affordable entry point with strong rental potential. Close to Laurier Brantford campus and the downtown core. A smart first investment.',
            tags: ['Affordable', 'Rental Potential', 'First-Time Buyers'],
            link: '/listings',
        },
    ]

    return (
        <section className={`${showHeader ? 'py-20 md:py-32' : 'py-8 md:py-12'} bg-white relative`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {showHeader && (
                    <AnimatedSection className="mb-16 md:mb-20 text-center">
                        <SectionLabel text="Explore the Region" />
                        <h2 className="font-display text-4xl md:text-5xl text-brand-text mb-6">
                            Find Your <span className="italic text-brand-accent-light">Neighbourhood</span>
                        </h2>
                        <p className="text-brand-text-muted text-base leading-relaxed font-light max-w-xl mx-auto">
                            Every neighbourhood has a personality. Here are the areas Gretta knows inside and out.
                        </p>
                    </AnimatedSection>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {neighbourhoods.map((n, index) => (
                        <AnimatedSection key={index}>
                            <Link
                                href={n.link}
                                className="group block bg-brand-bg border border-brand-border/50 p-8 h-full transition-all duration-500 hover:border-brand-gold/30 hover:shadow-lg hover:shadow-brand-gold/[0.04] relative"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-display text-2xl text-brand-text group-hover:text-brand-accent-light transition-colors duration-300">
                                            {n.name}
                                        </h3>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-text-muted mt-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {n.city}
                                        </p>
                                    </div>
                                    <span className="text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg mt-1">
                                        &rarr;
                                    </span>
                                </div>

                                <p className="text-brand-text-muted text-sm leading-relaxed font-light mb-6">
                                    {n.desc}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {n.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[9px] uppercase tracking-[0.15em] font-medium text-brand-gold/80 bg-brand-gold/[0.06] border border-brand-gold/10 px-2.5 py-1"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection className="mt-12 text-center">
                    <Link
                        href="/listings"
                        className="inline-flex items-center gap-3 text-brand-text font-medium text-sm uppercase tracking-[0.2em] group"
                    >
                        <span>Search All Listings</span>
                        <span className="w-8 h-[1px] bg-brand-text group-hover:w-12 transition-all duration-300" />
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    )
}
