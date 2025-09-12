// src/app/gallery/_gallery/GalleryFeaturedSection.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryEvent } from '~/lib/types';
import { formatDate } from '~/lib/utils';

interface GalleryFeaturedSectionProps {
    events: GalleryEvent[];
}

const GalleryFeaturedSection: React.FC<GalleryFeaturedSectionProps> = ({ events }) => {
    const [activeCollection, setActiveCollection] = useState(0);

    // Use first few events as featured if no featured flag is available
    const featuredEvents = events.slice(0, 3);

    if (featuredEvents.length === 0) {
        return null;
    }

    const currentEvent = featuredEvents[activeCollection];

    if (!currentEvent) {
        return null;
    }

    return (
        <section className="py-20 bg-gradient-to-br from-paralympic-blue via-paralympic-navy to-paralympic-green relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-paralympic-yellow/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-paralympic-red/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-bounce-slow"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                        <span className="text-paralympic-yellow font-bold">⭐ FEATURED COLLECTIONS</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Spotlight Stories
                    </h2>
                    <p className="text-xl text-paralympic-gray max-w-3xl mx-auto">
                        Discover our most compelling visual narratives from iconic Paralympic moments that have shaped the movement.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Main Featured Collection */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-500">
                            <div className="relative h-96 rounded-xl overflow-hidden mb-6">
                                <Image
                                    src={currentEvent.coverImage}
                                    alt={currentEvent.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Image count badge */}
                                <div className="absolute top-4 right-4 bg-paralympic-blue/90 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold">
                                    {currentEvent.imageCount} Photos
                                </div>

                                {/* Sample images overlay */}
                                <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                                    {currentEvent.featured.slice(0, 5).map((image, index) => (
                                        <div
                                            key={image.id}
                                            className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/70 flex-shrink-0"
                                        >
                                            <Image
                                                src={image.imageUrl}
                                                alt={image.alt}
                                                width={64}
                                                height={64}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    ))}
                                    {currentEvent.imageCount > 5 && (
                                        <div className="w-16 h-16 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/70 flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">+{currentEvent.imageCount - 5}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center text-paralympic-yellow">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-semibold">{formatDate(currentEvent.date)}</span>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-3">
                                    {currentEvent.title}
                                </h3>

                                <div className="flex items-center text-white/90 mb-4">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{currentEvent.location}</span>
                                </div>

                                <p className="text-white/80 text-lg mb-6">
                                    {currentEvent.description}
                                </p>

                                <Link
                                    href={`/gallery/${currentEvent.slug}`}
                                    className="inline-block bg-paralympic-yellow text-paralympic-navy px-8 py-3 rounded-full font-bold hover:bg-white transition-all duration-300 transform hover:scale-105"
                                >
                                    Explore Collection
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Collection Selector */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                            <h4 className="text-xl font-bold text-white mb-6">Featured Collections</h4>
                            <div className="space-y-4">
                                {featuredEvents.map((event, index) => (
                                    <button
                                        key={event.id}
                                        onClick={() => setActiveCollection(index)}
                                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${index === activeCollection
                                                ? 'bg-white/20 border border-white/30'
                                                : 'bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={event.coverImage}
                                                    alt={event.title}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="font-semibold text-white text-sm mb-1 line-clamp-1">
                                                    {event.title}
                                                </h5>
                                                <p className="text-white/70 text-xs">
                                                    {event.imageCount} photos
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/20">
                                <Link
                                    href="/gallery"
                                    className="block w-full text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                                >
                                    View All Collections
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Collection indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                    {featuredEvents.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCollection(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === activeCollection
                                    ? 'bg-paralympic-yellow w-8'
                                    : 'bg-white/50 w-2 hover:bg-white/80'
                                }`}
                            aria-label={`Go to collection ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GalleryFeaturedSection;