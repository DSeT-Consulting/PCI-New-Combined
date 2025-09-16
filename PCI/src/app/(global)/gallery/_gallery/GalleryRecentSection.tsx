// src/app/gallery/_gallery/GalleryRecentSection.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type GalleryEvent } from '~/lib/types';
import { formatDate } from '~/lib/utils';

interface GalleryRecentSectionProps {
  events: GalleryEvent[];
}

const GalleryRecentSection: React.FC<GalleryRecentSectionProps> = ({ events }) => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  // Get recent images from all events
  const recentImages = events.flatMap(event => 
    event.featured.map(image => ({
      ...image,
      eventTitle: event.title,
      eventSlug: event.slug,
      eventDate: event.date,
      eventLocation: event.location
    }))
  ).slice(0, 12);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-paralympic-green to-paralympic-blue px-6 py-2 rounded-full mb-6">
            <span className="text-white font-bold">🆕 RECENT ADDITIONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-paralympic-navy mb-6">
            Latest Captures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our newest additions to the gallery. Fresh perspectives from recent Paralympic events and moments.
          </p>
        </div>

        {/* Recent Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {recentImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 bg-paralympic-gray">
                <Image
                  src={image.imageUrl}
                  alt={image.alt}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    hoveredImage === image.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover overlay content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-white font-bold text-sm mb-1 line-clamp-1">
                    {image.eventTitle}
                  </h4>
                  <p className="text-white/80 text-xs mb-2">
                    {image.eventLocation}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs">
                      {formatDate(image.eventDate)}
                    </span>
                    <Link
                      href={`/gallery/${image.eventSlug}`}
                      className="text-paralympic-yellow hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Badge for new items */}
                <div className="absolute top-3 right-3 bg-paralympic-red text-white px-2 py-1 rounded-full text-xs font-bold">
                  NEW
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Collections Timeline */}
        <div className="bg-paralympic-gray rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-paralympic-navy mb-8 text-center">
            Recent Collection Updates
          </h3>
          <div className="space-y-6">
            {events.slice(0, 4).map((event, index) => (
              <div key={event.id} className="flex items-center space-x-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-paralympic-navy mb-1">{event.title}</h4>
                  <p className="text-gray-600 text-sm mb-1">{event.location}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.imageCount} photos
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {formatDate(event.date)}
                  </span>
                  <Link
                    href={`/gallery/${event.slug}`}
                    className="text-paralympic-blue hover:text-paralympic-green transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        {/* <div className="mt-16 bg-gradient-to-r from-paralympic-blue to-paralympic-green rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-paralympic-gray mb-6">
            Get notified when new image collections are added to our gallery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-paralympic-navy focus:outline-none focus:ring-2 focus:ring-paralympic-yellow"
            />
            <button className="bg-paralympic-yellow text-paralympic-navy px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors">
              Subscribe
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default GalleryRecentSection;