import { Metadata } from 'next'
import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
    title: 'Free Home Evaluation | Gretta Hughes - RE/MAX Twin City',
    description:
        'Find out what your home is worth. Get a free, no-obligation home evaluation from Gretta Hughes, your local Waterloo Region and Brant County real estate expert.',
}

const testimonials = [
    {
        id: 1,
        quote: 'Gretta helped us find our dream home in Cambridge before it even hit the market. Her knowledge of the area is unmatched. We felt confident every step of the way.',
        author: 'Maria & Carlos D.',
        location: 'Cambridge',
    },
    {
        id: 2,
        quote: 'We were nervous about selling after 20 years in our home. Gretta handled everything with care and professionalism. We got above asking price and the whole process was seamless.',
        author: 'Sarah & James T.',
        location: 'Kitchener',
    },
    {
        id: 3,
        quote: 'As first-time buyers, we had a million questions. Gretta was patient, thorough, and always available. She truly goes above and beyond for her clients.',
        author: 'Emily & Ryan M.',
        location: 'Waterloo',
    },
]

const credentials = [
    {
        title: 'RE/MAX Twin City',
        description: 'Backed by the most recognized real estate brand in the world',
    },
    {
        title: 'Cambridge Community Roots',
        description: 'Deep ties to Cambridge and the Waterloo Region',
    },
    {
        title: "100% Club '21–'24",
        description: 'Four consecutive years of proven results',
    },
]

const steps = [
    { number: '01', title: 'Fill Out the Form', description: 'Share a few details about your property below.' },
    {
        number: '02',
        title: 'Gretta Reviews Your Property',
        description: 'She analyzes recent comparable sales, market trends, and your neighbourhood.',
    },
    {
        number: '03',
        title: 'Receive Your Evaluation',
        description: 'Get a detailed evaluation within 24 hours, no strings attached.',
    },
]

export default function HomeEvaluationPage() {
    return (
        <main>
            {/* Hero */}
            <section className="relative bg-brand-bg pt-[90px] lg:pt-32 pb-16 md:pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <AnimatedSection>
                        <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-8" />
                        <SectionLabel text="Free Home Evaluation" className="justify-center" />
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-brand-text mb-6">
                            What Is Your Home <span className="italic text-brand-accent-light">Worth?</span>
                        </h1>
                        <p className="text-brand-text-muted text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            Get a free, no-obligation evaluation from Gretta Hughes, your local Cambridge and
                            Waterloo Region expert who knows these neighbourhoods inside and out.
                        </p>
                        <a
                            href="#form"
                            className="inline-block bg-brand-text hover:bg-brand-text/85 text-white font-medium px-10 py-4 transition-all uppercase tracking-[0.2em] text-xs hover:-translate-y-0.5 duration-300"
                        >
                            Get Your Free Evaluation
                        </a>
                    </AnimatedSection>
                </div>
            </section>

            {/* Credentials Bar */}
            <section className="bg-brand-text py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {credentials.map((c) => (
                            <AnimatedSection key={c.title} className="text-center flex flex-col items-center">
                                <h3 className="font-display text-lg md:text-xl text-white mb-1">{c.title}</h3>
                                <p className="text-white/50 text-sm font-light">{c.description}</p>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Props + Form */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        <AnimatedSection className="order-2 lg:order-1">
                            <SectionLabel text="Why Request an Evaluation" />
                            <h2 className="font-display text-3xl md:text-4xl text-brand-text mb-4">
                                No pressure. No spam.
                                <br />
                                <span className="italic text-brand-accent-light">Just the value.</span>
                            </h2>
                            <p className="text-brand-text-muted mb-10 text-base leading-relaxed font-light">
                                Whether you&apos;re thinking about selling or just curious, knowing your home&apos;s
                                value puts you in control.
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        title: 'Fast 24-Hour Response',
                                        desc: 'Gretta personally reviews every request and responds within one business day.',
                                    },
                                    {
                                        title: 'Local Market Expertise',
                                        desc: 'With deep roots in Cambridge and the Waterloo Region, Gretta knows every neighbourhood and market shift.',
                                    },
                                    {
                                        title: 'No Obligation',
                                        desc: 'This is about giving you information, not a sales pitch. Zero pressure, always.',
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.title}
                                        className="flex gap-4 p-5 border border-brand-border/40 bg-brand-bg/50 hover:border-brand-gold/20 transition-all duration-300"
                                    >
                                        <div className="flex-shrink-0 w-1 bg-brand-gold/30 rounded-full" />
                                        <div>
                                            <h3 className="font-display text-base text-brand-text mb-0.5">
                                                {item.title}
                                            </h3>
                                            <p className="text-brand-text-muted text-sm leading-relaxed font-light">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Photo */}
                            <div className="mt-10 relative aspect-[16/10] overflow-hidden hidden lg:block">
                                <Image
                                    src="/images/gretta-professional.jpg"
                                    alt="Gretta Hughes"
                                    fill
                                    className="object-cover object-top"
                                    sizes="500px"
                                />
                            </div>
                        </AnimatedSection>

                        <AnimatedSection className="order-1 lg:order-2">
                            <div
                                id="form"
                                className="scroll-mt-24 bg-white border border-brand-border/60 p-8 md:p-10 shadow-xl shadow-black/[0.04] relative"
                            >
                                {/* Accent top bar */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-brand-gold/50" />
                                <h3 className="font-display text-2xl text-brand-text mb-2">
                                    Request Your Free Evaluation
                                </h3>
                                <p className="text-brand-text-muted text-sm mb-6 font-light">
                                    Fill out the form and Gretta will get back to you within 24 hours.
                                </p>
                                <ContactForm
                                    defaultIntent="Sell"
                                    defaultMessage="Hi Gretta. I'd like to get a free home evaluation for my property located at [Your Address]."
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 md:py-28 bg-brand-bg-alt border-y border-brand-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <SectionLabel text="How It Works" />
                        <h2 className="font-display text-3xl md:text-4xl text-brand-text">
                            Three Simple <span className="italic text-brand-accent-light">Steps</span>
                        </h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                        {steps.map((s, i) => (
                            <AnimatedSection
                                key={s.number}
                                className="relative text-center bg-white border border-brand-border/40 p-8 md:p-10 hover:shadow-md transition-shadow duration-300"
                            >
                                <span className="inline-flex items-center justify-center w-12 h-12 border border-brand-gold/30 text-brand-gold font-display text-lg mb-5">
                                    {i + 1}
                                </span>
                                <h3 className="font-display text-xl text-brand-text mb-2">{s.title}</h3>
                                <p className="text-brand-text-muted text-sm leading-relaxed font-light">
                                    {s.description}
                                </p>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
                        <SectionLabel text="What Clients Say" />
                        <h2 className="font-display text-3xl md:text-4xl text-brand-text">
                            Real Stories from{' '}
                            <span className="italic text-brand-accent-light">Real Families</span>
                        </h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t) => (
                            <AnimatedSection
                                key={t.id}
                                className="bg-brand-bg border border-brand-border/40 p-8 md:p-10 flex flex-col relative hover:shadow-md transition-shadow duration-300"
                            >
                                <span className="text-brand-gold/15 font-display text-8xl absolute -top-4 left-4 select-none leading-none">
                                    &ldquo;
                                </span>
                                <div className="flex gap-1 mb-5 mt-4 relative z-10">
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
                                <div className="flex-1 text-brand-text mb-8 relative z-10 leading-relaxed font-light">
                                    <p>&ldquo;{t.quote}&rdquo;</p>
                                </div>
                                <div>
                                    <div className="w-8 h-[1px] bg-brand-gold/30 mb-3" />
                                    <p className="text-brand-text font-medium text-sm">{t.author}</p>
                                    <p className="text-brand-text-muted text-[10px] uppercase tracking-[0.2em] mt-0.5">
                                        {t.location}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-brand-text py-20 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <AnimatedSection>
                        <h2 className="font-display text-3xl md:text-5xl text-white mb-6">
                            Ready to Find <span className="italic text-brand-gold">Out?</span>
                        </h2>
                        <p className="text-white/50 text-base mb-8 max-w-xl mx-auto leading-relaxed font-light">
                            It takes two minutes to fill out the form. Gretta will handle the rest.
                        </p>
                        <a
                            href="#form"
                            className="inline-block bg-white text-brand-text hover:bg-brand-bg font-medium px-10 py-4 transition-all uppercase tracking-[0.2em] text-xs hover:-translate-y-0.5 duration-300"
                        >
                            Get Your Free Evaluation
                        </a>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    )
}
