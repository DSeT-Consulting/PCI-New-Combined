// src\app\_home\AthletesSection.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_ATHLETES } from '~/lib/data';

export default function AthletesSection() {
  const [activeAthlete, setActiveAthlete] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveAthlete((prev) => (prev === FEATURED_ATHLETES.length - 1 ? 0 : prev + 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const handlePrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveAthlete((prev) => (prev === 0 ? FEATURED_ATHLETES.length - 1 : prev - 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const selectAthlete = (index: number) => {
    if (isTransitioning || index === activeAthlete) return;

    setIsTransitioning(true);
    setActiveAthlete(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollPosition = window.scrollY;
        const elementPosition = carouselRef.current.offsetTop;
        const distance = scrollPosition - elementPosition;

        if (distance > -500 && distance < 500) {
          const parallaxElements = carouselRef.current.querySelectorAll('.parallax');
          parallaxElements.forEach((el) => {
            const speed = (el as HTMLElement).dataset.speed ?? '0.1';
            const movement = distance * parseFloat(speed);
            (el as HTMLElement).style.transform = `translateY(${movement}px)`;
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentAthlete = FEATURED_ATHLETES[activeAthlete]!;
  const totalMedals = currentAthlete.medals.gold + currentAthlete.medals.silver + currentAthlete.medals.bronze;

  return (
    <section className="py-24 bg-gradient-to-r from-paralympic-navy to-paralympic-blue text-white overflow-hidden">
      <div className="container mx-auto px-4" ref={carouselRef}>
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <div className="inline-block bg-paralympic-yellow px-4 py-1 rounded-full mb-4">
              <span className="text-paralympic-navy font-semibold">Extraordinary Athletes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Champions
            </h2>
            <p className="text-lg text-paralympic-gray max-w-2xl">
              Discover the remarkable stories and achievements of Paralympic athletes who inspire the world through their determination and excellence.
            </p>
          </div>

          <Link
            href="/athletes"
            className="group mt-6 md:mt-0 inline-flex items-center font-bold text-paralympic-yellow hover:text-white transition-colors"
          >
            <span>Explore All Athletes</span>
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

        {/* Athlete showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Athlete image */}
          <div className="relative">
            <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
              {FEATURED_ATHLETES.map((athlete, index) => (
                <div
                  key={athlete.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeAthlete === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  <Image
                    src={athlete.imageUrl}
                    alt={athlete.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}

              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-paralympic-navy/70 to-transparent z-20"></div>
              <div className="absolute -top-6 -right-6 h-32 w-32 bg-paralympic-green rounded-full opacity-20 parallax" data-speed="0.05"></div>
              <div className="absolute -bottom-8 -left-8 h-40 w-40 bg-paralympic-yellow rounded-full opacity-20 parallax" data-speed="0.08"></div>

              {/* Country flag */}
              {/* <div className="absolute top-6 left-6 z-30">
                <div className="flex items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-2xl mr-2">
                    {getFlagEmoji(currentAthlete.countryCode)}
                  </span>
                  <span className="font-medium">{currentAthlete.country}</span>
                </div>
              </div> */}

              {/* Sport label */}
              <div className="absolute top-6 right-6 z-30 bg-paralympic-blue px-4 py-2 rounded-full">
                <span className="font-medium">{currentAthlete.sport}</span>
              </div>

              {/* Athlete name */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-30">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">{currentAthlete.name}</h3>
              </div>
            </div>
          </div>

          {/* Athlete info */}
          <div className="relative">
            {/* Quote */}
            <div className="mb-8">
              {/* <svg className="h-12 w-12 text-paralympic-yellow/50 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8v6a6 6 0 01-6 6H2v2a6 6 0 006 6h2a6 6 0 006-6v-8a6 6 0 00-6-6zm20 0v6a6 6 0 01-6 6h-2v2a6 6 0 006 6h2a6 6 0 006-6v-8a6 6 0 00-6-6z" />
              </svg> */}
              <blockquote className="text-2xl font-light italic mb-4 transition-all duration-500 ease-in-out">
                &quot;{currentAthlete.quote}&quot;
              </blockquote>
            </div>

            {/* Medals */}
            <div className="flex items-center mb-8">
              <div className="flex -space-x-2 mr-6">
                {Array(Math.min(3, totalMedals)).fill(null).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 w-12 rounded-full border-2 border-white bg-gradient-to-br from-paralympic-yellow to-paralympic-green flex items-center justify-center"
                  >
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                ))}
              </div>
              <div>
                <span className="block text-sm text-paralympic-gray">Paralympic Medals</span>
                <div className="flex items-center space-x-4">
                  {
                    currentAthlete.medals.gold > 0 && (
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-yellow-400 mr-2"></div>
                        <span>{currentAthlete.medals.gold}</span>
                      </div>
                    )
                  }
                  {
                    currentAthlete.medals.silver > 0 && (
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-gray-300 mr-2"></div>
                        <span>{currentAthlete.medals.silver}</span>
                      </div>
                    )
                  }
                  {
                    currentAthlete.medals.bronze > 0 && (
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-yellow-700 mr-2"></div>
                        <span>{currentAthlete.medals.bronze}</span>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-10">
              <h4 className="text-lg font-bold mb-4">Key Achievements</h4>
              <ul className="space-y-3">
                {currentAthlete.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-paralympic-yellow mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile link */}
            {/* <Link 
              href={`/athletes/${currentAthlete.slug}`}
              className="inline-block bg-paralympic-yellow text-paralympic-navy font-bold py-3 px-8 rounded-full hover:bg-white transition-colors duration-300"
            >
              View Full Profile
            </Link> */}

            {/* Navigation controls */}
            <div className="mt-10 flex items-center">
              <button
                onClick={handlePrev}
                className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors mr-4"
                aria-label="Previous athlete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <div className="flex space-x-2">
                {FEATURED_ATHLETES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selectAthlete(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${activeAthlete === index
                      ? 'bg-paralympic-yellow w-8'
                      : 'bg-white/50 hover:bg-white'
                      }`}
                    aria-label={`Go to athlete ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors ml-4"
                aria-label="Next athlete"
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