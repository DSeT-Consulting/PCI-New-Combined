'use client';

import React, { useState, useEffect } from 'react';
import { UPCOMING_EVENTS } from '~/lib/data';

const EventsHeroSection: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % UPCOMING_EVENTS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentEvent = UPCOMING_EVENTS[activeEvent];

  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-paralympic-green overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-paralympic-yellow/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-paralympic-red/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-bounce-slow"></div>
        
        {/* Floating event icons */}
        <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce-slow" style={{ animationDelay: '1s' }}>🏃‍♂️</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-bounce-slow" style={{ animationDelay: '3s' }}>🏊‍♀️</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl animate-bounce-slow" style={{ animationDelay: '2s' }}>⚽</div>
        <div className="absolute top-1/2 right-1/3 text-2xl animate-bounce-slow" style={{ animationDelay: '4s' }}>🏹</div>
        
        {/* Dynamic grid pattern */}
        {/* <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="heroEventsGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#heroEventsGrid)" />
          </svg>
        </div> */}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center min-h-[80vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-gradient-to-r from-paralympic-yellow/20 to-paralympic-red/20 backdrop-blur-sm px-8 py-3 rounded-full mb-8">
              <span className="text-paralympic-yellow font-bold text-lg">🎯 PARALYMPIC EVENTS</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Witness
              <span className="block bg-gradient-to-r from-paralympic-yellow via-paralympic-red to-paralympic-green bg-clip-text text-transparent">
                Greatness
              </span>
              <span className="block text-white">Unfold</span>
            </h1>

            <p className="text-xl md:text-2xl text-paralympic-gray max-w-2xl mb-12 leading-relaxed">
              From local championships to Paralympic Games - discover upcoming events where champions rise, 
              records fall, and dreams become reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-paralympic-yellow text-paralympic-navy px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 transform hover:scale-105">
                Browse All Events
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-paralympic-navy transition-all duration-300 transform hover:scale-105">
                Get Notifications
              </button>
            </div>
          </div>

          {/* Event Spotlight */}
          <div className="relative">
            {currentEvent && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-paralympic-red px-4 py-2 rounded-full">
                    <span className="text-white font-bold text-sm">FEATURED EVENT</span>
                  </div>
                  <div className="text-paralympic-yellow text-sm font-semibold">
                    {new Date(currentEvent.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {currentEvent.title}
                </h3>

                <div className="flex items-center text-paralympic-gray mb-6">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{currentEvent.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${currentEvent.color} text-white`}>
                    {currentEvent.type}
                  </span>
                  <button className="text-paralympic-yellow hover:text-white font-medium transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            )}

            {/* Event Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {UPCOMING_EVENTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveEvent(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeEvent
                      ? 'bg-paralympic-yellow w-8'
                      : 'bg-white/50 w-2 hover:bg-white/80'
                  }`}
                  aria-label={`Go to event ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default EventsHeroSection;