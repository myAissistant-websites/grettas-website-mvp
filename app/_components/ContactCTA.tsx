import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function ContactCTA() {
    return (
        <section className="relative bg-brand-bg-alt py-20 md:py-28 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <AnimatedSection>
                        <div className="relative aspect-square max-w-[360px] mx-auto md:mx-0 overflow-hidden rounded-sm">
                            <Image
                                src="/images/gretta-kitchen.jpg"
                                alt="Gretta Hughes"
                                fill
                                className="object-cover object-top"
                                sizes="360px"
                            />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection>
                        <p className="text-brand-gold tracking-[0.3em] text-xs font-medium uppercase mb-4">
                            Free Home Evaluation
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-brand-text mb-6 leading-tight">
                            Curious What Your Home{' '}
                            <span className="italic text-brand-accent-light">Is Worth?</span>
                        </h2>

                        <p className="text-brand-text-muted text-base leading-relaxed font-light mb-10 max-w-lg">
                            The Waterloo Region market moves fast. Get a free, no-obligation evaluation
                            from someone who actually knows your street, not just the algorithm.
                        </p>

                        <Link
                            href="/home-evaluation"
                            className="inline-block bg-brand-text hover:bg-brand-text/85 text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
                        >
                            Get My Free Evaluation
                        </Link>

                        <p className="mt-5 text-brand-text-muted text-xs italic">
                            Most evaluations delivered within 24 hours. No commitment, no cold calls.
                        </p>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}
