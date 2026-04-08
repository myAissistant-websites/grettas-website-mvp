'use client'

import { useInView, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface StatProps {
    end: number
    suffix?: string
    prefix?: string
    label: string
}

function Counter({ end, suffix = '', prefix = '', label }: StatProps) {
    const ref = useRef(null)
    const [count, setCount] = useState(0)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, end, {
                duration: 2,
                ease: 'easeOut',
                onUpdate: (value) => {
                    setCount(Math.round(value))
                },
            })
            return controls.stop
        }
    }, [end, isInView])

    return (
        <div className="flex flex-col items-center text-center p-8">
            <span
                ref={ref}
                className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-gold mb-3 tabular-nums italic"
            >
                {prefix}
                {count}
                {suffix}
            </span>
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-text-muted">{label}</span>
        </div>
    )
}

export function StatsSection() {
    return (
        <section className="bg-brand-bg-alt py-16 lg:py-20 border-y border-brand-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-brand-border/50">
                        <Counter end={30} label="Years in Cambridge" />
                        <Counter end={10} suffix="+" label="Cities Served" />
                        <Counter end={100} suffix="%" label="Client Focused" />
                        <Counter end={24} suffix="hr" label="Response Time" />
                    </div>

                    <div className="text-center mt-12 pt-10 border-t border-brand-border/50">
                        <p className="italic text-brand-text-muted text-sm md:text-base leading-relaxed font-display text-lg">
                            &ldquo;I take pride in delivering a level of service that makes my clients feel supported, confident, and truly taken care of every step of the way.&rdquo;
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}
