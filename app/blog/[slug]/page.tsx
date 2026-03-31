import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllBlogPosts, getBlogPost } from '@/lib/content'
import { sanitizeHtml } from '@/lib/sanitize'

export function generateStaticParams() {
    return getAllBlogPosts().map((post) => ({ slug: post.meta.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = getBlogPost(slug)
    if (!post) return {}

    return {
        title: post.meta.title,
        description: post.meta.description,
        keywords: post.meta.keywords,
        openGraph: {
            type: 'article',
            title: post.meta.title,
            description: post.meta.description,
            publishedTime: post.meta.date,
            images: post.meta.featuredImage ? [{ url: post.meta.featuredImage }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.meta.title,
            description: post.meta.description,
        },
        alternates: { canonical: `/blog/${slug}` },
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const post = getBlogPost(slug)
    if (!post) notFound()

    const allPosts = getAllBlogPosts().filter((p) => p.meta.slug !== slug)
    const relatedPosts = allPosts.slice(0, 3)
    const featuredImage = post.meta.featuredImage || '/images/house-1.webp'

    return (
        <div className="bg-white min-h-screen pt-[124px] lg:pt-[136px] pb-24">
            <div className="max-w-[800px] mx-auto px-6">
                <h1 className="font-display text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] font-semibold text-brand-text leading-[1.12] text-center text-balance pt-4 pb-5">
                    {post.meta.title}
                </h1>

                <div className="flex items-center justify-center gap-3 mb-10">
                    <p className="text-[13px] text-brand-text-muted tracking-wide">
                        <span className="font-semibold text-brand-text">Gretta Hughes</span>
                        <span className="mx-2 text-brand-border/80">&middot;</span>
                        <span>Sales Representative</span>
                        <span className="mx-2 text-brand-border/80">&middot;</span>
                        <span>RE/MAX Twin City</span>
                    </p>
                </div>

                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-12">
                    <Image
                        src={featuredImage}
                        alt={post.meta.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>

                <article>
                    <div
                        className="blog-content prose prose-lg max-w-none text-brand-text-muted font-light leading-relaxed prose-headings:font-display prose-headings:text-brand-text prose-headings:font-semibold prose-a:text-brand-accent prose-strong:text-brand-text prose-blockquote:border-brand-accent prose-blockquote:text-brand-text-muted"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                    />
                </article>

                <div className="mt-16 pt-8 border-t border-brand-border/40 text-center sm:text-left">
                    <p className="text-sm font-medium text-brand-text">Gretta Hughes</p>
                    <p className="text-xs text-brand-text-muted mt-0.5 mb-2">
                        Sales Representative &middot; RE/MAX Twin City Realty
                    </p>
                    <p className="text-sm text-brand-text-muted font-light leading-relaxed max-w-md">
                        Helping buyers and sellers across Waterloo Region, Brant County, and beyond make confident real
                        estate decisions.
                    </p>
                </div>

                {relatedPosts.length > 0 && (
                    <div className="mt-20 pt-10 border-t border-brand-border/20">
                        <h2 className="font-display text-3xl text-brand-text text-center mb-10">Related Articles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {relatedPosts.map((related) => (
                                <Link
                                    key={related.meta.slug}
                                    href={`/blog/${related.meta.slug}`}
                                    className="group overflow-hidden hover:shadow-md transition-shadow rounded-lg border border-brand-border/30"
                                >
                                    <div className="relative aspect-[16/10] bg-gray-50">
                                        <Image
                                            src={related.meta.featuredImage || '/images/house-1.webp'}
                                            alt={related.meta.title}
                                            fill
                                            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 bg-white">
                                        <h3 className="font-body text-sm font-semibold text-brand-text group-hover:text-brand-accent transition-colors leading-snug mb-1.5 line-clamp-2">
                                            {related.meta.title}
                                        </h3>
                                        <p className="text-brand-text-muted text-xs font-light line-clamp-2">
                                            {related.meta.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-16 bg-brand-bg-dark text-white p-10 md:p-14 text-center rounded-lg">
                    <h3 className="font-display text-3xl mb-4 italic text-brand-gold">
                        Have questions about the Waterloo Region market?
                    </h3>
                    <p className="text-white/70 font-light mb-8 max-w-md mx-auto text-sm leading-relaxed">
                        Whether you{"'"}re buying, selling, or just curious, Gretta is here to help you make informed
                        decisions.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-brand-accent hover:bg-brand-accent-light text-white px-10 py-3.5 uppercase tracking-wider text-xs font-semibold transition-colors rounded-sm"
                    >
                        Get in Touch &rarr;
                    </Link>
                </div>
            </div>
        </div>
    )
}
