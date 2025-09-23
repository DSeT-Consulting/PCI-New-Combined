// src/app/not-found.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Trophy, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration issues
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-purple-900 text-white relative overflow-hidden py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-paralympic-yellow rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-paralympic-green rounded-full blur-lg animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-paralympic-red rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-paralympic-yellow rounded-full blur-md animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation Back */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Paralympic Logo */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="relative">
              <Image
                src="/assets/logo-lightbg.png"
                alt="Paralympics Logo"
                width={120}
                height={40}
                className="h-16 w-auto drop-shadow-lg rounded"
              />
            </div>
          </div>

          {/* 404 Title */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-paralympic-yellow via-paralympic-green to-paralympic-red bg-clip-text text-transparent leading-none">
              404
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-paralympic-yellow to-paralympic-green mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-base sm:text-lg md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              The page you&apos;re looking for seems to have taken a different route to the finish line.
              Let&apos;s get you back on track to explore the Paralympic Movement.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {/* Home Button */}
            <Link
              href="/"
              className="group flex items-center space-x-3 bg-paralympic-blue hover:bg-paralympic-blue/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-paralympic-blue/25 min-w-[200px] justify-center"
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Go Home</span>
            </Link>

            {/* WPA Delhi Button */}
            <Link
              href="/wpa-new-delhi-2025"
              className="group flex items-center space-x-3 bg-gradient-to-r from-paralympic-green to-paralympic-yellow hover:from-paralympic-yellow hover:to-paralympic-green text-paralympic-navy px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-paralympic-green/25 min-w-[200px] justify-center"
            >
              <Trophy className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>WPA Delhi 2025</span>
            </Link>
          </div>

          {/* Search Suggestion */}
          <div className="pt-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <Search className="h-4 w-4 text-paralympic-yellow" />
              <span className="text-xs sm:text-sm">
                Looking for something specific? Try searching from the
                <Link href="/" className="text-paralympic-yellow hover:text-paralympic-green transition-colors ml-1 font-medium">
                  homepage
                </Link>
              </span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-8 pt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="w-2 h-2 bg-paralympic-blue rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-paralympic-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-paralympic-red rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-2 h-2 bg-paralympic-yellow rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="absolute bottom-6 left-0 right-0 text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
        <p className="text-xs sm:text-sm text-white/60">
          Continue your Paralympic journey with us
        </p>
      </div>
    </div>
  );
}