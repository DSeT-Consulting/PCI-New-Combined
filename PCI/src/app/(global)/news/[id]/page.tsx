// src\app\(global)\news\[id]\page.tsx

import React from 'react';
import { Calendar, Clock, Share2, BookmarkPlus, ArrowLeft, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import Image from 'next/image';
import { newsAPI } from '../api';
import type { NewsArticle } from '../api';
import { formatDate } from '~/lib/utils';
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"}/api/news/public/article/${slug}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Failed to fetch article');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching article:', error);
        throw error;
    }
};

// API function to get related articles
const getRelatedArticles = async (slug: string, limit: number = 3): Promise<RelatedArticle[]> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"}/api/news/public/related/${slug}?limit=${limit}`
        );
        if (!response.ok) {
            console.warn('Failed to fetch related articles');
            return [];
        }
        return response.json();
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

const NewsArticle: React.FC<NewsArticleProps> = ({ article }) => {
    return (
        <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-8">
                {/* Category and Breaking Badge */}
                <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(article.category.name)}`}>
                        {article.category.name}
                    </span>
                    {article.isBreaking && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-200 animate-pulse">
                            🔴 Breaking
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    {article.title}
                </h1>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={article.publishedAt}>
                            {formatDate(article.publishedAt)}
                        </time>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime} min read</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>👁️ {article.viewCount.toLocaleString()} views</span>
                    </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                    <img
                        src="/assets/dummy-profile.png"
                        alt="PCI Author"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold text-gray-900">By PCI Team</p>
                        <p className="text-sm text-gray-600">Paralympic Committee of India</p>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="relative mb-8">
                <Image
                    src={article.featuredImage || "/assets/home/news1.png"}
                    alt={article.title}
                    width="1000"
                    height="500"
                    className='w-full h-auto object-cover rounded-2xl shadow-lg'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>

            {/* Article Content */}
            <div
                className="prose prose-lg max-w-none mb-12 text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                    fontSize: '18px',
                    lineHeight: '1.8'
                }}
            />

            {/* Tags */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            #{tag.name.replace(/\s+/g, '')}
                        </span>
                    ))}
                </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl mb-12">
                <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-900">Share this article:</span>
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
                                <Icon className="h-5 w-5" />
                            </button>
                        ))}
                    </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-700 hover:text-gray-900">
                    <BookmarkPlus className="h-4 w-4" />
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
        <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Related Articles</h2>
                <Link href="/news">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors">
                        View All News
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/news/${article.slug}`}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group block"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={article.featuredImage || "/assets/home/news1.png"}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category.name)}`}>
                                    {article.category.name}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {article.excerpt}
                            </p>

                            <div className="flex items-center justify-between text-sm text-gray-600">
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
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Stay Updated with Paralympic News</h3>
                <p className="text-blue-100 mb-6">
                    Get the latest updates, exclusive interviews, and behind-the-scenes content delivered directly to your inbox.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                        Subscribe
                    </button>
                </div>

                <p className="text-xs text-blue-200 mt-4">
                    By subscribing, you agree to our privacy policy and terms of service.
                </p>
            </div>
        </section>
    );
};

// Navigation Component
const ArticleNavigation: React.FC = () => {
    return (
        <div className="flex items-center justify-between mb-2 p-4 bg-white rounded-lg shadow-sm">
            <Link href="/news">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
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

            <div className="container mx-auto px-4 pt-2 pb-20">
                <ArticleNavigation />

                <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
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