'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [toolsOpen, setToolsOpen] = useState(false)
    const pathname = usePathname()

    const isHome = pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80)
        }

        // Always consider scrolled if not on home page
        if (!isHome) {
            setIsScrolled(true)
            return
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHome])

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Listings', href: '/listings' },
        { name: 'Neighbourhoods', href: '/neighbourhoods' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo / Brand */}
                    <Link href="/" className="z-50 relative group">
                        <div className="flex flex-col">
                            <span className={`font-display text-xl md:text-2xl font-bold transition-colors ${isScrolled ? 'text-brand-text' : 'text-brand-text md:text-brand-bg-dark'}`}>
                                Abdul Basharmal
                            </span>
                            <span className={`text-[10px] uppercase tracking-[0.2em] mt-0.5 transition-colors ${isScrolled ? 'text-brand-text-muted' : 'text-brand-text-muted md:text-brand-text'}`}>
                                REALTOR® · RE/MAX Twin City
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-brand-accent ${isScrolled ? 'text-brand-text' : 'text-brand-bg-dark'} relative group`}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}

                        <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
                            <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-accent ${isScrolled ? 'text-brand-text' : 'text-brand-bg-dark'}`}>
                                Tools <ChevronDown className="w-4 h-4" />
                            </button>

                            <AnimatePresence>
                                {toolsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border border-brand-border/50 rounded-md overflow-hidden"
                                    >
                                        <Link href="/mortgage-calculator" className="block px-4 py-3 text-sm text-brand-text hover:bg-brand-bg transition-colors">
                                            Mortgage Calculator
                                        </Link>
                                        <Link href="/contact?type=evaluation" className="block px-4 py-3 text-sm text-brand-text hover:bg-brand-bg transition-colors">
                                            Home Evaluation
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-6">
                        <a href="tel:905-906-0045" className={`flex items-center gap-2 text-sm font-medium group transition-colors ${isScrolled ? 'text-brand-text' : 'text-brand-bg-dark'}`}>
                            <Phone className="w-4 h-4 text-brand-accent group-hover:text-brand-accent-light transition-colors" />
                            <div className="flex flex-col items-end">
                                <span className="text-base">(905) 906-0045</span>
                                <span className="text-[10px] text-brand-text-muted uppercase tracking-wider">Call or Text</span>
                            </div>
                        </a>
                        <Link
                            href="/contact"
                            className="bg-brand-accent hover:bg-brand-accent-light text-white px-6 py-2.5 rounded-sm text-sm font-medium transition-colors shadow-sm"
                        >
                            Let's Talk
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className={`w-6 h-6 ${isScrolled || mobileMenuOpen ? 'text-brand-text' : 'text-brand-bg-dark'}`} />
                        ) : (
                            <Menu className={`w-6 h-6 ${isScrolled ? 'text-brand-text' : 'text-brand-bg-dark'}`} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className="fixed inset-0 bg-white z-40 md:hidden pt-24 px-6 overflow-y-auto pb-8 flex flex-col"
                    >
                        <nav className="flex flex-col gap-8 text-2xl font-display mt-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-brand-text hover:text-brand-accent transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/mortgage-calculator"
                                className="text-brand-text hover:text-brand-accent transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Mortgage Calculator
                            </Link>
                            <Link
                                href="/contact?type=evaluation"
                                className="text-brand-text hover:text-brand-accent transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home Evaluation
                            </Link>
                        </nav>

                        <div className="mt-auto pt-12 pb-6">
                            <p className="text-brand-text-muted uppercase text-xs tracking-wider mb-4">Get in Touch</p>
                            <a
                                href="tel:905-906-0045"
                                className="flex items-center justify-center gap-2 w-full border border-brand-border bg-white text-brand-text px-6 py-4 rounded-sm font-medium transition-colors mb-3 shadow-sm"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Phone className="w-5 h-5 text-brand-accent" />
                                <span>Call or Text Me</span>
                            </a>
                            <Link
                                href="/contact"
                                className="block text-center w-full bg-brand-accent hover:bg-brand-accent-light text-white px-6 py-4 rounded-sm font-medium transition-colors shadow-sm"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Let's Talk
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
