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
        <section className={`py-8 bg-gradient-to-r ${currentEvent.color} relative overflow-hidden transition-all duration-1000`}>
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Event info */}
                    <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
                        <div className="flex items-center justify-center md:justify-start mb-2">
                            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mr-3">
                                {currentEvent.type}
                            </span>
                            <span className="text-white/80 text-sm">
                                {formatDate(currentEvent.date)}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {currentEvent.title}
                        </h2>

                        <div className="flex items-center justify-center md:justify-start text-white/90">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{currentEvent.location}</span>
                        </div>
                    </div>

                    {/* Countdown */}
                    <div className="flex items-center space-x-6">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white">
                                {daysRemaining > 0 ? daysRemaining : '0'}
                            </div>
                            <div className="text-white/80 text-sm">
                                Days Left
                            </div>
                        </div>

                        <div className="h-12 w-px bg-white/30"></div>

                        {/* Action buttons */}
                        <div className="flex space-x-3">
                            <Link
                                href={currentEvent.link ?? '/events'}
                                className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
                            >
                                Learn More
                            </Link>

                            {/* <Link
                                href="/tickets"
                                className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
                            >
                                Get Tickets
                            </Link> */}
                        </div>
                    </div>
                </div>

                {/* Event indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                    {UPCOMING_EVENTS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentEventIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentEventIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Go to event ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}