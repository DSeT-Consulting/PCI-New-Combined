// src/app/gallery/_gallery/GalleryFoldersSection.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type GalleryEvent } from '~/lib/types';
import { formatDate } from '~/lib/utils';

interface GalleryFoldersSectionProps {
  events: GalleryEvent[];
  filters: {
    searchTerm: string;
    category: string;
    year: string;
    sortBy: string;
    viewMode: 'grid' | 'masonry';
  };
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ITEMS_PER_PAGE = 12;

const GalleryFoldersSection: React.FC<GalleryFoldersSectionProps> = ({
  events,
  filters,
  currentPage,
  onPageChange
}) => {
  const [hoveredFolder, setHoveredFolder] = useState<number | null>(null);

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    const filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesYear = filters.year === 'all' || 
        new Date(event.date).getFullYear().toString() === filters.year;
      
      // For now, using a simple category filter - you can expand this
      const matchesCategory = filters.category === 'all' || 
        event.title.toLowerCase().includes(filters.category.toLowerCase());

      return matchesSearch && matchesYear && matchesCategory;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'images-desc':
          return b.imageCount - a.imageCount;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [events, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEvents = filteredAndSortedEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const FolderCard: React.FC<{ event: GalleryEvent }> = ({ event }) => (
    <Link
      href={`/gallery/${event.slug}`}
      className="group block"
      onMouseEnter={() => setHoveredFolder(event.id)}
      onMouseLeave={() => setHoveredFolder(null)}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
        {/* Cover Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className={`object-cover transition-transform duration-700 ${
              hoveredFolder === event.id ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Image Count Badge */}
          <div className="absolute top-4 right-4 bg-paralympic-blue/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
            {event.imageCount} photos
          </div>
          
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-paralympic-navy px-3 py-1 rounded-full text-sm font-semibold">
            {new Date(event.date).getFullYear()}
          </div>
          
          {/* Quick Preview Images */}
          <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
            {event.featured.slice(0, 4).map((image, index) => (
              <div
                key={image.id}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 border-white/50 transition-all duration-300 ${
                  hoveredFolder === event.id ? 'scale-110' : 'scale-100'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.alt}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center text-gray-500 mb-2">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>

          <h3 className="text-xl font-bold text-paralympic-navy mb-3 group-hover:text-paralympic-blue transition-colors">
            {event.title}
          </h3>

          <div className="flex items-center text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{event.location}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-paralympic-blue">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">{event.imageCount} Images</span>
            </div>

            <div className="flex items-center text-paralympic-blue font-medium group-hover:text-paralympic-green transition-colors">
              <span className="text-sm">View Gallery</span>
              <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Results Summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-paralympic-navy mb-2">
              Event Collections ({filteredAndSortedEvents.length})
            </h2>
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredAndSortedEvents.length)} of {filteredAndSortedEvents.length} collections
            </p>
          </div>
        </div>

        {/* Events Grid */}
        {currentEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-paralympic-navy mb-2">No collections found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-paralympic-blue text-white px-6 py-3 rounded-lg hover:bg-paralympic-navy transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 mb-12 ${
            filters.viewMode === 'masonry' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}>
            {currentEvents.map(event => (
              <FolderCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between bg-paralympic-gray rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-paralympic-navy bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => onPageChange(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-paralympic-blue text-white'
                          : 'text-paralympic-navy hover:bg-white'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-paralympic-navy bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="text-sm text-paralympic-navy">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryFoldersSection;