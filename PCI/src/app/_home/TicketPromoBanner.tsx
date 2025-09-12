'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TicketPromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-paralympic-red via-paralympic-blue to-paralympic-green py-4">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-bounce-slow"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-paralympic-yellow rounded-full translate-x-12 -translate-y-12 animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white rounded-full animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Paralympic logo/icon */}
            <div className="hidden md:flex items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/assets/logo.png"
                  alt="Paralympic Symbol"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Main message */}
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl">
                🎫 TICKETS ON SALE NOW
              </h3>
              <p className="text-paralympic-gray text-sm">
                Don&apos;t miss out on Paralympic action - secure your spot today!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <Link 
              href="/tickets"
              className="bg-white text-paralympic-navy px-6 py-2 rounded-full font-bold hover:bg-paralympic-yellow hover:text-paralympic-navy transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="hidden md:inline">SECURE YOUR SPOT</span>
              <span className="md:hidden">GET TICKETS</span>
              <svg className="inline ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Close button */}
            {/* <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-paralympic-yellow transition-colors p-1"
              aria-label="Close banner"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}