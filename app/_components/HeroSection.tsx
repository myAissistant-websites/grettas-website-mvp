import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function HeroSection() {
    return (
        <section className="relative w-full bg-white overflow-hidden lg:h-screen lg:min-h-[700px]">
            {/* Desktop Image — absolutely positioned, right-aligned, bottom-anchored */}
            <div className="hidden lg:block absolute right-0 bottom-0 w-[45%] h-[calc(100vh-40px)]">
                <Image
                    src="/images/gretta-hero-nobg.png"
                    alt="Gretta Hughes - Cambridge & Waterloo Region REALTOR"
                    fill
                    priority
                    sizes="45vw"
                    className="object-contain object-right-bottom"
                />
                {/* Left fade */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            </div>

            <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-20 w-full h-full">
                <div className="flex flex-col lg:flex-row items-end h-full pt-[90px] lg:pt-[124px]">
                    {/* Main Content Area */}
                    <div className="w-full lg:w-[55%] flex flex-col z-10 pt-8 lg:pt-0 lg:justify-center lg:self-stretch">
                        {/* Mobile: side-by-side heading + image */}
                        <div className="flex flex-row items-stretch lg:block w-full mb-6 lg:mb-0">
                            {/* Text */}
                            <AnimatedSection className="w-[60%] lg:w-full pr-2 lg:pr-0 self-center z-10">
                                <p className="text-brand-accent tracking-[0.2em] text-[10px] lg:text-xs font-semibold uppercase mb-3 lg:mb-5 leading-tight">
                                    Cambridge · Kitchener · Waterloo · Guelph · Brantford
                                </p>

                                <h1 className="font-display text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-6xl 2xl:text-7xl text-brand-text mb-4 lg:mb-5 text-balance">
                                    Your Next Home Is <br className="hidden md:block" />
                                    <span className="italic">Already Listed.</span>
                                </h1>

                                <div className="text-brand-text-muted text-[13px] sm:text-sm lg:text-lg 2xl:text-xl leading-relaxed font-light text-pretty space-y-4 lg:space-y-5">
                                    <p>
                                        I&apos;m Gretta Hughes. I help families across Cambridge and the Waterloo Region
                                        find homes they love and sell for prices that exceed expectations.
                                    </p>
                                    <p className="hidden lg:block">
                                        New listings hit this site every day. The best ones don&apos;t last long.
                                    </p>
                                </div>
                            </AnimatedSection>

                            {/* Mobile Image */}
                            <div className="w-[40%] relative lg:hidden h-[40vh] min-h-[250px] self-end z-0">
                                <Image
                                    src="/images/gretta-hero-nobg.png"
                                    alt="Gretta Hughes - Cambridge & Waterloo Region REALTOR"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 40vw"
                                    className="object-contain object-bottom"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-5 lg:mb-6 mt-0 lg:mt-8 relative z-20">
                            <Link
                                href="/listings"
                                className="bg-brand-accent hover:bg-brand-accent-light text-white font-medium px-6 py-4 lg:px-8 transition-colors text-center uppercase tracking-wider text-xs lg:text-sm shadow-lg hover:shadow-xl w-full sm:w-auto"
                            >
                                Search Listings →
                            </Link>
                            <Link
                                href="/home-evaluation"
                                className="border border-brand-border bg-white lg:bg-transparent hover:bg-brand-border/10 text-brand-text font-medium px-6 py-4 lg:px-8 transition-colors text-center uppercase tracking-wider text-xs lg:text-sm shadow-sm hover:shadow-md lg:shadow-none w-full sm:w-auto"
                            >
                                What&apos;s My Home Worth?
                            </Link>
                        </div>

                        {/* Trust badge */}
                        <div className="flex justify-center sm:justify-start text-[9px] sm:text-[10px] lg:text-xs font-medium text-brand-text-muted uppercase tracking-wider mb-5">
                            <span className="flex items-center gap-1.5 lg:gap-3">
                                <span className="text-brand-accent">✓</span> Cambridge Community Roots · Experienced. Professional.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
