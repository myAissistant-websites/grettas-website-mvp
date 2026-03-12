import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function AboutPreview() {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Side */}
                    <AnimatedSection className="relative aspect-[3/4] md:aspect-auto w-full order-2 md:order-1 flex items-center justify-center">
                        <div className="relative w-[280px] h-[370px] md:w-[400px] md:h-[530px] lg:w-[480px] lg:h-[630px]">
                            <Image
                                src="/images/gretta-meet.png"
                                alt="Gretta Hughes - Real Estate Professional"
                                fill
                                className="object-contain object-center"
                                sizes="360px"
                            />
                        </div>
                    </AnimatedSection>

                    {/* Content Side */}
                    <AnimatedSection className="order-1 md:order-2">
                        <SectionLabel text="About Gretta" />
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-text mb-8 leading-[1.1]">
                            From New Beginnings <span className="italic">to Your New Home.</span>
                        </h2>

                        <div className="space-y-6 text-brand-text-muted text-base md:text-lg leading-relaxed font-light mb-10">
                            <p>
                                I moved to Canada from El Salvador when I was 10. Cambridge became home, and it still
                                is. I know what it means to start over, to search for a place that truly feels like yours.
                                That experience drives everything I do as a REALTOR&reg;.
                            </p>
                            <p>
                                Before real estate, I worked as an Early Childhood Educator and Child and Youth Worker.
                                Those years taught me patience, empathy, and how to guide families through big life
                                decisions. Buying or selling a home is one of the biggest.
                            </p>
                            <p>
                                Whether you&apos;re buying your first place or selling the home you raised your kids in,
                                I bring the same thing to the table every time: local expertise, honest advice, and genuine
                                care for your outcome. Ready to see what&apos;s out there? Start with a search.
                            </p>
                        </div>

                        <Link
                            href="/about"
                            className="inline-block bg-brand-accent hover:bg-brand-accent-light text-white px-8 py-4 uppercase tracking-wider text-sm font-medium transition-colors"
                        >
                            Get to Know Gretta &#8594;
                        </Link>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}
