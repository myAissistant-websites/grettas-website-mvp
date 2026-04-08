import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TestimonialsSection } from '@/app/_components/TestimonialsSection'

export const metadata: Metadata = {
    title: 'About Gretta Hughes | REALTOR® Cambridge & Waterloo Region',
    description:
        'Learn about Gretta Hughes, a passionate REALTOR® with RE/MAX Twin City Realty in Cambridge, Ontario, serving buyers and sellers across the Waterloo Region.',
}

export default function AboutPage() {
    return (
        <div className="bg-brand-bg min-h-screen">
            {/* Hero — Editorial Split */}
            <section className="pt-28 lg:pt-0 lg:min-h-[80vh] flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 relative">
                    <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[80vh]">
                        <Image
                            src="/images/gretta-about.jpg"
                            alt="Gretta Hughes"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-center"
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-16 py-16 lg:py-24">
                    <div className="max-w-lg">
                        <div className="w-12 h-[1px] bg-brand-gold mb-8" />
                        <p className="text-brand-gold tracking-[0.3em] text-[11px] font-medium uppercase mb-6">
                            About Gretta
                        </p>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-text mb-6 leading-[1.05]">
                            Hi, I&apos;m{' '}
                            <span className="italic text-brand-accent-light">Gretta.</span>
                        </h1>
                        <p className="text-brand-text-muted text-base leading-relaxed font-light">
                            I&apos;m a Cambridge-based Realtor with a genuine appreciation for the
                            community I call home. From our local boutiques and restaurants to the
                            scenic trails, river views, and charming downtown cores, Cambridge offers
                            a lifestyle that is both vibrant and welcoming, and I take pride in
                            helping my clients find their place within it.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-brand-gold text-[11px] font-medium uppercase tracking-[0.3em] mb-6">
                            My Story
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl text-brand-text leading-tight">
                            I Know What It Means to{' '}
                            <span className="italic text-brand-accent-light">Find Home</span>
                        </h2>
                    </div>

                    <div className="space-y-6 text-brand-text-muted font-light leading-[1.85] text-[17px]">
                        <p>
                            I was born in El Salvador and moved to Canada at the age of 10. Cambridge has been home
                            ever since. I am married to my best friend, and we have a son and a daughter who mean
                            the world to us.
                        </p>
                        <p>
                            Before transitioning into real estate, I worked as an Early Childhood Educator and
                            earned my Child and Youth Worker diploma. That experience continues to shape how I
                            connect with people, allowing me to approach each client relationship with patience,
                            understanding, and genuine care.
                        </p>
                        <p>
                            I provide a thoughtful and tailored approach to real estate, guiding clients through
                            each step with clarity, confidence, and care. Whether you are purchasing your first
                            home, making a move, or preparing to sell, I focus on delivering a seamless experience
                            supported by strategic marketing, strong negotiation, and a deep understanding of the
                            local market.
                        </p>
                        <p>
                            To me, real estate is about more than buying and selling. It is about building
                            relationships, understanding your goals, and helping you make one of life&apos;s most
                            important decisions with confidence. I am committed to offering a level of service
                            that feels both professional and personal from start to finish.
                        </p>
                    </div>
                </div>
            </section>

            {/* How I Work Section */}
            <section className="py-24 md:py-32 bg-brand-bg-alt border-y border-brand-border/40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="font-display text-4xl md:text-5xl text-brand-text">
                            What You Can{' '}
                            <span className="italic text-brand-accent-light">Expect From Me</span>
                        </h2>
                    </div>

                    <div className="space-y-16">
                        {[
                            {
                                number: '01',
                                title: "If You're Buying",
                                text: 'You can expect honest guidance from day one. If a property is overpriced, I will tell you. I review accurate comparables, break down what is happening in that specific neighbourhood, and help you structure a strong, strategic offer that makes sense for you. My goal is for you to feel confident in your decision, not stressed or second guessing it later.',
                            },
                            {
                                number: '02',
                                title: "If You're Selling",
                                text: "Pricing and presentation are critical. I provide a clear and realistic evaluation of your home's value in today's market, along with a detailed plan to showcase it properly. From professional marketing to a focused negotiation strategy, every step is designed to protect your bottom line and maximize your results.",
                            },
                            {
                                number: '03',
                                title: 'Either Way',
                                text: 'You work directly with me. You have my personal number, and you can call or text anytime. I respond promptly and keep communication clear throughout the process. I genuinely care about my clients and their families. This is not just business to me, it is personal.',
                            },
                        ].map((item) => (
                            <div key={item.number} className="flex flex-col md:flex-row gap-8 items-start group">
                                <span className="font-display text-5xl text-brand-gold/30 shrink-0 leading-none">
                                    {item.number}
                                </span>
                                <div>
                                    <h3 className="font-display text-2xl md:text-3xl text-brand-text mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-brand-text-muted text-base leading-relaxed font-light">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Credentials Section */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                        {/* Background */}
                        <div>
                            <p className="text-brand-gold text-[11px] font-medium uppercase tracking-[0.3em] mb-8 border-b border-brand-border/50 pb-4">
                                Background
                            </p>
                            <ul className="space-y-6 text-brand-text-muted font-light">
                                {[
                                    {
                                        title: 'Cambridge Roots',
                                        desc: 'Living in Cambridge since childhood. This community is home',
                                    },
                                    {
                                        title: 'Early Childhood Education Background',
                                        desc: 'Patience, empathy, and care for families in every interaction',
                                    },
                                    {
                                        title: 'Child and Youth Worker Diploma',
                                        desc: "A foundation built on helping people through life's big decisions",
                                    },
                                    {
                                        title: 'Bilingual',
                                        desc: 'Fluent in English and Spanish',
                                    },
                                    { title: 'Based in:', desc: 'Cambridge, Ontario' },
                                ].map((item) => (
                                    <li key={item.title} className="flex gap-4">
                                        <span className="w-1 h-1 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                                        <span>
                                            <strong className="text-brand-text font-medium">{item.title}</strong>
                                            <br />
                                            <span className="text-sm">{item.desc}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Credentials */}
                        <div>
                            <p className="text-brand-gold text-[11px] font-medium uppercase tracking-[0.3em] mb-8 border-b border-brand-border/50 pb-4">
                                Credentials & Affiliations
                            </p>
                            <ul className="space-y-6 text-brand-text-muted font-light">
                                {[
                                    'Licensed REALTOR®, Province of Ontario',
                                    "RE/MAX 100% Club Award '21, '22, '23, '24",
                                    'Member: Canadian Real Estate Association (CREA)',
                                    'Member: Waterloo Region Association of REALTORS® (WRAR)',
                                    'Brokerage: RE/MAX Twin City Realty Inc.',
                                ].map((item) => (
                                    <li key={item} className="flex gap-4">
                                        <span className="w-1 h-1 rounded-full bg-brand-gold mt-2.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <TestimonialsSection />

            {/* CTA */}
            <section className="py-24 md:py-32 bg-brand-bg-alt text-center px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-8" />
                    <h2 className="font-display text-4xl md:text-5xl text-brand-text mb-6">
                        Let&apos;s Find Out If We&apos;re a{' '}
                        <span className="italic text-brand-accent-light">Good Fit</span>
                    </h2>
                    <p className="text-brand-text-muted text-base font-light mb-12 leading-relaxed">
                        No pitch, no pressure. Just a conversation about what you&apos;re trying to do and whether
                        I&apos;m the right person to help.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-brand-text hover:bg-brand-text/85 text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-medium transition-all hover:-translate-y-0.5 duration-300"
                    >
                        Reach Out to Gretta
                    </Link>
                </div>
            </section>
        </div>
    )
}
