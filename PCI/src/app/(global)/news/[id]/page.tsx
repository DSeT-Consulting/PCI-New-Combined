// src\app\(global)\news\[id]\page.tsx

import React, { type PropsWithChildren } from 'react';
import { Calendar, Clock, Share2, BookmarkPlus, ArrowLeft, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import Image from 'next/image';
import { newsAPI } from '../api';
import type { NewsArticle } from '../api';
import { formatDate } from '~/lib/utils';
import parse from 'html-react-parser';
import { notFound } from 'next/navigation';

// Type definitions for dynamic route params
interface PageParams {
    id: string;
}

interface RelatedArticle {
    id: number;
    title: string;
    slug: string;
    publishedAt: string;
    category: {
        id: number;
        name: string;
    };
    featuredImage?: string;
    excerpt: string;
}

// API function to get article by slug
const getArticleBySlug = async (slug: string): Promise<NewsArticle | null> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080"}/api/news/public/article/${slug}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Failed to fetch article');
        }
        return response.json() as Promise<NewsArticle>;
    } catch (error) {
        console.error('Error fetching article:', error);
        throw error;
    }
};

// API function to get related articles
const getRelatedArticles = async (slug: string, limit = 3): Promise<RelatedArticle[]> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080"}/api/news/public/related/${slug}?limit=${limit}`
        );
        if (!response.ok) {
            console.warn('Failed to fetch related articles');
            return [];
        }
        return response.json() as Promise<RelatedArticle[]>;
    } catch (error) {
        console.warn('Error fetching related articles:', error);
        return [];
    }
};

// Utility functions
const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
        'Technology': 'bg-blue-100 text-blue-800 border-blue-200',
        'Community': 'bg-green-100 text-green-800 border-green-200',
        'Health': 'bg-purple-100 text-purple-800 border-purple-200',
        'Sports': 'bg-orange-100 text-orange-800 border-orange-200',
        'News': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category] ?? colors.News ?? "";
};

// Individual News Article Component
interface NewsArticleProps {
    article: NewsArticle;
}

function ImagesGroup({ children }: PropsWithChildren) {
    return (
        <>
            <br />
            <div className="space-y-6">{children}</div>
            <br />
        </>
    );
}

function NewsImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="news-image mx-auto w-full max-w-[600px] my-6">
            <Image
                src={src}
                alt={alt}
                width="800"
                height="600"
                className="w-full h-auto object-cover rounded-2xl"
            />
        </div>
    );
}

const NewsArticle: React.FC<NewsArticleProps> = ({ article }) => {
    return (
        <article className="max-w-4xl mx-auto px-1 sm:px-6 lg:px-8">
            {/* Article Header */}
            <div className="mb-6 sm:mb-8 lg:mb-12">
                {/* Category and Breaking Badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium border ${getCategoryColor(article.category.name)}`}>
                        {article.category.name}
                    </span>
                    {article.isBreaking && (
                        <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold bg-red-100 text-red-800 border border-red-200 animate-pulse">
                            🔴 Breaking
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                    {article.title}
                </h1>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <time dateTime={article.publishedAt} className="text-xs sm:text-sm">
                            {formatDate(article.publishedAt)}
                        </time>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">{article.readTime} min read</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm">👁️ {article.viewCount.toLocaleString()} views</span>
                    </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2 sm:gap-3 pb-4 sm:pb-6 border-b border-gray-200">
                    <img
                        src="/assets/dummy-profile.png"
                        alt="PCI Author"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-sm sm:text-base font-semibold text-gray-900">By PCI Team</p>
                        <p className="text-xs sm:text-sm text-gray-600">Paralympic Committee of India</p>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="relative mb-6 sm:mb-8 lg:mb-12 -mx-4 sm:mx-0">
                <Image
                    src={article.featuredImage ?? "/assets/home/news1.png"}
                    alt={article.title}
                    width="1000"
                    height="500"
                    className='w-full h-auto object-cover rounded-lg sm:rounded-2xl shadow-lg'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg sm:rounded-2xl" />
            </div>

            {/* Article Content */}
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-8 sm:mb-12 text-gray-800 leading-relaxed">
                <div className="text-sm sm:text-base lg:text-lg leading-7 sm:leading-8">
                    {(() => {
                        // Convert JSX-like content to proper HTML
                        const htmlContent = article.content
                            .replace(/^<>\s*/g, '') // Remove opening React fragment
                            .replace(/\s*<\/>$/g, '') // Remove closing React fragment
                            .replace(/<ImagesGroup>/g, '<div class="images-group my-4 sm:my-6">')
                            .replace(/<\/ImagesGroup>/g, '</div>')
                            .replace(/<NewsImage\s+src="([^"]+)"\s+alt="([^"]+)"\s*\/>/g,
                                '<div class="news-image mx-auto w-full max-w-[600px] my-4 sm:my-6"><img src="$1" alt="$2" class="w-full h-auto object-cover rounded-xl sm:rounded-2xl" /></div>')
                            .replace(/\{" "\}/g, ' '); // Handle {" "} spaces

                        return parse(htmlContent);
                    })()}
                </div>
            </div>

            {/* Tags */}
            <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Tags</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {article.tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            #{tag.name.replace(/\s+/g, '')}
                        </span>
                    ))}
                </div>
            </div>

            {/* Share Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 bg-gray-50 rounded-xl mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <span className="text-sm sm:text-base font-semibold text-gray-900">Share this article:</span>
                    <div className="flex gap-2">
                        {[
                            { icon: Facebook, color: 'hover:text-blue-600', label: 'Facebook' },
                            { icon: Twitter, color: 'hover:text-sky-500', label: 'Twitter' },
                            { icon: Instagram, color: 'hover:text-pink-600', label: 'Instagram' },
                            { icon: Youtube, color: 'hover:text-red-600', label: 'YouTube' }
                        ].map(({ icon: Icon, color, label }) => (
                            <button
                                key={label}
                                className={`p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all ${color}`}
                                aria-label={`Share on ${label}`}
                            >
                                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                        ))}
                    </div>
                </div>

                <button className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-700 hover:text-gray-900 text-sm sm:text-base">
                    <BookmarkPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                    Save Article
                </button>
            </div>
        </article>
    );
};

// Related Articles Component
interface RelatedArticlesProps {
    articles: RelatedArticle[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
    if (articles.length === 0) {
        return null;
    }

    return (
        <section className="mt-12 sm:mt-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Related Articles</h2>
                <Link href="/news">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base">
                        View All News
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {articles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/news/${article.slug}`}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group block"
                    >
                        <div className="relative h-40 sm:h-48 overflow-hidden">
                            <img
                                src={article.featuredImage ?? "/assets/home/news1.png"}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category.name)}`}>
                                    {article.category.name}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6">
                            <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 sm:mb-3 line-clamp-2">
                                {article.excerpt}
                            </p>

                            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                                <span>{formatDate(article.publishedAt).split(',')[0]}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

// Newsletter Subscription Component
const NewsletterSubscription: React.FC = () => {
    return (
        <section className="mt-12 sm:mt-16 mx-4 sm:mx-6 lg:mx-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
            <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Stay Updated with Paralympic News</h3>
                <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">
                    Get the latest updates, exclusive interviews, and behind-the-scenes content delivered directly to your inbox.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
                    />
                    <button className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base">
                        Subscribe
                    </button>
                </div>

                <p className="text-xs text-blue-200 mt-3 sm:mt-4">
                    By subscribing, you agree to our privacy policy and terms of service.
                </p>
            </div>
        </section>
    );
};

// Navigation Component
const ArticleNavigation: React.FC = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 p-3 sm:p-4 mx-4 sm:mx-6 lg:mx-8 bg-white rounded-lg shadow-sm">
            <Link href="/news">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base">
                    <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                    Back to News
                </button>
            </Link>

            <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="Previous Article">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="Next Article">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// Main Individual News Page Component
interface IndividualNewsPageProps {
    params: PageParams;
}

const IndividualNewsPage: React.FC<IndividualNewsPageProps> = async ({ params }) => {
    const article = await getArticleBySlug(params.id);
    
    if (!article) {
        notFound();
    }

    // Increment view count
    try {
        await newsAPI.incrementViewCount(params.id);
    } catch (error) {
        // Silently fail for view count
    }

    // Get related articles
    const relatedArticles = await getRelatedArticles(article.slug);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto pt-2 pb-12 sm:pb-16 lg:pb-20">
                <ArticleNavigation />

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm mx-4 sm:mx-6 lg:mx-8 p-0 sm:p-6 lg:p-8 xl:p-12">
                    <NewsArticle article={article} />
                </div>

                <div className="max-w-6xl mx-auto">
                    <RelatedArticles articles={relatedArticles} />
                    {/* <NewsletterSubscription /> */}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default IndividualNewsPage;