'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '~/lib/types';
import { EventsPageFilters } from '../eventsPage';
import { formatDateRange, getDaysRemaining } from '~/lib/utils';

interface EventsGridSectionProps {
  events: Event[];
  filters: EventsPageFilters;
  currentPage: number;
  onPageChange: (page: number) => void;
  viewMode: 'grid' | 'list';
}

const EVENTS_PER_PAGE = 12;

// Helper function to get status badge
function getStatusBadge(type: 'upcoming' | 'ongoing' | 'past'): { text: string; className: string } {
  switch (type) {
    case 'upcoming':
      return {
        text: 'Upcoming',
        className: 'bg-paralympic-green text-white'
      };
    case 'ongoing':
      return {
        text: 'Happening Now',
        className: 'bg-paralympic-red text-white animate-pulse'
      };
    case 'past':
      return {
        text: 'Past Event',
        className: 'bg-gray-500 text-white'
      };
    default:
      return {
        text: 'Event',
        className: 'bg-paralympic-blue text-white'
      };
  }
}

const EventCard: React.FC<{ event: Event; isHovered: boolean; onHover: (id: number | null) => void }> = ({
  event,
  isHovered,
  onHover
}) => {
  const statusBadge = getStatusBadge(event.type);
  const daysRemaining = event.type === 'upcoming' ? getDaysRemaining(event.dateStart) : 0;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block"
      onMouseEnter={() => onHover(event.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'
              }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Status badge */}
          <div className={`absolute top-4 left-4 ${statusBadge.className} text-sm font-semibold px-3 py-1 rounded-full`}>
            {statusBadge.text}
          </div>

          {/* Days remaining badge for upcoming events */}
          {event.type === 'upcoming' && daysRemaining > 0 && (
            <div className="absolute bottom-4 right-4 bg-white text-paralympic-navy text-sm font-bold px-3 py-1 rounded-full">
              {daysRemaining > 1 ? `${daysRemaining} days left` : 'Starts tomorrow'}
            </div>
          )}

          {/* Location */}
          <div className="absolute bottom-4 left-4 flex items-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{event.location}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Date range */}
          <div className="flex items-center text-gray-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{formatDateRange(event.dateStart, event.dateEnd)}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-paralympic-navy mb-3 group-hover:text-paralympic-blue transition-colors">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
            {event.description}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {event.categories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="text-xs bg-paralympic-gray px-2 py-1 rounded-full text-paralympic-navy"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

const EventListItem: React.FC<{ event: Event }> = ({ event }) => {
  const statusBadge = getStatusBadge(event.type);
  const daysRemaining = event.type === 'upcoming' ? getDaysRemaining(event.dateStart) : 0;

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-paralympic-blue/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
          {/* Image */}
          <div className="relative h-32 md:h-24 rounded-lg overflow-hidden">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className={`absolute top-2 left-2 ${statusBadge.className} text-xs font-semibold px-2 py-1 rounded-full`}>
              {statusBadge.text}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-paralympic-navy mb-2 group-hover:text-paralympic-blue transition-colors">
              {event.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {event.categories.slice(0, 2).map((category, index) => (
                <span
                  key={index}
                  className="text-xs bg-paralympic-gray px-2 py-1 rounded-full text-paralympic-navy"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Event Details */}
          <div className="flex flex-col justify-center space-y-2">
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDateRange(event.dateStart, event.dateEnd)}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {event.location}
            </div>
            {event.type === 'upcoming' && daysRemaining > 0 && (
              <div className="text-sm font-semibold text-paralympic-green">
                {daysRemaining > 1 ? `${daysRemaining} days left` : 'Starts tomorrow'}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const EventsGridSection: React.FC<EventsGridSectionProps> = ({
  events,
  filters,
  currentPage,
  onPageChange,
  viewMode,
}) => {
  const [hoveredEvent, setHoveredEvent] = React.useState<number | null>(null);

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    const filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesType = filters.eventType === 'all' || event.type === filters.eventType;
      const matchesCategory = filters.category === 'all' || event.categories.some(cat =>
        cat.toLowerCase().includes(filters.category.toLowerCase())
      );

      // Add more filter logic as needed
      return matchesSearch && matchesType && matchesCategory;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-desc':
          return new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime();
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'location-asc':
          return a.location.localeCompare(b.location);
        case 'date-asc':
        default:
          return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime();
      }
    });

    return filtered;
  }, [events, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedEvents.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const currentEvents = filteredAndSortedEvents.slice(startIndex, startIndex + EVENTS_PER_PAGE);

  const getPaginationPages = () => {
    const pages = [];
    const showPages = 5;
    const half = Math.floor(showPages / 2);

    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + showPages - 1);

    if (end - start < showPages - 1) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <section className="py-12 bg-paralympic-gray/30">
      <div className="container mx-auto px-4">
        {/* Results Summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-paralympic-navy mb-2">
              Events ({filteredAndSortedEvents.length})
            </h2>
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + EVENTS_PER_PAGE, filteredAndSortedEvents.length)} of {filteredAndSortedEvents.length} events
            </p>
          </div>
        </div>

        {/* Events Display */}
        {currentEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-paralympic-blue text-white px-6 py-3 rounded-lg hover:bg-paralympic-navy transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {currentEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                isHovered={hoveredEvent === event.id}
                onHover={setHoveredEvent}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4 mb-12">
            {currentEvents.map(event => (
              <EventListItem key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {getPaginationPages().map(page => (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                        ? 'bg-paralympic-blue text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsGridSection;