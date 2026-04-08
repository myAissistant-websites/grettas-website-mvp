import { MapPin, Clock, ShieldCheck, TrendingUp, User, Home } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function WhyChooseChris() {
    const reasons = [
        {
            icon: Clock,
            title: 'Clarity & Confidence',
            description:
                'Real estate is about more than transactions. I bring deep experience, market knowledge, and a professional approach to every client, guiding you through each step with clarity.',
        },
        {
            icon: MapPin,
            title: 'Cambridge Is Home',
            description:
                "I've been in Cambridge since I was 10. I know the neighbourhoods, the streets, and which areas are on the rise. That local knowledge saves you money and headaches.",
        },
        {
            icon: TrendingUp,
            title: 'Results Across the Region',
            description:
                'Across Waterloo Region, Brant County, and beyond. I help clients find the right home at the right price with strategic marketing and strong negotiation.',
        },
        {
            icon: ShieldCheck,
            title: 'Honest & Straightforward',
            description:
                "If a house is overpriced, I'll tell you. If you're about to make a mistake, I'll stop you. I'd rather lose a deal than lose your trust.",
        },
        {
            icon: User,
            title: 'You Get Gretta. Period.',
            description:
                'No hand-offs to junior agents. No assistants running your deal. When you call, I answer. Every client gets my full, personal attention.',
        },
        {
            icon: Home,
            title: 'Free Home Evaluation',
            description:
                "Thinking about selling? I'll give you an honest market evaluation. No obligation, no pitch. And if you're buying, the search starts right here.",
        },
    ]

    return (
        <section className="py-20 md:py-32 bg-brand-bg-alt">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center max-w-2xl mx-auto mb-20 md:mb-24">
                    <SectionLabel text="Why Clients Choose Gretta" />
                    <h2 className="font-display text-4xl md:text-5xl text-brand-text">
                        A Service That Feels{' '}
                        <span className="italic text-brand-accent-light">Both Professional & Personal</span>
                    </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {reasons.map((reason) => {
                        const Icon = reason.icon
                        return (
                            <AnimatedSection key={reason.title} className="flex flex-col text-left group">
                                <div className="mb-5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="h-[1px] flex-1 bg-brand-border/50" />
                                </div>
                                <h3 className="font-display text-xl text-brand-text mb-3">{reason.title}</h3>
                                <p className="text-brand-text-muted leading-relaxed font-light text-sm">
                                    {reason.description}
                                </p>
                            </AnimatedSection>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
