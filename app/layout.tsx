import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-cormorant',
    display: 'swap',
})

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://grettahughes.ca'),
    title: {
        default: 'Gretta Hughes | REALTOR® in Cambridge & Waterloo Region | RE/MAX Twin City',
        template: '%s | Gretta Hughes Real Estate',
    },
    description:
        'Gretta Hughes is a REALTOR® with RE/MAX Twin City Realty in Cambridge, Ontario. Helping buyers and sellers in Cambridge, Kitchener, Waterloo, Guelph, and Brantford. Search listings, get a free home evaluation, or connect today.',
    keywords:
        'Cambridge real estate agent, Kitchener REALTOR, Waterloo homes for sale, Guelph real estate, Brantford Ontario homes, RE/MAX Twin City, Gretta Hughes, Kitchener homes for sale, Waterloo Region real estate',
    openGraph: {
        type: 'website',
        siteName: 'Gretta Hughes | RE/MAX Twin City Realty',
        locale: 'en_CA',
    },
    twitter: {
        card: 'summary_large_image',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    icons: {
        icon: [
            { url: '/tab-icon-32x32.png', type: 'image/png', sizes: '32x32' },
            { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
            { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
        ],
        apple: '/apple-icon.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${cormorant.variable} ${outfit.variable} antialiased text-brand-text`}
                suppressHydrationWarning
            >
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </body>
        </html>
    )
}
