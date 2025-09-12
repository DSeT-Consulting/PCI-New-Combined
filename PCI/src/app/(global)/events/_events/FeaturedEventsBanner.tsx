'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_EVENTS } from '~/lib/data';
import { formatDateRange, getDaysRemaining } from '~/lib/utils';

const FeaturedEventsBanner: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % FEATURED_EVENTS.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentEvent = FEATURED_EVENTS[activeEvent];
  const daysRemaining = currentEvent?.type === 'upcoming' ? getDaysRemaining(currentEvent.dateStart) : 0;

  if (!currentEvent) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-paralympic-blue via-paralympic-navy to-paralympic-green relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-paralympic-yellow/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-paralympic-red/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <svg className="w-5 h-5 text-paralympic-yellow mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-bold">FEATURED EVENT</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don&apos;t Miss Out
            </h2>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-paralympic-red px-3 py-1 rounded-full">
                  <span className="text-white font-semibold text-sm">
                    {currentEvent.type === 'upcoming' ? 'UPCOMING' : 
                     currentEvent.type === 'ongoing' ? 'LIVE NOW' : 'PAST EVENT'}
                  </span>
                </div>
                {currentEvent.type === 'upcoming' && daysRemaining > 0 && (
                  <div className="text-paralympic-yellow font-bold">
                    {daysRemaining} days left
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-3">{currentEvent.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-white/90">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDateRange(currentEvent.dateStart, currentEvent.dateEnd)}
                </div>
                <div className="flex items-center text-white/90">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {currentEvent.location}
                </div>
              </div>

              <p className="text-white/80 mb-6">{currentEvent.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {currentEvent.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/events/${currentEvent.slug}`}
                  className="bg-paralympic-yellow text-paralympic-navy px-6 py-3 rounded-full font-bold hover:bg-white transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Learn More
                </Link>
                {currentEvent.type === 'upcoming' && (
                  <button className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-paralympic-navy transition-all duration-300 transform hover:scale-105">
                    Set Reminder
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Event Image */}
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-1000">
              <Image
                src={currentEvent.imageUrl}
                alt={currentEvent.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 h-32 w-32 bg-paralympic-yellow/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 h-40 w-40 bg-paralympic-red/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Event navigation dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {FEATURED_EVENTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveEvent(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === activeEvent
                      ? 'bg-paralympic-yellow w-8'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to event ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-paralympic-yellow mb-2">
              {FEATURED_EVENTS.filter(e => e.type === 'upcoming').length}
            </div>
            <div className="text-white/80">Upcoming Events</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-paralympic-green mb-2">22</div>
            <div className="text-white/80">Paralympic Sports</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-paralympic-red mb-2">180+</div>
            <div className="text-white/80">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">4,400+</div>
            <div className="text-white/80">Athletes</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsBanner;