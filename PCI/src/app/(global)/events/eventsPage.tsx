'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import EventsHeroSection from './_events/EventsHeroSection';
import EventsFilterSection from './_events/EventsFilterSection';
import EventsGridSection from './_events/EventsGridSection';
import FeaturedEventsBanner from './_events/FeaturedEventsBanner';
import EventsCalendarSection from './_events/EventsCalendarSection';
import EventsCTASection from './_events/EventsCTASection';
import { type Event } from '~/lib/types';
import { FEATURED_EVENTS, UPCOMING_EVENTS } from '~/lib/data';

export interface EventsPageFilters {
  searchTerm: string;
  eventType: string;
  location: string;
  dateRange: string;
  category: string;
  sortBy: string;
}

const EventsPage: React.FC = () => {
  const [filters, setFilters] = useState<EventsPageFilters>({
    searchTerm: '',
    eventType: 'all',
    location: 'all',
    dateRange: 'all',
    category: 'all',
    sortBy: 'date-asc'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Combine all events data
  const allEvents: Event[] = [
    ...FEATURED_EVENTS,
    // Add more events from different sources as needed
  ];

  const handleFilterChange = (newFilters: Partial<EventsPageFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <EventsHeroSection />
        
        {/* Featured Events Banner */}
        <FeaturedEventsBanner />
        
        {/* Filter Section */}
        <EventsFilterSection 
          filters={filters}
          onFilterChange={handleFilterChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        
        {/* Events Grid/List */}
        <EventsGridSection 
          events={allEvents}
          filters={filters}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          viewMode={viewMode}
        />
        
        {/* Calendar Section */}
        <EventsCalendarSection />
        
        {/* CTA Section */}
        <EventsCTASection />
      </main>
      
      <Footer />
    </>
  );
};

export default EventsPage;