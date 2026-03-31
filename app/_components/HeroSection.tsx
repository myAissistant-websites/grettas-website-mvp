import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function HeroSection() {
    return (
        <section className="relative w-full bg-brand-bg overflow-hidden lg:min-h-screen">
            {/* Subtle warm gradient backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-bg-alt/30 to-brand-bg pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full relative">
                {/* Desktop layout - unchanged */}
                <div className="hidden lg:flex flex-row items-center min-h-screen">
                    {/* Text Content */}
                    <div className="w-1/2 flex flex-col z-10 pr-12">
                        <AnimatedSection>
                            <div className="w-12 h-[1px] bg-brand-gold mb-8 animate-draw-line" />

                            <p className="text-brand-gold tracking-[0.2em] text-[11px] font-medium uppercase mb-6 whitespace-nowrap">
                                Waterloo Region &middot; Brant County &middot; and Beyond
                            </p>

                            <h1 className="font-display text-6xl 2xl:text-7xl leading-[1.02] text-brand-text mb-6 text-balance">
                                Thoughtful Real Estate,{' '}
                                <span className="italic text-brand-accent-light">Tailored to You.</span>
                            </h1>

                            <div className="text-brand-text-muted text-base 2xl:text-lg leading-relaxed font-light text-pretty space-y-4 max-w-lg">
                                <p>
                                    I&apos;m Gretta Hughes, a Cambridge-based REALTOR&reg; with a genuine
                                    appreciation for the community I call home. I provide a thoughtful
                                    and tailored approach to real estate, guiding clients through each
                                    step with clarity, confidence, and care.
                                </p>
                            </div>

                            <div className="flex flex-row gap-4 mt-10">
                                <Link
                                    href="/listings"
                                    className="bg-brand-text hover:bg-brand-text/85 text-white font-medium px-8 py-4 transition-all text-center uppercase tracking-[0.2em] text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
                                >
                                    Search Listings
                                </Link>
                                <Link
                                    href="/home-evaluation"
                                    className="border border-brand-border hover:border-brand-accent text-brand-text font-medium px-8 py-4 transition-all text-center uppercase tracking-[0.2em] text-xs hover:-translate-y-0.5 duration-300"
                                >
                                    What&apos;s My Home Worth?
                                </Link>
                            </div>

                            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 mt-10 text-[10px] text-brand-text-muted uppercase tracking-[0.15em]">
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-brand-gold" />
                                    RE/MAX Twin City
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-brand-gold" />
                                    100% Club &apos;21–&apos;24
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-brand-gold" />
                                    English &amp; Espa&ntilde;ol
                                </span>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Desktop Image */}
                    <div className="w-1/2 relative flex items-end justify-end self-end">
                        <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[85vh]">
                            <Image
                                src="/images/gretta-hero.jpg"
                                alt="Gretta Hughes - Cambridge & Waterloo Region REALTOR"
                                fill
                                priority
                                sizes="50vw"
                                className="object-cover object-top"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Mobile layout */}
                <div className="flex flex-col lg:hidden pt-[72px]">
                    {/* Thin decorative line - tight to nav */}
                    <div className="w-full h-[1px] bg-brand-gold/30 mb-5 mt-3" />

                    {/* Cities - single line */}
                    <p className="text-brand-gold tracking-[0.15em] text-[8px] sm:text-[10px] font-medium uppercase mb-4 whitespace-nowrap">
                        Waterloo Region &middot; Brant County &middot; and Beyond
                    </p>

                    {/* Heading - full width, sized to fit 2 lines */}
                    <h1 className="font-display text-[2rem] leading-[1.08] sm:text-[2.6rem] text-brand-text mb-5">
                        Thoughtful Real Estate,<br />
                        <span className="italic text-brand-accent-light">Tailored to You.</span>
                    </h1>

                    {/* Bio text + Image side by side */}
                    <div className="grid grid-cols-[1fr_48%] gap-3 items-start mb-8">
                        <div className="text-brand-text-muted text-sm leading-relaxed font-light text-pretty">
                            <p>
                                I&apos;m Gretta Hughes, a Cambridge-based REALTOR&reg; with a genuine
                                appreciation for the community I call home. I provide a thoughtful
                                and tailored approach to real estate, guiding clients through each
                                step with clarity, confidence, and care.
                            </p>
                        </div>

                        <div className="relative aspect-[3/4]">
                            <Image
                                src="/images/gretta-hero.jpg"
                                alt="Gretta Hughes - Cambridge & Waterloo Region REALTOR"
                                fill
                                priority
                                sizes="48vw"
                                className="object-cover object-top"
                            />
                        </div>
                    </div>

                    {/* Full-width CTA buttons */}
                    <div className="flex flex-col gap-3 mb-6">
                        <Link
                            href="/listings"
                            className="bg-brand-text hover:bg-brand-text/85 text-white font-medium px-8 py-4 transition-all text-center uppercase tracking-[0.2em] text-xs shadow-lg"
                        >
                            Search Listings &rarr;
                        </Link>
                        <Link
                            href="/home-evaluation"
                            className="border border-brand-border hover:border-brand-accent text-brand-text font-medium px-8 py-4 transition-all text-center uppercase tracking-[0.2em] text-xs"
                        >
                            What&apos;s My Home Worth?
                        </Link>
                    </div>

                    {/* Trust badges - only 2 on smallest screens to prevent wrapping */}
                    <div className="flex items-center justify-center gap-x-5 pb-8 text-[10px] text-brand-text-muted uppercase tracking-[0.15em]">
                        <span className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-brand-gold" />
                            RE/MAX Twin City
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-brand-gold" />
                            100% Club &apos;21–&apos;24
                        </span>
                        <span className="hidden sm:flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-brand-gold" />
                            English &amp; Espa&ntilde;ol
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
