// src\app\_home\SponsorsSection.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SPONSORS } from '~/lib/data';

// Define sponsor data type
interface Sponsor {
  id: number;
  name: string;
  tier: string;
  logoUrl: string;
  websiteUrl: string;
  description?: string;
}

export default function SponsorsSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [duplicatedSponsors, setDuplicatedSponsors] = useState<Sponsor[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueePosition, setMarqueePosition] = useState({ transform: 'translateX(0)' });
  const [isMobile, setIsMobile] = useState(false);

  // Duplicate sponsors to create seamless loop
  useEffect(() => {
    setDuplicatedSponsors([...SPONSORS, ...SPONSORS]);
  }, []);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation control using pure JS, not CSS animation
  useEffect(() => {
    if (isHovered || !marqueeRef.current) return;

    let animationFrame: number;
    let startTime: number | null = null;
    // Faster scrolling on mobile (shorter duration) since fewer logos are visible
    const totalDuration = isMobile ? 20000 : 35000; // milliseconds - increased to show all sponsors
    // Since we duplicated sponsors, we need to move 50% to show all original sponsors before seamless loop
    const totalDistance = -50; // -50% to show all original sponsors before looping

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      // Calculate how much time has passed
      const elapsed = timestamp - startTime;

      // Calculate current position based on linear timing
      const progress = (elapsed % totalDuration) / totalDuration;
      const currentPosition = progress * totalDistance;

      // Update position
      if (marqueeRef.current) {
        marqueeRef.current.style.transform = `translateX(${currentPosition}%)`;
      }

      // Continue the animation
      animationFrame = requestAnimationFrame(step);
    };

    // Start the animation
    animationFrame = requestAnimationFrame(step);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);

      // Store current position when pausing
      if (marqueeRef.current) {
        const computedStyle = window.getComputedStyle(marqueeRef.current);
        setMarqueePosition({ transform: computedStyle.transform });
      }
    };
  }, [isHovered, isMobile]);

  // Apply stored position when hovered
  useEffect(() => {
    if (isHovered && marqueeRef.current) {
      // Apply the stored position directly
      Object.assign(marqueeRef.current.style, marqueePosition);
    }
  }, [isHovered, marqueePosition]);

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 mb-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-paralympic-blue px-4 py-1 rounded-full mb-4">
            <span className="text-white font-semibold">Our Supporters</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-paralympic-navy mb-4">
            Partners & Sponsors
          </h2>
          <p className="text-lg text-gray-600">
            Attach all sponsors and partners logos here. This section will scroll infinitely to showcase all sponsors.
          </p>
        </div>
      </div>

      {/* Infinite marquee */}
      <div
        className="relative overflow-hidden py-8 bg-paralympic-gray/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={marqueeRef}
          className="flex"
        // No animation CSS, controlled by JS
        >
          {duplicatedSponsors.map((sponsor, index) => (
            <Link
              key={`${sponsor.id}-${index}`}
              href={sponsor.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-6 md:mx-20 group relative"
              aria-label={`${sponsor.name}`}
            >
              <div className="relative h-40 w-40 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-md">
                <Image
                  src={sponsor.logoUrl}
                  alt={`${sponsor.name} logo`}
                  fill
                  className="object-contain p-2"
                />
              </div>
              {/* {sponsor.description && (
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white text-paralympic-navy text-xs rounded-md shadow-lg p-2 w-48 pointer-events-none">
                  <div className="text-center">
                    <span className="font-bold block mb-1">{sponsor.name}</span>
                    <span>{sponsor.description}</span>
                  </div>
                </div>
              )} */}
            </Link>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 text-center">
        <Link
          href="/partners"
          className="inline-flex items-center font-medium text-paralympic-blue hover:text-paralympic-green transition-colors"
        >
          <span>Learn more about our sponsors</span>
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
    </section>
  );
}