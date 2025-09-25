'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BANNER_SLIDES } from '~/lib/data';

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Preload next images when component mounts
  useEffect(() => {
    // Preload next 2-3 images after first render
    const preloadImages = () => {
      const imagesToPreload = [1, 2, 3]; // preload next 3 images after first

      imagesToPreload.forEach((index) => {
        const slide = BANNER_SLIDES[index];
        if (slide) {
          const img = document.createElement('img');
          img.src = slide.imageUrl;
        }
      });
    };

    // Delay preloading slightly to prioritize first image
    const timer = setTimeout(preloadImages, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Use useCallback to memoize the nextSlide function
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const nextIndex = activeSlide === BANNER_SLIDES.length - 1 ? 0 : activeSlide + 1;
    setActiveSlide(nextIndex);

    // Preload the image after next one
    const preloadIndex = nextIndex === BANNER_SLIDES.length - 1 ? 0 : nextIndex + 1;
    const slideToPreload = BANNER_SLIDES[preloadIndex];
    if (slideToPreload) {
      const img = document.createElement('img');
      img.src = slideToPreload.imageUrl;
    }

    // Reset transition lock after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, [isTransitioning, activeSlide]);

  const prevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveSlide((prev) => (prev === 0 ? BANNER_SLIDES.length - 1 : prev - 1));

    // Reset transition lock after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === activeSlide) return;

    setIsTransitioning(true);
    setActiveSlide(index);

    // Reset transition lock after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  // Handle automatic slide changes
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds (changed from 1000ms to 5000ms)
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide]); // Added nextSlide to dependencies

  // Pause autoplay when user hovers over the banner
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchEndX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: '1600/900' // Exact ratio of your images
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {BANNER_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 h-full w-full transition-opacity duration-800 ease-in-out ${activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            {/* Optimized Image with overlay - Render current, next, and previous slides */}
            <div className="relative h-full w-full">
              <Image
                src={slide.imageUrl}
                alt={slide.title || `Paralympic Banner ${index + 1}`}
                fill
                className="object-contain"
                priority={index === 0} // Only preload first image with priority
                loading={index <= 2 ? "eager" : "lazy"} // Load first 3 images eagerly
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAAAAAAB/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAERAv/aAAwDAQACEQMRAD8Anz9vYWtjb20UcKKqKFUKBgADgADoAK4v/9k="
              />
              <div className="absolute inset-0 bg-gradient-to-r from-paralympic-navy/80 to-transparent"></div>
            </div>

            {/* Text content */}
            <div className="absolute inset-0 flex items-center justify-center sm:justify-start z-20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl transition-all duration-1000 ease-out transform
                  translate-y-0 opacity-100 text-center sm:text-left"
                >
                  <h1
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight"
                    style={{
                      textShadow: '0 4px 8px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-paralympic-gray mb-6 sm:mb-8 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  {
                    slide.buttonText && slide.buttonLink && (
                      <Link
                        href={slide.buttonLink}
                        className="inline-block bg-paralympic-blue text-white font-bold text-sm sm:text-base py-2.5 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-paralympic-green transition-colors duration-300 transform hover:scale-105 shadow-lg"
                      >
                        {slide.buttonText}
                      </Link>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-0 right-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-center sm:justify-between justify-center">
            {/* Slide indicators */}
            <div className="flex space-x-2 sm:space-x-3 order-2 sm:order-1">
              {BANNER_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 rounded-full transition-all duration-300 touch-manipulation ${activeSlide === index
                      ? 'bg-paralympic-yellow w-5 sm:w-6 md:w-16 lg:w-24'
                      : 'bg-white/50 hover:bg-white active:bg-white'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next buttons - Hidden on mobile */}
            <div className="hidden sm:flex space-x-4 order-1 sm:order-2">
              <button
                onClick={toggleAutoPlay}
                className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 transition-colors touch-manipulation"
                aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isAutoPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                )}
              </button>

              <button
                onClick={prevSlide}
                className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 transition-colors touch-manipulation"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 transition-colors touch-manipulation"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}