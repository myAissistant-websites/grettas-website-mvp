import { Metadata } from 'next'
import Image from 'next/image'
import { ContactForm } from '@/components/ContactForm'
import { Facebook, Instagram, Linkedin, MapPin, Phone } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Contact Gretta Hughes | RE/MAX Twin City Realty',
    description:
        'Get in touch with Gretta Hughes to buy or sell a home in Cambridge, Kitchener, Waterloo, or Guelph. No pressure, no obligation.',
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
    const { type } = await searchParams
    const isEvaluation = type === 'evaluation'

    return (
        <div className="bg-brand-bg min-h-screen pt-[124px] lg:pt-[136px] pb-20">
            {/* Header */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 md:mb-16">
                <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-6" />
                <p className="text-[11px] uppercase tracking-[0.3em] text-brand-gold font-medium mb-4">Get in Touch</p>
                <h1 className="font-display text-4xl md:text-5xl text-brand-text mb-4">
                    {isEvaluation ? 'Free Home ' : 'Let\u0027s '}
                    <span className="italic text-brand-accent-light">{isEvaluation ? 'Evaluation' : 'Chat'}</span>
                </h1>
                <p className="text-brand-text-muted text-base leading-relaxed font-light max-w-2xl mx-auto">
                    Real estate decisions are big. You shouldn&apos;t have to figure them out alone. Reach out and
                    we&apos;ll talk through what you&apos;re thinking, no strings attached.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Left Column — Contact Info */}
                    <div className="lg:col-span-2 order-2 lg:order-1 space-y-6">
                        {/* Gretta Card */}
                        <div className="bg-white border border-brand-border/40 p-8">
                            <div className="flex items-center gap-5 mb-8">
                                <div className="relative w-16 h-16 overflow-hidden border border-brand-gold/20 shrink-0">
                                    <Image
                                        src="/images/gretta-professional.jpg"
                                        alt="Gretta Hughes"
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl text-brand-text">Gretta Hughes</h2>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-text-muted mt-0.5">
                                        Sales Representative
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <a href="tel:519-590-3236" className="flex items-center gap-4 group">
                                    <span className="w-10 h-10 border border-brand-gold/20 flex items-center justify-center shrink-0 group-hover:border-brand-gold/40 transition-colors">
                                        <Phone className="w-4 h-4 text-brand-gold" />
                                    </span>
                                    <div>
                                        <span className="block font-medium text-brand-text group-hover:text-brand-accent-light transition-colors">
                                            (519) 590-3236
                                        </span>
                                        <span className="text-[10px] text-brand-text-muted uppercase tracking-[0.2em]">
                                            Call or text anytime
                                        </span>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4">
                                    <span className="w-10 h-10 border border-brand-gold/20 flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4 text-brand-gold" />
                                    </span>
                                    <div>
                                        <span className="block text-sm text-brand-text font-medium">
                                            RE/MAX Twin City Realty Inc.
                                        </span>
                                        <span className="block text-xs text-brand-text-muted">
                                            1400 Bishop Street North, Cambridge, ON
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="bg-white border border-brand-border/40 p-8">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-text-muted font-medium mb-3">
                                Follow Along
                            </p>
                            <div className="flex gap-3">
                                <a
                                    href="https://www.instagram.com/gretta.hughes/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 border border-brand-border/50 flex items-center justify-center text-brand-text hover:text-brand-gold hover:border-brand-gold/30 transition-all duration-300"
                                >
                                    <span className="sr-only">Instagram</span>
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://www.facebook.com/grettahughes.ca/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 border border-brand-border/50 flex items-center justify-center text-brand-text hover:text-brand-gold hover:border-brand-gold/30 transition-all duration-300"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/gretta-hughes-345374200/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 border border-brand-border/50 flex items-center justify-center text-brand-text hover:text-brand-gold hover:border-brand-gold/30 transition-all duration-300"
                                >
                                    <span className="sr-only">LinkedIn</span>
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column — Form */}
                    <div className="lg:col-span-3 order-1 lg:order-2">
                        <div className="bg-white border border-brand-border/40 p-8 md:p-10 lg:p-12 relative">
                            {/* Top accent */}
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-brand-gold/40" />
                            <h2 className="font-display text-2xl text-brand-text mb-1">
                                {isEvaluation ? 'Tell Us About Your Home' : 'Send a Message'}
                            </h2>
                            <p className="text-sm text-brand-text-muted mb-8 font-light">
                                {isEvaluation
                                    ? 'Find out what your home is worth today.'
                                    : 'Fill out the form and Gretta will get back to you personally.'}
                            </p>

                            <ContactForm
                                defaultIntent={isEvaluation ? 'Sell' : undefined}
                                defaultMessage={
                                    isEvaluation
                                        ? "Hi Gretta, I'm interested in getting a free evaluation of my home. My address is [Address]."
                                        : ''
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
