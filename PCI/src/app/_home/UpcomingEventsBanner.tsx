// src\app\_home\UpcomingEventsBanner.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate, getDaysRemaining } from '~/lib/utils';
import { UPCOMING_EVENTS } from '~/lib/data';

export default function UpcomingEventsBanner() {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentEventIndex((prev) => (prev + 1) % UPCOMING_EVENTS.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const currentEvent = UPCOMING_EVENTS[currentEventIndex]!;
    const daysRemaining = getDaysRemaining(currentEvent.date);

    return (
        <section className={`py-6 sm:py-8 lg:py-10 bg-gradient-to-r ${currentEvent.color} relative overflow-hidden transition-all duration-1000`}>
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white/10 rounded-full -translate-x-12 -translate-y-12 sm:-translate-x-16 sm:-translate-y-16 lg:-translate-x-20 lg:-translate-y-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white/10 rounded-full translate-x-10 translate-y-10 sm:translate-x-12 sm:translate-y-12 lg:translate-x-16 lg:translate-y-16 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:justify-between space-y-6 lg:space-y-0">
                    {/* Event info */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start mb-3 sm:mb-2 space-y-2 sm:space-y-0 sm:space-x-3">
                            <span className="bg-white/20 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full">
                                {currentEvent.type}
                            </span>
                            <span className="text-white/80 text-sm sm:text-base">
                                {formatDate(currentEvent.date)}
                            </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 lg:mb-4 leading-tight">
                            {currentEvent.title}
                        </h2>

                        <div className="flex items-center justify-center lg:justify-start text-white/90 text-sm sm:text-base">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-center lg:text-left">{currentEvent.location}</span>
                        </div>
                    </div>

                    {/* Countdown and Actions */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                                {daysRemaining > 0 ? daysRemaining : '0'}
                            </div>
                            <div className="text-white/80 text-sm sm:text-base">
                                Days Left
                            </div>
                        </div>

                        <div className="hidden sm:block h-8 sm:h-10 lg:h-12 w-px bg-white/30"></div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                            <Link
                                href={currentEvent.link ?? '/events'}
                                className="bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-2 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors transform hover:scale-105 text-center whitespace-nowrap"
                            >
                                Learn More
                            </Link>

                            {/* <Link
                                href="/tickets"
                                className="border-2 border-white text-white px-4 sm:px-6 py-2.5 sm:py-2 rounded-full font-semibold text-sm sm:text-base hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 text-center whitespace-nowrap"
                            >
                                Get Tickets
                            </Link> */}
                        </div>
                    </div>
                </div>

                {/* Event indicators */}
                <div className="flex justify-center mt-4 sm:mt-6 space-x-2 sm:space-x-3">
                    {UPCOMING_EVENTS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentEventIndex(index)}
                            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 touch-manipulation ${index === currentEventIndex
                                ? 'bg-white w-6 sm:w-8 lg:w-10'
                                : 'bg-white/50 hover:bg-white/80 active:bg-white w-2 sm:w-2.5'
                                }`}
                            aria-label={`Go to event ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}