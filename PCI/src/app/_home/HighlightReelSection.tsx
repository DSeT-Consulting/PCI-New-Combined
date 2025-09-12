'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HIGHLIGHT_VIDEOS } from '~/lib/data';


export default function HighlightReelSection() {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-paralympic-green relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-paralympic-yellow opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-paralympic-red opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <svg className="w-5 h-5 text-paralympic-yellow mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5v10l7-5z"/>
            </svg>
            <span className="text-white font-semibold">WATCH COMPETITION</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            HIGHLIGHTS
          </h2>
          
          <p className="text-paralympic-gray text-lg max-w-2xl mx-auto">
            Relive the most incredible moments from Paralympic competitions around the world
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {HIGHLIGHT_VIDEOS.map((video) => (
            <Link
              key={video.id}
              href={video.videoUrl}
              className="group relative"
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                {/* Thumbnail */}
                <div className="relative h-64 bg-gray-800">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform transition-all duration-300 ${
                      hoveredVideo === video.id ? 'scale-110 bg-paralympic-yellow' : ''
                    }`}>
                      <svg className="w-6 h-6 text-paralympic-navy ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l7-5z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  
                  {/* Category */}
                  <div className="absolute top-4 left-4 bg-paralympic-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {video.category}
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-paralympic-yellow transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {video.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/videos"
            className="inline-flex items-center bg-white text-paralympic-navy px-8 py-3 rounded-full font-bold hover:bg-paralympic-yellow transition-all duration-300 transform hover:scale-105"
          >
            <span>View All Highlights</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}