'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_EVENTS } from '~/lib/data';

// Define event data type
interface Event {
  id: number;
  title: string;
  type: 'upcoming' | 'ongoing' | 'past';
  location: string;
  dateStart: string;
  dateEnd: string;
  description: string;
  imageUrl: string;
  categories: string[];
  slug: string;
}

// Helper function to format date range
function formatDateRange(startDate: string, endDate: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const start = new Date(startDate).toLocaleDateString('en-US', options);
  const end = new Date(endDate).toLocaleDateString('en-US', options);
  return `${start} - ${end}`;
}

// Calculate days remaining until event
function getDaysRemaining(dateStart: string): number {
  const today = new Date();
  const eventDate = new Date(dateStart);
  const timeDiff = eventDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Get status badge based on event type
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

export default function EventsSection() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="inline-block bg-paralympic-red px-4 py-1 rounded-full mb-4">
              <span className="text-white font-semibold">Mark Your Calendar</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-paralympic-navy mb-4">
              Featured Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Write subtitle here. Highlight the most important upcoming events, competitions, and activities in the Paralympic community.
            </p>
          </div>
          
          <Link 
            href="/events"
            className="group mt-6 md:mt-0 inline-flex items-center font-bold text-paralympic-blue hover:text-paralympic-green transition-colors"
          >
            <span>View All Events</span>
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
        
        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {FEATURED_EVENTS.map((event) => {
            const statusBadge = getStatusBadge(event.type);
            const daysRemaining = event.type === 'upcoming' ? getDaysRemaining(event.dateStart) : 0;
            
            return (
              <Link 
                key={event.id}
                href={`/events/${event.slug}`}
                className="group"
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hoveredEvent === event.id ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Status badge */}
                    <div className={`absolute top-4 left-4 ${statusBadge.className} text-sm font-semibold px-3 py-1 rounded-full`}>
                      {statusBadge.text}
                    </div>
                    
                    {/* Days remaining badge for upcoming events */}
                    {event.type === 'upcoming' && (
                      <div className="absolute bottom-4 right-4 bg-white text-paralympic-navy text-sm font-bold px-3 py-1 rounded-full">
                        {daysRemaining > 0 ? `${daysRemaining} days left` : 'Starts tomorrow'}
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
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {event.description}
                    </p>
                    
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {event.categories.map((category, index) => (
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
          })}
        </div>
      </div>
    </section>
  );
}