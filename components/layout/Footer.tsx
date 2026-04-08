import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-brand-text text-white pt-20 pb-8">
            {/* Decorative gold line */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mb-20" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <h2 className="font-display text-3xl mb-1 text-white">Gretta Hughes</h2>
                        <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-6">
                            REALTOR&reg;
                        </p>
                        <p className="text-white/50 text-sm font-light leading-relaxed">
                            Serving Waterloo Region, Brant County and beyond
                        </p>
                        <div className="mt-6 flex gap-3">
                            <a
                                href="https://www.facebook.com/grettahughes.ca/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-brand-gold/40 hover:text-brand-gold transition-all duration-300"
                            >
                                <span className="sr-only">Facebook</span>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/gretta.hughes/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-brand-gold/40 hover:text-brand-gold transition-all duration-300"
                            >
                                <span className="sr-only">Instagram</span>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/gretta-hughes-345374200/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-brand-gold/40 hover:text-brand-gold transition-all duration-300"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[10px] font-medium mb-6 uppercase tracking-[0.3em] text-white/40">
                            Quick Links
                        </h3>
                        <ul className="space-y-3 text-sm text-white/60 font-light">
                            <li>
                                <Link href="/" className="hover:text-brand-gold transition-colors duration-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/listings" className="hover:text-brand-gold transition-colors duration-300">
                                    Search Listings
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/neighbourhoods"
                                    className="hover:text-brand-gold transition-colors duration-300"
                                >
                                    Neighbourhoods
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-brand-gold transition-colors duration-300">
                                    About Gretta
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-brand-gold transition-colors duration-300">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/mortgage-calculator"
                                    className="hover:text-brand-gold transition-colors duration-300"
                                >
                                    Mortgage Calculator
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-[10px] font-medium mb-6 uppercase tracking-[0.3em] text-white/40">
                            Contact
                        </h3>
                        <div className="space-y-4 text-sm text-white/60 font-light">
                            <p className="flex items-center gap-3">
                                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                                <a href="tel:519-590-3236" className="hover:text-white transition-colors">
                                    (519) 590-3236
                                </a>
                            </p>
                            <address className="not-italic leading-relaxed mt-4">
                                <strong className="text-white/80 font-medium text-xs tracking-wide">
                                    RE/MAX Twin City Realty Inc., Brokerage
                                </strong>
                                <br />
                                1400 Bishop Street North
                                <br />
                                Cambridge, ON N1R 6W8
                            </address>
                        </div>
                    </div>

                    {/* Brokerage Logo */}
                    <div className="flex flex-col items-start md:items-end justify-between">
                        <div className="flex items-center gap-4 mb-6">
                            <Image
                                src="/images/REMAX Twin City Logo RGB Vertical-CREAM.png"
                                alt="RE/MAX Twin City Realty"
                                width={80}
                                height={80}
                                className="opacity-80"
                            />
                            <Image
                                src="/images/100_club_icon.png"
                                alt="100% Club"
                                width={48}
                                height={36}
                                className="invert opacity-50"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/[0.06] text-[11px] text-white/30 flex flex-col items-center text-center space-y-4">
                    <div className="flex flex-col md:flex-row justify-between w-full">
                        <p>&copy; {new Date().getFullYear()} Gretta Hughes. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="hover:text-white/60 transition">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-white/60 transition">
                                Terms of Service
                            </Link>
                        </div>
                    </div>

                    <div className="max-w-4xl pt-4 space-y-2 font-light">
                        <p>
                            The trademarks REALTOR®, REALTORS®, and the REALTOR® logo are controlled by The Canadian
                            Real Estate Association (CREA) and identify real estate professionals who are members of
                            CREA.
                        </p>
                        <p>
                            The trademarks MLS®, Multiple Listing Service® and the associated logos are owned by The
                            Canadian Real Estate Association (CREA) and identify the quality of services provided by
                            real estate professionals who are members of CREA.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
