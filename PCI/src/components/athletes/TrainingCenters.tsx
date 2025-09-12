// components/athletes/TrainingCenters.tsx
"use client"

import React from 'react';

const TrainingCenters: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-paralympic-green to-paralympic-blue px-6 py-2 rounded-full mb-6">
            <span className="text-white font-bold">🏢 TRAINING CENTERS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-paralympic-navy mb-4">
            Excellence Across India
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our athletes train at world-class facilities across the country, supported by the best coaches and infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-paralympic-blue/5 to-purple-50 rounded-xl p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl mb-3">🏹</div>
              <h3 className="text-lg font-bold text-paralympic-navy mb-2">SAI Centers</h3>
              <p className="text-gray-600 text-sm mb-3">Sports Authority of India training facilities across multiple cities</p>
              <div className="text-paralympic-blue font-semibold">15+ Centers</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-paralympic-green/5 to-paralympic-blue/5 rounded-xl p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-paralympic-navy mb-2">Specialized Academies</h3>
              <p className="text-gray-600 text-sm mb-3">Sport-specific training academies with expert coaches</p>
              <div className="text-paralympic-green font-semibold">8+ Academies</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-paralympic-red/5 rounded-xl p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl mb-3">🏥</div>
              <h3 className="text-lg font-bold text-paralympic-navy mb-2">Medical Support</h3>
              <p className="text-gray-600 text-sm mb-3">Comprehensive medical and rehabilitation facilities</p>
              <div className="text-orange-600 font-semibold">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingCenters;