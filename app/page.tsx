import { HeroSection } from './_components/HeroSection'
import { StatsSection } from './_components/StatsSection'
import { FeaturedListings } from './_components/FeaturedListings'
import { AboutPreview } from './_components/AboutPreview'
import { WhyChooseChris } from './_components/WhyChooseChris'
import { NeighbourhoodGuide } from './_components/NeighbourhoodGuide'
import { TestimonialsSection } from './_components/TestimonialsSection'
import { ContactCTA } from './_components/ContactCTA'
import { ContactForm } from '@/components/ContactForm'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { Suspense } from 'react'

export default function Home() {
    return (
        <>
            <HeroSection />
            <StatsSection />

            <Suspense
                fallback={
                    <section className="py-20 md:py-28 bg-brand-bg">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-white border border-brand-border/30 animate-pulse"
                                    >
                                        <div className="h-52 bg-brand-bg-alt" />
                                        <div className="p-5 space-y-3">
                                            <div className="h-5 bg-brand-bg-alt rounded w-1/3" />
                                            <div className="h-4 bg-brand-bg-alt rounded w-2/3" />
                                            <div className="h-3 bg-brand-bg-alt rounded w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                }
            >
                <FeaturedListings />
            </Suspense>

            <WhyChooseChris />
            <AboutPreview />

            <NeighbourhoodGuide />

            <TestimonialsSection />
            <ContactCTA />

            <section className="bg-white py-24 md:py-32 border-t border-brand-border/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading - always first */}
                    <div className="text-left mb-12 lg:mb-0">
                        <h2 className="font-display text-4xl md:text-5xl text-brand-text mb-6 text-balance">
                            Let&apos;s Chat
                        </h2>
                        <p className="text-brand-text-muted text-base leading-relaxed font-light max-w-lg lg:hidden">
                            Real estate decisions are big. You shouldn&apos;t have to figure them out alone, and you
                            shouldn&apos;t feel pressured into anything. Reach out, we&apos;ll talk through what
                            you&apos;re thinking, no strings attached.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Left column: description (desktop only) + contact card */}
                        <div className="flex flex-col text-left order-2 lg:order-1">
                            <p className="text-brand-text-muted text-base leading-relaxed font-light mb-12 max-w-lg hidden lg:block">
                                Real estate decisions are big. You shouldn&apos;t have to figure them out alone, and you
                                shouldn&apos;t feel pressured into anything. Reach out, we&apos;ll talk through what
                                you&apos;re thinking, no strings attached.
                            </p>

                            <div className="bg-brand-bg-alt p-8 border border-brand-border/50">
                                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-text mb-8 border-b border-brand-border/50 pb-4">
                                    Real people call and text back. No bots, no assistants, just Gretta.
                                </p>

                                <div className="space-y-6">
                                    <a
                                        href="tel:519-590-3236"
                                        className="flex items-center gap-4 text-brand-text group"
                                    >
                                        <span className="w-12 h-12 flex items-center justify-center border border-brand-gold/30 group-hover:border-brand-gold/60 transition-colors duration-300">
                                            <span className="text-brand-gold text-lg">&#9742;</span>
                                        </span>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-xl">(519) 590-3236</span>
                                            <span className="text-[10px] text-brand-text-muted uppercase tracking-[0.2em] mt-1">
                                                Call or text anytime
                                            </span>
                                        </div>
                                    </a>
                                </div>

                                <div className="mt-10 pt-8 border-t border-brand-border/50">
                                    <p className="text-[10px] font-medium text-brand-text-muted mb-4 uppercase tracking-[0.2em]">
                                        Follow for Market Updates
                                    </p>
                                    <div className="flex gap-3">
                                        <a
                                            href="https://www.instagram.com/gretta.hughes/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 border border-brand-border/50 flex items-center justify-center text-brand-text hover:text-brand-gold hover:border-brand-gold/40 transition-all duration-300"
                                        >
                                            <span className="sr-only">Instagram</span>
                                            <Instagram className="w-4 h-4" />
                                        </a>
                                        <a
                                            href="https://www.facebook.com/grettahughes.ca/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 border border-brand-border/50 flex items-center justify-center text-brand-text hover:text-brand-gold hover:border-brand-gold/40 transition-all duration-300"
                                        >
                                            <span className="sr-only">Facebook</span>
                                            <Facebook className="w-4 h-4" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/gretta-hughes-345374200/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 border border-brand-border/50 flex items-center justify-center text-brand-text hover:text-brand-gold hover:border-brand-gold/40 transition-all duration-300"
                                        >
                                            <span className="sr-only">LinkedIn</span>
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right column: form - shows first on mobile */}
                        <div className="bg-white p-8 md:p-10 shadow-xl shadow-black/[0.04] border border-brand-border/30 lg:-mt-10 lg:mb-10 order-1 lg:order-2">
                            <h3 className="font-display text-2xl text-brand-text mb-6">Send a Message</h3>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
