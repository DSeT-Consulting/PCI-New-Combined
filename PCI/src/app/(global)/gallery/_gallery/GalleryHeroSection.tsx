// src/app/gallery/_gallery/GalleryHeroSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GALLERY_EVENTS } from '~/lib/data';

const GalleryHeroSection: React.FC = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get featured images from gallery events
  const featuredImages = GALLERY_EVENTS.flatMap(event => 
    event.featured.slice(0, 1)
  ).slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % featuredImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality will be implemented later
    console.log('Searching for:', searchTerm);
  };

  return (
    <section className="relative min-h-[85vh] bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-paralympic-green overflow-hidden">
      {/* Background Images Slideshow */}
      <div className="absolute inset-0">
        {featuredImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeImage ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <Image
              src={image.imageUrl}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-paralympic-navy/80 via-paralympic-blue/60 to-paralympic-green/80" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-paralympic-yellow/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-paralympic-red/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-bounce-slow"></div>
        
        {/* Floating camera icons */}
        <div className="absolute top-1/4 left-1/4 text-3xl animate-float" style={{ animationDelay: '1s' }}>📸</div>
        <div className="absolute top-1/3 right-1/4 text-2xl animate-float" style={{ animationDelay: '3s' }}>🎨</div>
        <div className="absolute bottom-1/3 left-1/3 text-2xl animate-float" style={{ animationDelay: '2s' }}>🖼️</div>
        <div className="absolute top-1/2 right-1/3 text-3xl animate-float" style={{ animationDelay: '4s' }}>📷</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center min-h-[85vh]">
        <div className="text-center w-full">
          <div className="inline-flex items-center bg-gradient-to-r from-paralympic-yellow/20 to-paralympic-red/20 backdrop-blur-sm px-8 py-3 rounded-full mb-8 border border-white/20">
            <span className="text-paralympic-yellow font-bold text-lg">📸 PARALYMPIC MOMENTS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Visual Stories
            <span className="block bg-gradient-to-r from-paralympic-yellow via-paralympic-red to-paralympic-green bg-clip-text text-transparent">
              That Inspire
            </span>
            <span className="block text-white">the World</span>
          </h1>

          <p className="text-xl md:text-2xl text-paralympic-gray max-w-4xl mx-auto mb-12 leading-relaxed">
            Explore thousands of captivating images from Paralympic events around the globe. 
            From triumphant victories to behind-the-scenes moments, discover the stories that define the Paralympic Movement.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by event, athlete, sport, or location..."
                className="w-full px-6 py-4 pl-12 pr-16 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-paralympic-yellow focus:border-transparent text-paralympic-navy placeholder-gray-500"
              />
              <svg className="absolute left-4 top-4 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                type="submit"
                className="absolute right-2 top-2 bg-paralympic-blue text-white px-6 py-2 rounded-full hover:bg-paralympic-navy transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-paralympic-yellow text-paralympic-navy px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 transform hover:scale-105">
              Browse All Collections
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-paralympic-navy transition-all duration-300 transform hover:scale-105">
              View Recent Updates
            </button>
          </div>

          {/* Image indicators */}
          <div className="flex justify-center mt-12 space-x-2">
            {featuredImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeImage
                    ? 'bg-paralympic-yellow w-8'
                    : 'bg-white/50 w-2 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
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

export default GalleryHeroSection;