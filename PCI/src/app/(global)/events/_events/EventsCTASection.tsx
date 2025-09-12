'use client';

import React from 'react';
import Link from 'next/link';

const EventsCTASection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-paralympic-red via-paralympic-blue to-paralympic-green relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-paralympic-yellow/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-bounce-slow"></div>
        
        {/* Floating icons */}
        <div className="absolute top-1/4 left-1/4 text-3xl animate-bounce-slow" style={{ animationDelay: '1s' }}>🎫</div>
        <div className="absolute top-1/3 right-1/4 text-2xl animate-bounce-slow" style={{ animationDelay: '3s' }}>🏆</div>
        <div className="absolute bottom-1/3 left-1/3 text-2xl animate-bounce-slow" style={{ animationDelay: '2s' }}>⭐</div>
        <div className="absolute top-1/2 right-1/3 text-3xl animate-bounce-slow" style={{ animationDelay: '4s' }}>🎯</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full mb-8 border border-white/20">
            <span className="text-paralympic-yellow font-bold text-lg">🚀 JOIN THE MOVEMENT</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Be Part of
            <span className="block bg-gradient-to-r from-paralympic-yellow to-white bg-clip-text text-transparent">
              Paralympic History
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            Don&apos;t just watch greatness—experience it. From securing tickets to volunteering, 
            discover all the ways you can be part of the Paralympic Movement.
          </p>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">🎫</div>
              <h3 className="text-xl font-bold mb-3">Get Tickets</h3>
              <p className="text-white/80 mb-4 text-sm">
                Secure your seats to witness world-class Paralympic competition live
              </p>
              <Link
                href="/tickets"
                className="inline-block bg-paralympic-yellow text-paralympic-navy px-6 py-2 rounded-full font-semibold hover:bg-white transition-colors"
              >
                Buy Tickets
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Volunteer</h3>
              <p className="text-white/80 mb-4 text-sm">
                Join thousands of volunteers making Paralympic events possible
              </p>
              <Link
                href="/volunteer"
                className="inline-block bg-white text-paralympic-blue px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Volunteer Now
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
              <p className="text-white/80 mb-4 text-sm">
                Get notifications about events, results, and breaking news
              </p>
              <button className="bg-paralympic-green text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors">
                Get Notifications
              </button>
            </div>
          </div>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-3xl mx-auto">
            <Link
              href="/athletes"
              className="bg-white text-paralympic-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex-1 sm:flex-none sm:min-w-[220px] text-center"
            >
              Meet Our Athletes
            </Link>
            
            <Link
              href="/news"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-paralympic-navy transition-all duration-300 transform hover:scale-105 flex-1 sm:flex-none sm:min-w-[220px] text-center"
            >
              Latest News
            </Link>
            
            <Link
              href="/about"
              className="bg-paralympic-yellow text-paralympic-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 flex-1 sm:flex-none sm:min-w-[220px] text-center"
            >
              Learn More
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-paralympic-yellow mb-2">4,400+</div>
              <div className="text-white/80 text-sm">Athletes Competing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">180+</div>
              <div className="text-white/80 text-sm">Countries Participating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-paralympic-green mb-2">22</div>
              <div className="text-white/80 text-sm">Paralympic Sports</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-paralympic-red mb-2">4.25B</div>
              <div className="text-white/80 text-sm">Global TV Audience</div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold mb-4">Never Miss a Moment</h3>
            <p className="text-white/80 mb-6">
              Get exclusive updates, behind-the-scenes content, and early access to tickets
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-paralympic-yellow"
              />
              <button className="bg-paralympic-yellow text-paralympic-navy px-8 py-3 rounded-lg font-bold hover:bg-white transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-white/60 mt-3">
              By subscribing, you agree to receive updates from the Paralympic Movement. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCTASection;