import { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/content'
import { BlogPageClient } from './BlogPageClient'

export const metadata: Metadata = {
    title: 'Blog | Gretta Hughes Real Estate',
    description:
        'Real estate insights and market updates for Waterloo Region and Brant County from Gretta Hughes, Sales Representative with RE/MAX Twin City.',
    alternates: { canonical: '/blog' },
}

export default function BlogPage() {
    const posts = getAllBlogPosts().map((p) => ({
        title: p.meta.title,
        slug: p.meta.slug,
        date: p.meta.date,
        description: p.meta.description,
        featuredImage: p.meta.featuredImage,
        author: p.meta.author,
        type: 'blog' as const,
        href: `/blog/${p.meta.slug}`,
    }))

    return <BlogPageClient posts={posts} neighbourhoods={[]} hasNeighbourhoods={false} />
}
