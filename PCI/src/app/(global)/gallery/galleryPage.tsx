// src/app/gallery/galleryPage.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import GalleryHeroSection from './_gallery/GalleryHeroSection';
import GalleryStatsSection from './_gallery/GalleryStatsSection';
import GalleryFoldersSection from './_gallery/GalleryFoldersSection';
import GalleryFiltersSection from './_gallery/GalleryFiltersSection';
import GalleryFeaturedSection from './_gallery/GalleryFeaturedSection';
import GalleryRecentSection from './_gallery/GalleryRecentSection';
import GalleryCTASection from './_gallery/GalleryCTASection';
import { GALLERY_EVENTS } from '~/lib/data';

export interface GalleryFilters {
  searchTerm: string;
  category: string;
  year: string;
  sortBy: string;
  viewMode: 'grid' | 'masonry';
}

const GalleryPage: React.FC = () => {
  const [filters, setFilters] = useState<GalleryFilters>({
    searchTerm: '',
    category: 'all',
    year: 'all',
    sortBy: 'date-desc',
    viewMode: 'grid'
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (newFilters: Partial<GalleryFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate statistics
  const totalImages = GALLERY_EVENTS.reduce((sum, event) => sum + event.imageCount, 0);
  const totalEvents = GALLERY_EVENTS.length;
  const featuredEvents = GALLERY_EVENTS.filter(event => event.featured || false);
  const recentEvents = GALLERY_EVENTS.slice(0, 6);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <GalleryHeroSection />
        
        {/* Stats Section */}
        <GalleryStatsSection 
          totalImages={totalImages}
          totalEvents={totalEvents}
          years={Array.from(new Set(GALLERY_EVENTS.map(e => new Date(e.date).getFullYear()))).length}
        />
        
        {/* Featured Collections */}
        <GalleryFeaturedSection events={featuredEvents} />
        
        {/* Filters Section */}
        <GalleryFiltersSection 
          filters={filters}
          onFilterChange={handleFilterChange}
          totalResults={GALLERY_EVENTS.length}
        />
        
        {/* Event Folders Grid */}
        <GalleryFoldersSection 
          events={GALLERY_EVENTS}
          filters={filters}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        
        {/* Recent Additions */}
        <GalleryRecentSection events={recentEvents} />
        
        {/* CTA Section */}
        {/* <GalleryCTASection /> */}
      </main>
      
      <Footer />
    </>
  );
};

export default GalleryPage;