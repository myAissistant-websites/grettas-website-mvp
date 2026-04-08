import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function TestimonialsSection() {
    const testimonials = [
        {
            id: 1,
            quote: "Gretta is truly incredible, in every sense of the word! She's trustworthy, knowledgeable, professional, and strategic. She far exceeded our expectations with the sale of our home and our purchase, negotiating excellent deals on both ends.",
            author: 'Krista Lancaster',
            location: 'Google Review',
        },
        {
            id: 2,
            quote: "As a single mom with two kids, buying a home felt overwhelming and honestly pretty intimidating, until I worked with Gretta Hughes. From day one, Gretta was patient, kind, and incredibly supportive. She truly understood my situation and made everything feel possible.",
            author: 'Amanda Knight',
            location: 'Google Review',
        },
        {
            id: 3,
            quote: "Gretta helped us find our first house in Waterloo. She is, indisputably, the best Realtor we have met. She took the time to understand our needs and showed us ONE house which we ended up signing. She is that good.",
            author: 'J J',
            location: 'Google Review',
        },
    ]

    return (
        <section className="py-20 md:py-32 bg-brand-text text-white relative overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <AnimatedSection className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
                    <p className="text-brand-gold tracking-[0.3em] text-xs font-medium uppercase mb-4">What Clients Say</p>
                    <h2 className="font-display text-4xl md:text-5xl text-white">
                        Real Stories from <span className="italic text-brand-gold">Real Families</span>
                    </h2>
                </AnimatedSection>

                {/* Google Reviews Badge */}
                <AnimatedSection className="flex flex-col items-center mb-16 md:mb-20">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="font-display text-5xl md:text-6xl text-white italic">5.0</span>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-brand-gold"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-white/60 text-xs tracking-[0.15em] uppercase">on Google</span>
                        </div>
                    </div>
                    <p className="text-white/50 text-sm font-light tracking-wide">
                        46 five-star reviews from real clients
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <AnimatedSection key={t.id} className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] p-8 md:p-10 flex flex-col relative group hover:bg-white/[0.07] transition-colors duration-500">
                            {/* Quote mark */}
                            <span className="text-brand-gold/20 font-display text-8xl absolute -top-4 left-6 select-none leading-none">
                                &ldquo;
                            </span>

                            <div className="flex gap-1 mb-6 mt-4 relative z-10">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-4 h-4 text-brand-gold"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <div className="flex-1 text-white/80 mb-8 relative z-10 leading-relaxed font-light">
                                <p>&ldquo;{t.quote}&rdquo;</p>
                            </div>

                            <div className="relative z-10">
                                <div className="w-8 h-[1px] bg-brand-gold/40 mb-4" />
                                <p className="text-white font-medium text-sm">{t.author}</p>
                                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mt-1">{t.location}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Read All Reviews Link */}
                <AnimatedSection className="text-center mt-12 md:mt-16">
                    <a
                        href="https://www.google.com/maps/place/Gretta+Hughes+Real+Estate/@43.3952957,-80.3245627,17z/data=!3m2!4b1!5s0x882b89cb57a6e931:0x10275dab25af59df!4m6!3m5!1s0x882b89ef0d2e7ca5:0xa1511652a58fc5a5!8m2!3d43.3952957!4d-80.3219878!16s%2Fg%2F11m_zpplf0?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-brand-gold text-sm tracking-[0.15em] uppercase transition-colors duration-300 group"
                    >
                        <span>Read All 46 Reviews on Google</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </a>
                </AnimatedSection>
            </div>
        </section>
    )
}
