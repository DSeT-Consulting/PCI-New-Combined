// components/athletes/SupportSection.tsx
"use client"

import React from 'react';

const SupportSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 via-white to-green-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full mb-8 border border-gray-800/20">
            <span className="text-gray-800 font-bold">🇮🇳 SUPPORT TEAM INDIA</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Be Part of Their Journey
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Every champion needs support. Join us in empowering our Paralympic athletes as they train for future glory and represent India on the world stage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex-1 sm:flex-none shadow-lg">
              Support Athletes
            </button>
            <button className="border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105 flex-1 sm:flex-none backdrop-blur-sm">
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;