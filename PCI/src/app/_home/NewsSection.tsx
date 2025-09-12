// src\app\_home\NewsSection.tsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Types for API responses
interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  publishedAt: string;
  viewCount: number;
  readTime: number;
  category: {
    id: number;
    name: string;
  };
  tags: Array<{
    id: number;
    name: string;
  }>;
  classifications: Array<{
    id: number;
    name: string;
    priority: number;
  }>;
  featured: boolean;
  isBreaking: boolean;
}

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

// Helper function to format date
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// API function to fetch latest news
const fetchLatestNews = async (): Promise<NewsArticle[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/public/search?sortBy=publishedAt&sortOrder=desc&limit=6&offset=0`);
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json() as Promise<NewsArticle[]>;
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }
};

export default function NewsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        setError('');
        const articles = await fetchLatestNews();
        setNewsItems(articles);
      } catch (err) {
        setError('Failed to load news articles');
        console.error('Error loading news:', err);
      } finally {
        setIsLoading(false);
      }
    };

    void loadNews();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-paralympic-gray">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <div className="inline-block bg-paralympic-blue px-4 py-1 rounded-full mb-4">
                <span className="text-white font-semibold">Stay Updated</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-paralympic-navy mb-4">
                Latest News
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Discover the latest updates, announcements, and stories from the Paralympic Committee Of India.
              </p>
            </div>
            
            <Link 
              href="/news"
              className="group mt-6 md:mt-0 inline-flex items-center font-bold text-paralympic-blue hover:text-paralympic-green transition-colors"
            >
              <span>View All News</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          {/* Loading skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col animate-pulse">
                <div className="h-56 bg-gray-300"></div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state with fallback
  if (error && newsItems.length === 0) {
    return (
      <section className="py-20 bg-paralympic-gray">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block bg-paralympic-red px-4 py-1 rounded-full mb-4">
              <span className="text-white font-semibold">Error</span>
            </div>
            <h2 className="text-2xl font-bold text-paralympic-navy mb-4">
              Unable to load latest news
            </h2>
            <p className="text-gray-600 mb-6">
              Please check your internet connection and try again later.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-paralympic-blue text-white px-6 py-2 rounded-full hover:bg-paralympic-green transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-paralympic-gray">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="inline-block bg-paralympic-blue px-4 py-1 rounded-full mb-4">
              <span className="text-white font-semibold">Stay Updated</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-paralympic-navy mb-4">
              Latest News
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover the latest updates, announcements, and stories from the Paralympic Committee Of India.
            </p>
          </div>
          
          <Link 
            href="/news"
            className="group mt-6 md:mt-0 inline-flex items-center font-bold text-paralympic-blue hover:text-paralympic-green transition-colors"
          >
            <span>View All News</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Link 
              key={item.id}
              href={`/news/${item.slug}`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={item.featuredImage ?? '/assets/home/news1.png'}
                    alt={item.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      hoveredCard === item.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute top-4 left-4 bg-paralympic-blue text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {item.category.name}
                  </div>
                  {item.isBreaking && (
                    <div className="absolute top-4 right-4 bg-paralympic-red text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      BREAKING
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-sm text-gray-500 mb-2">
                    {formatDate(item.publishedAt)}
                  </span>
                  <h3 className="text-xl font-bold text-paralympic-navy mb-3 group-hover:text-paralympic-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {item.excerpt}
                  </p>
                  
                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag.id}
                          className="text-xs bg-paralympic-gray px-2 py-1 rounded text-paralympic-navy"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-paralympic-blue font-medium">
                      <span>Read more</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.readTime} min read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show message if no articles */}
        {newsItems.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No news articles available at the moment.</p>
            <p className="text-gray-500 text-sm mt-2">Please check back later for updates.</p>
          </div>
        )}
      </div>
    </section>
  );
}