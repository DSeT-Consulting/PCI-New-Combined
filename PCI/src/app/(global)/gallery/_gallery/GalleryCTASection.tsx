// src/app/gallery/_gallery/GalleryCTASection.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const GalleryCTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-paralympic-red via-paralympic-blue to-paralympic-green relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-paralympic-yellow/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-bounce-slow"></div>
        
        {/* Floating icons */}
        <div className="absolute top-1/4 left-1/4 text-3xl animate-float" style={{ animationDelay: '1s' }}>📸</div>
        <div className="absolute top-1/3 right-1/4 text-2xl animate-float" style={{ animationDelay: '3s' }}>🎨</div>
        <div className="absolute bottom-1/3 left-1/3 text-2xl animate-float" style={{ animationDelay: '2s' }}>🖼️</div>
        <div className="absolute top-1/2 right-1/3 text-3xl animate-float" style={{ animationDelay: '4s' }}>📷</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full mb-8 border border-white/20">
            <span className="text-paralympic-yellow font-bold text-lg">📤 SHARE & CONTRIBUTE</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Help Us Capture
            <span className="block bg-gradient-to-r from-paralympic-yellow to-white bg-clip-text text-transparent">
              Every Moment
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            Be part of building the world&apos;s most comprehensive Paralympic photo archive. 
            Share your moments, download high-quality images, and help tell the story of Paralympic excellence.
          </p>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">📤</div>
              <h3 className="text-xl font-bold mb-3">Submit Photos</h3>
              <p className="text-white/80 mb-4 text-sm">
                Share your Paralympic moments with the world and contribute to our growing collection
              </p>
              <button className="bg-paralympic-yellow text-paralympic-navy px-6 py-2 rounded-full font-semibold hover:bg-white transition-colors">
                Upload Images
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-bold mb-3">Download</h3>
              <p className="text-white/80 mb-4 text-sm">
                Access high-resolution images for media, educational, or personal use
              </p>
              <button className="bg-white text-paralympic-blue px-6 py-2 rounded-full font-semibold hover:bg-paralympic-gray transition-colors">
                Download Center
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Become a Partner</h3>
              <p className="text-white/80 mb-4 text-sm">
                Join our network of photographers and media partners covering Paralympic events
              </p>
              <button className="bg-paralympic-green text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors">
                Partner With Us
              </button>
            </div>
          </div>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-3xl mx-auto mb-12">
            <Link
              href="/athletes"
              className="bg-white text-paralympic-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-paralympic-gray transition-all duration-300 transform hover:scale-105 flex-1 sm:flex-none sm:min-w-[220px] text-center"
            >
              Meet the Athletes
            </Link>
            
            <Link
              href="/events"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-paralympic-navy transition-all duration-300 transform hover:scale-105 flex-1 sm:flex-none sm:min-w-[220px] text-center"
            >
              Upcoming Events
            </Link>
            
            <Link
              href="/news"
              className="bg-paralympic-yellow text-paralympic-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 flex-1 sm:flex-none sm:min-w-[220px] text-center"
            >
              Latest News
            </Link>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold mb-6">Usage Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">✅</div>
                <h4 className="font-semibold mb-2">Educational Use</h4>
                <p className="text-white/80">Free for educational institutions and research purposes</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📰</div>
                <h4 className="font-semibold mb-2">Media Coverage</h4>
                <p className="text-white/80">Available for news reporting and editorial use</p>
              </div>
              <div className="text-2xl mb-2">🏢</div>
              <h4 className="font-semibold mb-2">Commercial Use</h4>
              <p className="text-white/80">Contact us for commercial licensing options</p>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/gallery/terms"
                className="text-paralympic-yellow hover:text-white transition-colors underline"
              >
                View Full Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Social Sharing */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Share the Movement</h3>
            <p className="text-white/80 mb-6">
              Help spread the Paralympic spirit by sharing these incredible moments
            </p>
            <div className="flex justify-center space-x-4">
              <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.163-1.507-.701-2.448-2.902-2.448-4.663 0-3.8 2.759-7.287 7.967-7.287 4.175 0 7.425 2.977 7.425 6.944 0 4.125-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </button>
              <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryCTASection;