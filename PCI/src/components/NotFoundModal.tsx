'use client';

import { useState, useEffect } from 'react';
import { X, Home, Trophy, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface NotFoundModalProps {
  onClose: () => void;
}

export function NotFoundModal({ onClose }: NotFoundModalProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-purple-900 text-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white z-10 bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          {/* Paralympic Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/logo-lightbg.png"
              alt="Paralympics Logo"
              width={120}
              height={40}
              className="h-12 w-auto drop-shadow-lg rounded"
            />
          </div>

          {/* 404 Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-paralympic-yellow via-paralympic-green to-paralympic-red bg-clip-text text-transparent">
              404
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-paralympic-yellow to-paralympic-green mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="text-center space-y-4 mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Page Not Found
            </h2>
            <p className="text-sm sm:text-base text-gray-200 max-w-lg mx-auto leading-relaxed">
              The page you&apos;re looking for seems to have taken a different route.
              You can continue browsing from where you were.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
            <button
              onClick={onClose}
              className="group flex items-center space-x-2 bg-paralympic-blue hover:bg-paralympic-blue/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 min-w-[180px] justify-center text-sm"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Stay Here</span>
            </button>

            <button
              onClick={() => router.push('/')}
              className="group flex items-center space-x-2 bg-gradient-to-r from-paralympic-green to-paralympic-yellow hover:from-paralympic-yellow hover:to-paralympic-green text-paralympic-navy px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 min-w-[180px] justify-center text-sm"
            >
              <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Go Home</span>
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs">
              <Search className="h-3 w-3 text-paralympic-yellow" />
              <span>Try searching from the homepage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}