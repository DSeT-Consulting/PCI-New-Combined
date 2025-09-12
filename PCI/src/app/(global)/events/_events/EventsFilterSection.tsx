'use client';

import React from 'react';
import { EventsPageFilters } from '../eventsPage'

interface EventsFilterSectionProps {
  filters: EventsPageFilters;
  onFilterChange: (filters: Partial<EventsPageFilters>) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const EVENT_TYPES = [
  { value: 'all', label: 'All Events' },
  { value: 'paralympic-games', label: 'Paralympic Games' },
  { value: 'world-championships', label: 'World Championships' },
  { value: 'grand-prix', label: 'Grand Prix' },
  { value: 'national', label: 'National Events' },
  { value: 'regional', label: 'Regional Events' },
];

const LOCATIONS = [
  { value: 'all', label: 'All Locations' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'north-america', label: 'North America' },
  { value: 'south-america', label: 'South America' },
  { value: 'africa', label: 'Africa' },
  { value: 'oceania', label: 'Oceania' },
];

const DATE_RANGES = [
  { value: 'all', label: 'All Dates' },
  { value: 'this-month', label: 'This Month' },
  { value: 'next-month', label: 'Next Month' },
  { value: 'next-3-months', label: 'Next 3 Months' },
  { value: 'next-6-months', label: 'Next 6 Months' },
  { value: 'this-year', label: 'This Year' },
];

const CATEGORIES = [
  { value: 'all', label: 'All Sports' },
  { value: 'athletics', label: 'Athletics' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'cycling', label: 'Cycling' },
  { value: 'shooting', label: 'Shooting' },
  { value: 'archery', label: 'Archery' },
  { value: 'table-tennis', label: 'Table Tennis' },
  { value: 'badminton', label: 'Badminton' },
  { value: 'powerlifting', label: 'Powerlifting' },
  { value: 'wheelchair-basketball', label: 'Wheelchair Basketball' },
];

const SORT_OPTIONS = [
  { value: 'date-asc', label: 'Date (Earliest First)' },
  { value: 'date-desc', label: 'Date (Latest First)' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'location-asc', label: 'Location (A-Z)' },
];

const EventsFilterSection: React.FC<EventsFilterSectionProps> = ({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
}) => {
  const clearAllFilters = () => {
    onFilterChange({
      searchTerm: '',
      eventType: 'all',
      location: 'all',
      dateRange: 'all',
      category: 'all',
      sortBy: 'date-asc'
    });
  };

  const hasActiveFilters = filters.searchTerm || 
    filters.eventType !== 'all' || 
    filters.location !== 'all' || 
    filters.dateRange !== 'all' || 
    filters.category !== 'all';

  return (
    <section className="py-8 bg-white border-b border-paralympic-gray/30">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <svg className="absolute left-4 top-4 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search events by name, location, or sport..."
              value={filters.searchTerm}
              onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paralympic-blue focus:border-transparent transition-all text-lg"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <select
              value={filters.eventType}
              onChange={(e) => onFilterChange({ eventType: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paralympic-blue focus:border-transparent transition-all"
            >
              {EVENT_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange({ location: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paralympic-blue focus:border-transparent transition-all"
            >
              {LOCATIONS.map(location => (
                <option key={location.value} value={location.value}>{location.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange({ dateRange: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paralympic-blue focus:border-transparent transition-all"
            >
              {DATE_RANGES.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paralympic-blue focus:border-transparent transition-all"
            >
              {CATEGORIES.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paralympic-blue focus:border-transparent transition-all"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center text-paralympic-blue hover:text-paralympic-navy font-medium transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All Filters
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">View:</span>
            <div className="flex bg-paralympic-gray rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white text-paralympic-blue shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white text-paralympic-blue shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsFilterSection;