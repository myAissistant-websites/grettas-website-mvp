'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

function NavDropdown({
    label,
    items,
    isScrolled,
}: {
    label: string
    items: { name: string; href: string }[]
    isScrolled: boolean
}) {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                className={`flex items-center gap-1 text-[13px] font-light tracking-wide transition-colors hover:text-brand-accent-light ${isScrolled ? 'text-brand-text' : 'text-brand-text'} relative group`}
            >
                {label} <ChevronDown className="w-3.5 h-3.5" />
                <span className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-3 w-52 bg-white shadow-xl shadow-black/[0.06] border border-brand-border/50 overflow-hidden"
                    >
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-5 py-3.5 text-[13px] font-light text-brand-text hover:bg-brand-bg-alt hover:text-brand-accent-light transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function Navbar() {
    const pathname = usePathname()
    const isHome = pathname === '/'
    const [isScrolled, setIsScrolled] = useState(!isHome)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        if (pathname !== '/listings') {
            fetch('/api/listings/map-pins', { priority: 'low' as RequestInit['priority'] }).catch(() => {})
        }
    }, [pathname])

    useEffect(() => {
        if (!isHome) {
            setIsScrolled(true)
            return
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHome])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileMenuOpen])

    const simpleLinks = [
        { name: 'Home', href: '/' },
        { name: 'Neighbourhoods', href: '/neighbourhoods' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ]

    const listingsItems = [
        { name: "Gretta's Listings", href: '/listings/my-listings' },
        { name: 'Home Search', href: '/listings' },
    ]

    const toolsItems = [
        { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
        { name: 'Home Evaluation', href: '/home-evaluation' },
    ]

    return (
        <>
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-brand-border/30' : 'bg-transparent py-5'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="z-50 relative group flex items-center gap-3">
                        <Image
                            src="/images/gretta-logo-icon.png"
                            alt="Gretta Hughes"
                            width={44}
                            height={44}
                            className="h-9 w-9 md:h-10 md:w-10 rounded-full object-contain"
                            priority
                        />
                        <div className="flex flex-col">
                            <span className="font-display text-lg md:text-xl font-semibold text-brand-text leading-tight">
                                Gretta Hughes
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-brand-text-muted leading-tight">
                                Sales Representative
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className={`text-[13px] font-light tracking-wide transition-colors hover:text-brand-accent-light ${isScrolled ? 'text-brand-text' : 'text-brand-text'} relative group`}
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
                        </Link>

                        <NavDropdown label="Listings" items={listingsItems} isScrolled={isScrolled} />

                        {simpleLinks.slice(1).map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-[13px] font-light tracking-wide transition-colors hover:text-brand-accent-light ${isScrolled ? 'text-brand-text' : 'text-brand-text'} relative group`}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}

                        <NavDropdown label="Tools" items={toolsItems} isScrolled={isScrolled} />
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-6">
                        <a
                            href="tel:519-590-3236"
                            className="flex items-center gap-2 text-sm group transition-colors text-brand-text"
                        >
                            <Phone className="w-3.5 h-3.5 text-brand-gold" />
                            <span className="text-[13px] font-light">(519) 590-3236</span>
                        </a>
                        <Link
                            href="/contact"
                            className="bg-brand-text hover:bg-brand-text/85 text-white px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300"
                        >
                            Let{"'"}s Talk
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden relative z-[9998] p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-brand-text" />
                        ) : (
                            <Menu className="w-6 h-6 text-brand-text" />
                        )}
                    </button>
                </div>
            </div>

        </header>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className="fixed inset-0 bg-white z-[9997] md:hidden pt-6 px-8 overflow-y-auto pb-8 flex flex-col"
                    >
                        <div className="flex justify-end mb-4">
                            <button className="p-2" onClick={() => setMobileMenuOpen(false)}>
                                <X className="w-6 h-6 text-brand-text" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            <a
                                href="tel:519-590-3236"
                                className="flex items-center justify-center gap-2 border border-brand-border bg-white text-brand-text px-3 py-3 font-light text-sm transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                                <span>Call or Text</span>
                            </a>
                            <Link
                                href="/contact"
                                className="flex items-center justify-center bg-brand-text hover:bg-brand-text/85 text-white px-3 py-3 font-medium text-xs uppercase tracking-[0.15em] transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Let{"'"}s Talk
                            </Link>
                        </div>
                        <nav className="flex flex-col gap-6 text-xl font-display">
                            <Link
                                href="/"
                                className="text-brand-text hover:text-brand-accent-light transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>

                            <div>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-text-muted mb-3 block font-body">
                                    Listings
                                </span>
                                <div className="flex flex-col gap-4 pl-3 border-l border-brand-gold/20">
                                    <Link
                                        href="/listings/my-listings"
                                        className="text-brand-text hover:text-brand-accent-light transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Gretta{"'"}s Listings
                                    </Link>
                                    <Link
                                        href="/listings"
                                        className="text-brand-text hover:text-brand-accent-light transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Home Search
                                    </Link>
                                </div>
                            </div>

                            <Link
                                href="/neighbourhoods"
                                className="text-brand-text hover:text-brand-accent-light transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Neighbourhoods
                            </Link>
                            <Link
                                href="/blog"
                                className="text-brand-text hover:text-brand-accent-light transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link
                                href="/about"
                                className="text-brand-text hover:text-brand-accent-light transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className="text-brand-text hover:text-brand-accent-light transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>

                            <div>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-text-muted mb-3 block font-body">
                                    Tools
                                </span>
                                <div className="flex flex-col gap-4 pl-3 border-l border-brand-gold/20">
                                    <Link
                                        href="/mortgage-calculator"
                                        className="text-brand-text hover:text-brand-accent-light transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Mortgage Calculator
                                    </Link>
                                    <Link
                                        href="/home-evaluation"
                                        className="text-brand-text hover:text-brand-accent-light transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Home Evaluation
                                    </Link>
                                </div>
                            </div>
                        </nav>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
