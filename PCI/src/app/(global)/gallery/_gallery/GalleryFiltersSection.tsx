// src/app/gallery/_gallery/GalleryFiltersSection.tsx
'use client';

import React from 'react';

interface GalleryFiltersSectionProps {
  filters: {
    searchTerm: string;
    category: string;
    year: string;
    sortBy: string;
    viewMode: 'grid' | 'masonry';
  };
  onFilterChange: (filters: any) => void;
  totalResults: number;
}

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'paralympic-games', label: 'Paralympic Games' },
  { value: 'world-championships', label: 'World Championships' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'athletics', label: 'Athletics' },
  { value: 'cycling', label: 'Cycling' },
  { value: 'wheelchair-basketball', label: 'Wheelchair Basketball' },
  { value: 'ceremony', label: 'Ceremonies' },
  { value: 'behind-scenes', label: 'Behind the Scenes' },
];

const YEARS = [
  { value: 'all', label: 'All Years' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
];

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'images-desc', label: 'Most Images' },
];

const GalleryFiltersSection: React.FC<GalleryFiltersSectionProps> = ({
  filters,
  onFilterChange,
  totalResults
}) => {
  const clearAllFilters = () => {
    onFilterChange({
      searchTerm: '',
      category: 'all',
      year: 'all',
      sortBy: 'date-desc',
      viewMode: 'grid'
    });
  };

  const hasActiveFilters = filters.searchTerm || 
    filters.category !== 'all' || 
    filters.year !== 'all' || 
    filters.sortBy !== 'date-desc';

  return (
    <section className="py-8 bg-paralympic-gray/30 border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <svg className="absolute left-4 top-4 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search collections by name, location, or event..."
              value={filters.searchTerm}
              onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paralympic-blue focus:border-transparent transition-all text-lg bg-white"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-paralympic-navy mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paralympic-blue focus:border-transparent transition-all bg-white"
            >
              {CATEGORIES.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-paralympic-navy mb-2">Year</label>
            <select
              value={filters.year}
              onChange={(e) => onFilterChange({ year: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paralympic-blue focus:border-transparent transition-all bg-white"
            >
              {YEARS.map(year => (
                <option key={year.value} value={year.value}>{year.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-paralympic-navy mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paralympic-blue focus:border-transparent transition-all bg-white"
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
            <div className="text-sm text-paralympic-navy">
              <span className="font-medium">{totalResults}</span> collections found
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center text-paralympic-blue hover:text-paralympic-navy font-medium transition-colors text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All Filters
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-paralympic-navy">View:</span>
            <div className="flex bg-white rounded-lg p-1 border border-gray-300">
              <button
                onClick={() => onFilterChange({ viewMode: 'grid' })}
                className={`p-2 rounded-md transition-all ${
                  filters.viewMode === 'grid' 
                    ? 'bg-paralympic-blue text-white shadow-sm' 
                    : 'text-gray-500 hover:text-paralympic-navy'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => onFilterChange({ viewMode: 'masonry' })}
                className={`p-2 rounded-md transition-all ${
                  filters.viewMode === 'masonry' 
                    ? 'bg-paralympic-blue text-white shadow-sm' 
                    : 'text-gray-500 hover:text-paralympic-navy'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.searchTerm && (
              <div className="inline-flex items-center bg-paralympic-blue text-white px-3 py-1 rounded-full text-sm">
                Search: &quot;{filters.searchTerm}&quot;
                <button
                  onClick={() => onFilterChange({ searchTerm: '' })}
                  className="ml-2 hover:text-paralympic-yellow"
                >
                  ×
                </button>
              </div>
            )}
            {filters.category !== 'all' && (
              <div className="inline-flex items-center bg-paralympic-green text-white px-3 py-1 rounded-full text-sm">
                Category: {CATEGORIES.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => onFilterChange({ category: 'all' })}
                  className="ml-2 hover:text-paralympic-yellow"
                >
                  ×
                </button>
              </div>
            )}
            {filters.year !== 'all' && (
              <div className="inline-flex items-center bg-paralympic-red text-white px-3 py-1 rounded-full text-sm">
                Year: {filters.year}
                <button
                  onClick={() => onFilterChange({ year: 'all' })}
                  className="ml-2 hover:text-paralympic-yellow"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryFiltersSection;