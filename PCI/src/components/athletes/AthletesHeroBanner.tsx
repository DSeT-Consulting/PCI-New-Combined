// components/athletes/AthletesHeroBanner.tsx
"use client"

import React from 'react';

interface AthletesHeroBannerProps {
  totalMedals: {
    gold: number;
    silver: number;
    bronze: number;
    total: number;
  };
  totalAthletes: number;
}

const AthletesHeroBanner: React.FC<AthletesHeroBannerProps> = ({ totalMedals, totalAthletes }) => {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/home/pci-hero-slider3.png')`
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Floating medal icons */}
      <div className="absolute inset-0 z-10">
        {/* <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce-slow" style={{ animationDelay: '1s' }}>🥇</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-bounce-slow" style={{ animationDelay: '3s' }}>🥈</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl animate-bounce-slow" style={{ animationDelay: '2s' }}>🥉</div> */}
        <div className="absolute top-1/2 right-1/3 text-2xl animate-bounce-slow" style={{ animationDelay: '4s' }}>🏆</div>
      </div>

      <div className="relative z-20 container mx-auto px-4 py-16 flex items-center min-h-[80vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content - Left Side */}
          <div className="text-left">
            <div className="inline-flex items-center bg-gradient-to-r from-paralympic-yellow/20 to-paralympic-blue/20 backdrop-blur-sm px-8 py-3 rounded-full mb-8 border border-white/20">
              <span className="text-paralympic-yellow font-bold text-lg">⭐ INDIA&apos;S FINEST ATHLETES</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Our Paralympic
              <span className="block bg-gradient-to-r from-paralympic-yellow via-pink-400 to-paralympic-blue bg-clip-text text-transparent">
                Heroes
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Discover the incredible journeys of athletes who have redefined possibilities, broken barriers,
              and brought glory to India on the world&apos;s biggest Paralympic stage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-paralympic-yellow text-paralympic-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105">
                Support Our Athletes
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-paralympic-navy transition-all duration-300 transform hover:scale-105">
                View Training Centers
              </button>
            </div>
          </div>

          {/* Right side can be left empty or used for additional content */}
          <div className="hidden lg:block">
            {/* This space can be used for other content if needed */}
          </div>
        </div>
      </div>

      {/* Gradient overlay at bottom for smooth transition to white background */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-white to-white/0 z-[1]"></div>
    </section>
  );
};

export default AthletesHeroBanner;