// components/athletes/MedalStatsSection.tsx
"use client"

import React from 'react';

interface MedalStatsSectionProps {
  totalMedals: {
    gold: number;
    silver: number;
    bronze: number;
    total: number;
  };
  totalAthletes: number;
}

const MedalStatsSection: React.FC<MedalStatsSectionProps> = ({ totalMedals, totalAthletes }) => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-paralympic-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-paralympic-green rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-paralympic-yellow/20 to-paralympic-green/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-paralympic-blue/20">
            <span className="text-paralympic-navy font-bold">🏆 INDIA&apos;S MEDAL LEGACY</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-paralympic-navy mb-4">
            Paralympic Achievements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating the remarkable achievements of our Paralympic champions who have brought pride and glory to India.
          </p>
        </div>

        {/* Medal Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="group">
            <div className="bg-gradient-to-br from-paralympic-yellow/10 to-yellow-600/10 border border-paralympic-yellow/20 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4">🥇</div>
              <div className="text-4xl font-bold text-paralympic-yellow mb-2">{totalMedals.gold}</div>
              <div className="text-sm text-paralympic-navy font-medium">Gold Medals</div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4">🥈</div>
              <div className="text-4xl font-bold text-gray-600 mb-2">{totalMedals.silver}</div>
              <div className="text-sm text-paralympic-navy font-medium">Silver Medals</div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-300 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4">🥉</div>
              <div className="text-4xl font-bold text-orange-600 mb-2">{totalMedals.bronze}</div>
              <div className="text-sm text-paralympic-navy font-medium">Bronze Medals</div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gradient-to-br from-paralympic-blue/10 to-purple-100 border border-paralympic-blue/20 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4">👥</div>
              <div className="text-4xl font-bold text-paralympic-blue mb-2">{totalAthletes}</div>
              <div className="text-sm text-paralympic-navy font-medium">Champions</div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-paralympic-gray rounded-xl p-6 border border-gray-200">
              <div className="text-3xl font-bold text-paralympic-navy mb-2">{totalMedals.total}</div>
              <div className="text-gray-600">Total Medals Won</div>
            </div>
            <div className="bg-paralympic-gray rounded-xl p-6 border border-gray-200">
              <div className="text-3xl font-bold text-paralympic-navy mb-2">22+</div>
              <div className="text-gray-600">Paralympic Sports</div>
            </div>
            <div className="bg-paralympic-gray rounded-xl p-6 border border-gray-200">
              <div className="text-3xl font-bold text-paralympic-navy mb-2">28+</div>
              <div className="text-gray-600">States Represented</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedalStatsSection;