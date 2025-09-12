// src\app\(global)\news\page.tsx
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "~/components/modules/Navbar";
import Footer from "~/components/modules/Footer";
import { formatDate } from "~/lib/utils";
import {
  Category,
  newsAPI,
  NewsArticle,
  NewsPageData,
  NewsSection,
  SearchFilters,
} from "./api";

// Remove static data - will be replaced with dynamic API calls

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title", label: "Title A-Z" },
  { value: "category", label: "Category" },
];

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [displayedNews, setDisplayedNews] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // API Data States
  const [newsPageData, setNewsPageData] = useState<NewsPageData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allSections, setAllSections] = useState<NewsSection[]>([]);
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Loading States
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadingSection, setLoadingSection] = useState<number | null>(null);

  // Pagination States (replace displayedNews)
  const [searchOffset, setSearchOffset] = useState(0);
  const [searchLimit] = useState(12);
  const [hasMoreSearchResults, setHasMoreSearchResults] = useState(false);

  // Error State
  const [error, setError] = useState<string>("");

  // Get dynamic categories for filtering
  const dynamicCategories = useMemo(() => {
    const cats = [{ id: 0, name: "All" }];
    return cats.concat(categories);
  }, [categories]);

  // Get featured articles from search results or sections
  const featuredArticles = useMemo(() => {
    if (isSearchMode) {
      return searchResults.filter((article) => article.featured);
    }

    // Get featured articles from all sections
    const featured: NewsArticle[] = [];
    allSections.forEach((section) => {
      const sectionFeatured = section.articles.filter(
        (article) => article.featured,
      );
      featured.push(...sectionFeatured);
    });
    return featured;
  }, [isSearchMode, searchResults, allSections]);

  // Get regular articles for display
  const regularArticles = useMemo(() => {
    if (isSearchMode) {
      return searchResults.filter((article) => !article.featured);
    }

    // Get regular articles from all sections
    const regular: NewsArticle[] = [];
    allSections.forEach((section) => {
      const sectionRegular = section.articles.filter(
        (article) => !article.featured,
      );
      regular.push(...sectionRegular);
    });
    return regular.slice(0, displayedNews);
  }, [isSearchMode, searchResults, allSections, displayedNews]);

  // Infinite scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0]?.isIntersecting &&
          displayedNews < regularArticles.length
        ) {
          loadMoreNews();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [displayedNews, regularArticles.length]);

  useEffect(() => {
    loadInitialData();
  }, []);

  // Search effect (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() || selectedCategory !== "All") {
        handleSearch();
      } else {
        // Reset to initial sections view
        setIsSearchMode(false);
        setSearchResults([]);
        setSearchOffset(0);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, sortBy]);

  // REPLACE existing data loading logic with these functions:

  const loadInitialData = async () => {
    try {
      setIsLoadingInitial(true);
      setError("");

      // Load initial page data and categories in parallel
      const [pageData, categoriesData] = await Promise.all([
        newsAPI.getPageData(),
        newsAPI.getCategories(),
      ]);

      setNewsPageData(pageData);
      setAllSections(pageData.sections);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load news data");
    } finally {
      setIsLoadingInitial(false);
    }
  };

  const handleSearch = async (resetOffset: boolean = true) => {
    try {
      setIsLoadingSearch(true);
      if (resetOffset) setSearchOffset(0);

      const offset = resetOffset ? 0 : searchOffset;

      // Convert sort option to API parameters
      const getSortParams = () => {
        switch (sortBy) {
          case "oldest":
            return {
              sortBy: "publishedAt" as const,
              sortOrder: "asc" as const,
            };
          case "title":
            return { sortBy: "title" as const, sortOrder: "asc" as const };
          case "category":
            return {
              sortBy: "publishedAt" as const,
              sortOrder: "desc" as const,
            }; // Keep recent for category
          default:
            return {
              sortBy: "publishedAt" as const,
              sortOrder: "desc" as const,
            }; // newest
        }
      };

      const { sortBy: apiSortBy, sortOrder } = getSortParams();

      const searchFilters: SearchFilters = {
        search: searchQuery.trim() || undefined,
        categoryId:
          selectedCategory !== "All"
            ? getCategoryIdByName(selectedCategory)
            : undefined,
        sortBy: apiSortBy,
        sortOrder: sortOrder,
        limit: searchLimit,
        offset: offset,
      };

      const results = await newsAPI.searchNews(searchFilters);

      if (resetOffset) {
        setSearchResults(results);
      } else {
        setSearchResults((prev) => [...prev, ...results]);
      }

      setHasMoreSearchResults(results.length === searchLimit);
      setIsSearchMode(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search news");
    } finally {
      setIsLoadingSearch(false);
    }
  };

  const loadMoreSearchResults = async () => {
    if (!hasMoreSearchResults || isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      const newOffset = searchOffset + searchLimit;
      setSearchOffset(newOffset);
      await handleSearch(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load more results",
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  const loadMoreSectionArticles = async (
    sectionIndex: number,
    classificationId: number,
  ) => {
    try {
      setLoadingSection(classificationId);

      const currentSection = allSections[sectionIndex];
      if (!currentSection) return;

      const offset = currentSection.articles.length;
      const response = await newsAPI.getSectionArticles(
        classificationId,
        6,
        offset,
      );

      // Update the specific section with new articles
      setAllSections((prevSections) => {
        const updatedSections = [...prevSections];
        updatedSections[sectionIndex] = {
          ...currentSection,
          articles: [...currentSection.articles, ...response.articles],
          hasMore: response.hasMore,
          totalCount: response.totalCount,
        };
        return updatedSections;
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load more articles",
      );
    } finally {
      setLoadingSection(null);
    }
  };

  // Helper function to get category ID by name
  const getCategoryIdByName = (categoryName: string): number | undefined => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category?.id;
  };

  // REPLACE clearFilters function:
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("newest");
    setSearchOffset(0);
    setIsSearchMode(false);
    setSearchResults([]);
    setError("");
  };

  const loadMoreNews = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedNews((prev) => Math.min(prev + 6, regularArticles.length));
      setIsLoading(false);
    }, 500);
  };

  // Show loading state while initial data is loading
  if (isLoadingInitial) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white">
          {/* Hero Section with loading */}
          <section className="relative overflow-hidden bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-paralympic-green py-20 text-white">
            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-6 inline-block animate-pulse rounded-full bg-white/10 px-6 py-2 backdrop-blur-sm">
                  <span className="font-bold text-paralympic-yellow">
                    🔥 LOADING...
                  </span>
                </div>
                <h1 className="mb-6 animate-fade-in text-5xl font-bold md:text-7xl">
                  Paralympic News Hub
                </h1>
                <p className="mx-auto mb-8 max-w-3xl text-xl text-paralympic-gray md:text-2xl">
                  Loading the latest news and stories from the Paralympic
                  Movement...
                </p>
              </div>
            </div>
          </section>

          {/* Loading skeleton for content */}
          <section className="bg-paralympic-gray/30 py-16">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded bg-gray-300"></div>
                <div className="mx-auto h-4 w-96 animate-pulse rounded bg-gray-300"></div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="flex h-full animate-pulse flex-col overflow-hidden rounded-xl bg-white shadow-lg"
                  >
                    <div className="h-56 bg-gray-300"></div>
                    <div className="flex flex-grow flex-col p-6">
                      <div className="mb-2 h-4 rounded bg-gray-300"></div>
                      <div className="mb-3 h-6 rounded bg-gray-300"></div>
                      <div className="mb-2 h-4 rounded bg-gray-300"></div>
                      <div className="mb-4 h-4 w-3/4 rounded bg-gray-300"></div>
                      <div className="h-4 w-1/3 rounded bg-gray-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  // Show error state
  if (error && !isSearchMode && allSections.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white">
          <section className="bg-paralympic-gray py-20">
            <div className="container mx-auto px-4 text-center">
              <div className="mb-4 inline-block rounded-full bg-paralympic-red px-4 py-1">
                <span className="font-semibold text-white">Error</span>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-paralympic-navy">
                Unable to Load News
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-gray-600">
                We&apos;re having trouble loading the news content. Please check
                your internet connection and try again.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-full bg-paralympic-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-paralympic-green"
                >
                  Retry
                </button>
                <button
                  onClick={clearFilters}
                  className="rounded-full bg-gray-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
                >
                  Reset Filters
                </button>
              </div>
              {error && (
                <p className="mt-4 inline-block rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                  Error: {error}
                </p>
              )}
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-paralympic-green py-20 text-white">
          {/* Enhanced Animated background */}
          <div className="absolute inset-0">
            {/* Floating orbs */}
            <div className="absolute left-10 top-10 h-64 w-64 animate-pulse rounded-full bg-paralympic-yellow/20 blur-3xl"></div>
            <div
              className="absolute bottom-10 right-10 h-80 w-80 animate-pulse rounded-full bg-paralympic-red/20 blur-3xl"
              style={{ animationDelay: "2s" }}
            ></div>
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform animate-bounce-slow rounded-full bg-white/10 blur-3xl"></div>

            {/* Floating particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-2 w-2 animate-pulse rounded-full bg-white/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              ></div>
            ))}

            {/* Moving lines */}
            <div className="absolute left-0 top-0 h-full w-full">
              <div className="absolute left-0 top-1/4 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div
                className="absolute left-0 top-3/4 h-px w-full animate-pulse bg-gradient-to-r from-transparent via-paralympic-yellow/30 to-transparent"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              {/* Animated badge */}
              <div className="mb-6 inline-block transform animate-fade-in rounded-full bg-white/10 px-6 py-2 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <span className="relative font-bold text-paralympic-yellow">
                  <span className="animate-pulse">🔥</span> LATEST UPDATES
                </span>
              </div>

              {/* Animated title */}
              <h1
                className="mb-6 animate-fade-in text-5xl font-bold md:text-7xl"
                style={{ animationDelay: "0.3s" }}
              >
                <span className="inline-block hover:animate-bounce">
                  Paralympic
                </span>
                <span className="block animate-pulse bg-gradient-to-r from-paralympic-yellow to-paralympic-green bg-clip-text text-transparent">
                  News Hub
                </span>
              </h1>

              {/* Typing effect simulation */}
              <p
                className="mx-auto mb-8 max-w-3xl animate-fade-in text-xl text-paralympic-gray md:text-2xl"
                style={{ animationDelay: "0.6s" }}
              >
                Stay informed with the latest news, achievements, and inspiring
                stories from the Paralympic Movement around the world.
              </p>

              {/* Enhanced Hero Search with floating effect */}
              <div
                className="mx-auto max-w-2xl transform animate-fade-in transition-all duration-300 hover:scale-105"
                style={{ animationDelay: "0.9s" }}
              >
                <div className="group relative">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-paralympic-yellow to-paralympic-green opacity-20 blur transition-opacity duration-300 group-hover:opacity-40"></div>
                  <input
                    type="text"
                    placeholder="Search news, athletes, events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 pl-14 text-white placeholder-white/70 backdrop-blur-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-paralympic-yellow"
                  />
                  {/* Animated search icon */}
                  <svg
                    className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white/70 transition-colors duration-300 group-hover:animate-pulse group-hover:text-paralympic-yellow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>

                  {/* Search suggestions animation (when typing) */}
                  {searchQuery && (
                    <div className="absolute left-0 right-0 top-full mt-2 animate-fade-in rounded-lg border border-white/20 bg-white/95 shadow-xl backdrop-blur-sm">
                      <div className="p-4 text-gray-700">
                        <div className="mb-2 flex items-center space-x-2">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-paralympic-blue"></div>
                          <span className="text-sm">
                            Searching for &quot;{searchQuery}&quot;...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-paralympic-gray/30 pb-4 pt-2">
          <div className="container mx-auto px-4">
            {/* Main filters row */}
            <div className="mb-3 flex flex-col items-start justify-between gap-3 xl:flex-row xl:items-center">
              {/* Category Filter */}
              <div className="flex flex-1 items-center space-x-3 overflow-x-auto pb-2 xl:pb-0">
                <span className="flex items-center whitespace-nowrap text-sm font-medium text-paralympic-navy">
                  <span className="mr-2 animate-pulse">📂</span>
                  Categories:
                </span>
                <div className="flex space-x-1.5 overflow-y-hidden py-2">
                  {dynamicCategories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`transform whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium transition-all hover:scale-105 hover:shadow-md ${
                        selectedCategory === category.name
                          ? "bg-paralympic-blue text-white"
                          : "border border-transparent bg-white text-paralympic-navy hover:border-paralympic-blue hover:bg-paralympic-blue/10"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Sort and Clear with animations */}
              <div className="flex flex-shrink-0 items-center space-x-2">
                {/* Animated sort dropdown */}
                <div className="group relative">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-paralympic-blue/20 to-paralympic-green/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100"></div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="relative rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs text-paralympic-navy transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-paralympic-blue"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Animated clear button */}
                <button
                  onClick={clearFilters}
                  className="group transform whitespace-nowrap rounded-lg bg-paralympic-red px-2.5 py-1 text-xs font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-paralympic-red/90 hover:shadow-md"
                >
                  <span className="flex items-center">
                    <svg
                      className="mr-1 h-3 w-3 group-hover:animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Clear
                  </span>
                </button>
              </div>
            </div>

            {/* Enhanced Results count with animation */}
            <div className="flex animate-fade-in items-center text-xs text-gray-600">
              <span className="mr-1 animate-pulse">📊</span>
              {isSearchMode ? (
                <>
                  Showing{" "}
                  <span className="mx-1 animate-bounce font-bold text-paralympic-blue">
                    {searchResults.length}
                  </span>
                  {searchResults.length === 1 ? "article" : "articles"}
                </>
              ) : (
                <>
                  Showing{" "}
                  <span className="mx-1 animate-bounce font-bold text-paralympic-blue">
                    {featuredArticles.length + regularArticles.length}
                  </span>
                  {featuredArticles.length + regularArticles.length === 1
                    ? "article"
                    : "articles"}
                </>
              )}
              {searchQuery && (
                <span className="ml-1">
                  for &quot;
                  <span className="font-semibold text-paralympic-green">
                    {searchQuery}
                  </span>
                  &quot;
                </span>
              )}
              {selectedCategory !== "All" && (
                <span className="ml-1">
                  in{" "}
                  <span className="font-semibold text-paralympic-blue">
                    {selectedCategory}
                  </span>
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Featured News Section */}
        {featuredArticles.length > 0 && (
          <section className="relative overflow-hidden bg-white py-16">
            {/* Subtle animated background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-paralympic-blue to-paralympic-green blur-3xl"></div>
              <div
                className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tl from-paralympic-yellow to-paralympic-red blur-3xl"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            <div className="container relative z-10 mx-auto px-4">
              <div className="mb-12 animate-fade-in">
                {/* Enhanced breaking badge without blinking */}
                <div className="group mb-4 inline-block rounded-full bg-paralympic-red px-4 py-1 hover:animate-bounce">
                  <span className="flex items-center font-semibold text-white">
                    <span className="mr-2">⚡</span>
                    Breaking News
                  </span>
                </div>
                <h2 className="transform text-4xl font-bold text-paralympic-navy transition-transform duration-300 hover:scale-105">
                  Featured Stories
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {featuredArticles.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="group animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="group flex h-full transform flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 hover:shadow-2xl">
                      {/* Image with advanced hover effects */}
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={item.featuredImage || "/assets/home/news1.png"}
                          alt={item.title}
                          fill
                          className={`object-cover transition-all duration-700 ${
                            hoveredCard === item.id
                              ? "scale-110 brightness-110"
                              : "scale-100"
                          }`}
                        />
                        {/* Animated overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-500 group-hover:from-black/40"></div>

                        {/* Static featured badge */}
                        <div className="absolute left-4 top-4 rounded-full bg-paralympic-red px-3 py-1 text-sm font-semibold text-white group-hover:animate-bounce">
                          Featured
                        </div>

                        {/* Breaking news badge */}
                        {item.isBreaking && (
                          <div className="absolute right-4 top-4 animate-pulse rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                            BREAKING
                          </div>
                        )}

                        {/* Animated category and read time */}
                        <div className="absolute bottom-4 right-4 flex translate-y-2 transform items-center space-x-2 transition-transform duration-300 group-hover:translate-y-0">
                          <span className="rounded bg-paralympic-blue px-2 py-1 text-xs font-semibold text-white">
                            {item.category.name}
                          </span>
                          <span className="rounded bg-black/50 px-2 py-1 text-xs text-white">
                            {item.readTime} min
                          </span>
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-paralympic-blue/20 to-paralympic-green/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-grow flex-col p-6">
                        <span className="mb-2 text-sm text-gray-500">
                          {formatDate(item.publishedAt)}
                        </span>
                        <h3 className="mb-3 text-xl font-bold text-paralympic-navy transition-colors group-hover:text-paralympic-blue">
                          {item.title}
                        </h3>
                        <p className="mb-4 flex-grow text-gray-600">
                          {item.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="mb-4 flex flex-wrap gap-2">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag.id}
                              className="rounded bg-paralympic-gray px-2 py-1 text-xs text-paralympic-navy"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center font-medium text-paralympic-blue">
                          <span>Read Full Story</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Classification-based Sections or Search Results */}
        {isSearchMode ? (
          <section className="bg-paralympic-gray/30 py-16">
            <div className="container mx-auto px-4">
              <div className="mb-12">
                <h2 className="mb-4 text-4xl font-bold text-paralympic-navy">
                  Search Results
                </h2>
                <p className="text-lg text-gray-600">
                  {searchQuery
                    ? `Results for "${searchQuery}"`
                    : "Filtered results"}
                </p>
              </div>

              {searchResults.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/news/${item.slug}`}
                        className="group"
                        onMouseEnter={() => setHoveredCard(item.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div className="flex h-full transform flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                          {/* Image */}
                          <div className="relative h-56 w-full overflow-hidden">
                            <Image
                              src={
                                item.featuredImage || "/assets/home/news1.png"
                              }
                              alt={item.title}
                              fill
                              className={`object-cover transition-transform duration-700 ${
                                hoveredCard === item.id
                                  ? "scale-110"
                                  : "scale-100"
                              }`}
                            />
                            <div className="absolute left-4 top-4 rounded-full bg-paralympic-blue px-3 py-1 text-sm font-semibold text-white">
                              {item.category.name}
                            </div>
                            {item.isBreaking && (
                              <div className="absolute right-4 top-4 animate-pulse rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                BREAKING
                              </div>
                            )}
                            <div className="absolute bottom-4 right-4 rounded bg-black/70 px-2 py-1 text-xs text-white">
                              {item.readTime} min
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex flex-grow flex-col p-6">
                            <span className="mb-2 text-sm text-gray-500">
                              {formatDate(item.publishedAt)}
                            </span>
                            <h3 className="mb-3 text-xl font-bold text-paralympic-navy transition-colors group-hover:text-paralympic-blue">
                              {item.title}
                            </h3>
                            <p className="mb-4 flex-grow text-gray-600">
                              {item.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="mb-4 flex flex-wrap gap-2">
                              {item.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag.id}
                                  className="rounded bg-paralympic-gray px-2 py-1 text-xs text-paralympic-navy"
                                >
                                  {tag.name}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center font-medium text-paralympic-blue">
                              <span>Read more</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Load More Search Results */}
                  {hasMoreSearchResults && (
                    <div className="mt-12 text-center">
                      {isLoadingMore ? (
                        <div className="flex animate-fade-in items-center justify-center space-x-3">
                          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-paralympic-blue"></div>
                          <span className="animate-pulse font-medium text-paralympic-navy">
                            Loading more results...
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={loadMoreSearchResults}
                          className="group transform animate-bounce rounded-full bg-paralympic-blue px-8 py-3 font-bold text-white transition-all duration-500 hover:scale-110 hover:bg-paralympic-green hover:shadow-xl"
                        >
                          <span className="flex items-center">
                            <span className="mr-2 animate-pulse">🔍</span>
                            Load More Results
                            <svg
                              className="ml-2 h-4 w-4 group-hover:animate-bounce"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                              />
                            </svg>
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="animate-fade-in py-16 text-center">
                  <div className="mb-4 animate-bounce text-6xl">
                    📰<span className="ml-2 animate-pulse text-4xl">😔</span>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-paralympic-navy">
                    No results found
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Try adjusting your search terms or filters to find more
                    articles.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="transform rounded-full bg-paralympic-blue px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-paralympic-green"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : (
          /* Classification-based Sections */
          <div className="bg-paralympic-gray/30">
            {allSections.map((section, sectionIndex) => (
              <section key={section.classification.id} className="py-16">
                <div className="container mx-auto px-4">
                  <div className="mb-12">
                    <h2 className="mb-4 text-4xl font-bold text-paralympic-navy">
                      {section.classification.name}
                    </h2>
                    {/* <p className="text-lg text-gray-600">
                      {section.totalCount} articles in this section
                    </p> */}
                  </div>

                  {section.articles.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {section.articles.map((item) => (
                          <Link
                            key={item.id}
                            href={`/news/${item.slug}`}
                            className="group"
                            onMouseEnter={() => setHoveredCard(item.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                          >
                            <div className="flex h-full transform flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                              <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                  src={
                                    item.featuredImage ||
                                    "/assets/home/news1.png"
                                  }
                                  alt={item.title}
                                  fill
                                  className={`object-cover transition-transform duration-700 ${
                                    hoveredCard === item.id
                                      ? "scale-110"
                                      : "scale-100"
                                  }`}
                                />
                                <div className="absolute left-4 top-4 rounded-full bg-paralympic-blue px-3 py-1 text-sm font-semibold text-white">
                                  {item.category.name}
                                </div>
                                {item.isBreaking && (
                                  <div className="absolute right-4 top-4 animate-pulse rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                    BREAKING
                                  </div>
                                )}
                                <div className="absolute bottom-4 right-4 rounded bg-black/70 px-2 py-1 text-xs text-white">
                                  {item.readTime} min
                                </div>
                              </div>

                              <div className="flex flex-grow flex-col p-6">
                                <span className="mb-2 text-sm text-gray-500">
                                  {formatDate(item.publishedAt)}
                                </span>
                                <h3 className="mb-3 text-xl font-bold text-paralympic-navy transition-colors group-hover:text-paralympic-blue">
                                  {item.title}
                                </h3>
                                <p className="mb-4 flex-grow text-gray-600">
                                  {item.excerpt}
                                </p>

                                <div className="mb-4 flex flex-wrap gap-2">
                                  {item.tags.slice(0, 2).map((tag) => (
                                    <span
                                      key={tag.id}
                                      className="rounded bg-paralympic-gray px-2 py-1 text-xs text-paralympic-navy"
                                    >
                                      {tag.name}
                                    </span>
                                  ))}
                                </div>

                                <div className="flex items-center font-medium text-paralympic-blue">
                                  <span>Read more</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Load More for this section */}
                      {section.hasMore && (
                        <div className="mt-12 text-center">
                          {loadingSection === section.classification.id ? (
                            <div className="flex animate-fade-in items-center justify-center space-x-3">
                              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-paralympic-blue"></div>
                              <span className="animate-pulse font-medium text-paralympic-navy">
                                Loading more articles...
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                loadMoreSectionArticles(
                                  sectionIndex,
                                  section.classification.id,
                                )
                              }
                              className="group transform rounded-full bg-paralympic-blue px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-paralympic-green hover:shadow-lg"
                            >
                              <span className="flex items-center">
                                <span className="mr-2">📰</span>
                                Load More {section.classification.name}
                                <svg
                                  className="ml-2 h-4 w-4 group-hover:animate-bounce"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                  />
                                </svg>
                              </span>
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-lg text-gray-600">
                        No articles in this section yet.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Show message when no sections are available and not in search mode */}
        {!isSearchMode && allSections.length === 0 && !isLoadingInitial && (
          <section className="bg-paralympic-gray/30 py-16">
            <div className="container mx-auto px-4 text-center">
              <div className="mb-4 animate-bounce text-6xl">📰</div>
              <h3 className="mb-4 text-2xl font-bold text-paralympic-navy">
                No news sections available
              </h3>
              <p className="mb-6 text-gray-600">
                News content is being organized. Please check back later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-full bg-paralympic-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-paralympic-green"
              >
                Refresh Page
              </button>
            </div>
          </section>
        )}

        {/* Newsletter Subscription */}
        {false && (
          <section className="relative overflow-hidden bg-gradient-to-r from-paralympic-blue to-paralympic-green py-16">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute left-0 top-0 h-64 w-64 animate-pulse rounded-full bg-white/10 blur-3xl"></div>
              <div
                className="absolute bottom-0 right-0 h-80 w-80 animate-pulse rounded-full bg-paralympic-yellow/20 blur-3xl"
                style={{ animationDelay: "1s" }}
              ></div>
              {/* Floating icons */}
              {["📧", "📰", "🏃", "🏆", "🌟"].map((icon, index) => (
                <div
                  key={index}
                  className="absolute animate-bounce text-2xl opacity-20"
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${20 + (index % 2) * 40}%`,
                    animationDelay: `${index * 0.5}s`,
                    animationDuration: `${2 + index * 0.5}s`,
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
              {/* Animated title */}
              <h2 className="mb-4 transform animate-fade-in text-3xl font-bold text-white transition-transform duration-300 hover:scale-105 md:text-4xl">
                <span className="mr-2 animate-pulse">📬</span>
                Never Miss a Story
              </h2>
              <p
                className="mx-auto mb-8 max-w-2xl animate-fade-in text-lg text-paralympic-gray"
                style={{ animationDelay: "0.3s" }}
              >
                Subscribe to our newsletter and get the latest Paralympic news
                delivered directly to your inbox.
              </p>

              {/* Enhanced subscription form */}
              <div
                className="mx-auto max-w-md transform animate-fade-in transition-all duration-300 hover:scale-105"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="group flex">
                  <div className="relative flex-1">
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-l-full bg-gradient-to-r from-paralympic-yellow to-white opacity-20 blur transition-opacity duration-300 group-hover:opacity-40"></div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="relative w-full rounded-l-full px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-paralympic-yellow"
                    />
                    {/* Email icon */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 transition-colors duration-300 group-hover:text-paralympic-blue">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                  </div>
                  <button className="transform rounded-r-full bg-paralympic-yellow px-6 py-3 font-bold text-paralympic-navy transition-all duration-300 hover:scale-105 hover:bg-white group-hover:shadow-lg">
                    <span className="flex items-center">
                      Subscribe
                      <svg
                        className="ml-2 h-4 w-4 group-hover:animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Subscription benefits */}
                <div
                  className="mt-4 animate-fade-in text-sm text-white/80"
                  style={{ animationDelay: "0.9s" }}
                >
                  <div className="flex items-center justify-center space-x-4 text-xs">
                    <span className="flex items-center">
                      <span className="mr-1 animate-pulse">✅</span>
                      Daily Updates
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1 animate-pulse">✅</span>
                      Exclusive Content
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Reuse NewsSection Component from Homepage */}
        {/* <NewsSection /> */}
      </div>

      <Footer />
    </>
  );
}