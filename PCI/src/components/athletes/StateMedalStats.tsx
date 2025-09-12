// components/athletes/StateMedalStats.tsx
"use client"

import React from 'react';

interface StateMedalStatsProps {
  stateMedalStats: Record<string, { gold: number; silver: number; bronze: number; total: number }>;
}

const StateMedalStats: React.FC<StateMedalStatsProps> = ({ stateMedalStats }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-green-500 px-6 py-2 rounded-full mb-6">
            <span className="text-white font-bold">🏆 MEDAL TALLY</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-paralympic-navy mb-4">
            State-wise Paralympic Achievements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating the diversity of talent across India - our Paralympic champions represent the strength of our entire nation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(stateMedalStats).map(([state, stats]) => (
            <div key={state} className="bg-gradient-to-br from-paralympic-blue/5 to-paralympic-green/5 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-paralympic-navy">{state}</h3>
                <div className="text-2xl font-bold text-paralympic-blue">{stats.total}</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="w-8 h-8 bg-paralympic-yellow rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-sm font-bold text-white">{stats.gold}</span>
                  </div>
                  <span className="text-xs text-gray-600">Gold</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-sm font-bold text-gray-700">{stats.silver}</span>
                  </div>
                  <span className="text-xs text-gray-600">Silver</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-sm font-bold text-white">{stats.bronze}</span>
                  </div>
                  <span className="text-xs text-gray-600">Bronze</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StateMedalStats;