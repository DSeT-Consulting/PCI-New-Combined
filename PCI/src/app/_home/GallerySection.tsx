'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GALLERY_EVENTS } from '~/lib/data';
import { formatDate } from '~/lib/utils';
import { GalleryEvent } from '~/lib/types';

export default function GallerySection() {
  const [activeEvent, setActiveEvent] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<{
    id: number;
    imageUrl: string;
    alt: string;
    width: number;
    height: number;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current: container } = scrollRef;
      const scrollAmount = 320; // Adjust as needed
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };
  
  const openLightbox = (image: {
    id: number;
    imageUrl: string;
    alt: string;
    width: number;
    height: number;
  }) => {
    setLightboxImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
    document.body.style.overflow = ''; // Restore scrolling
  };

  const currentEvent = GALLERY_EVENTS[activeEvent]! ;

  return (
    <section className="py-20 bg-paralympic-gray relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-paralympic-blue rounded-full opacity-10"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-paralympic-green rounded-full opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="inline-block bg-paralympic-green px-4 py-1 rounded-full mb-4">
              <span className="text-white font-semibold">Visual Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-paralympic-navy mb-4">
              Paralympic Moments
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Write a brief description of the gallery section, highlighting the significance of the images and events showcased.
            </p>
          </div>
          
          <Link 
            href="/gallery"
            className="group mt-6 md:mt-0 inline-flex items-center font-bold text-paralympic-blue hover:text-paralympic-green transition-colors"
          >
            <span>View Full Gallery</span>
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
        
        {/* Event selector tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          <div className="flex space-x-4">
            {GALLERY_EVENTS.map((event, index) => (
              <button
                key={event.id}
                onClick={() => setActiveEvent(index)}
                className={`flex-shrink-0 px-6 py-3 rounded-full transition-colors ${
                  activeEvent === index 
                    ? 'bg-paralympic-blue text-white' 
                    : 'bg-white text-paralympic-navy hover:bg-paralympic-blue/10'
                }`}
              >
                <span className="whitespace-nowrap font-medium">{event.title}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Gallery event details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md h-full">
              <div className="flex items-center mb-4">
                <div className="flex items-center text-gray-500 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{formatDate(currentEvent.date)}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{currentEvent.location}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-paralympic-navy mb-4">
                {currentEvent.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {currentEvent.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-paralympic-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{currentEvent.imageCount} Photos</span>
                </div>
                
                <Link 
                  href={`/gallery/${currentEvent.slug}`}
                  className="inline-flex items-center font-medium text-paralympic-blue hover:text-paralympic-green transition-colors"
                >
                  <span>View Album</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-lg h-80 group">
                <Image
                  src={currentEvent.coverImage}
                  alt={currentEvent.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 flex gap-4 items-center">
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-medium">{currentEvent.title}</span>
                  </div>
                  <Link 
                    href={`/gallery/${currentEvent.slug}`}
                    className="inline-block bg-paralympic-blue text-white font-bold py-2 px-8 rounded-full hover:bg-paralympic-green transition-colors duration-300 transform hover:scale-105"
                  >
                    Explore Album
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image grid with scroll controls */}
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-paralympic-navy">Featured Photos</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleScroll('left')}
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-paralympic-navy hover:bg-paralympic-blue hover:text-white transition-colors"
                aria-label="Scroll left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => handleScroll('right')}
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-paralympic-navy hover:bg-paralympic-blue hover:text-white transition-colors"
                aria-label="Scroll right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pl-5 pb-8 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {currentEvent.featured.map((image) => (
              <div 
                key={image.id}
                className="flex-shrink-0 cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <Image
                    src={image.imageUrl}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Lightbox */}
      {lightboxOpen && lightboxImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative max-w-6xl max-h-[80vh]">
            <Image
              src={lightboxImage.imageUrl}
              alt={lightboxImage.alt}
              width={lightboxImage.width}
              height={lightboxImage.height}
              className="max-h-[80vh] w-auto mx-auto object-contain"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/30 text-white text-center">
              {lightboxImage.alt}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}