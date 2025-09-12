// src/app/gallery/_gallery/GalleryStatsSection.tsx
'use client';

import React from 'react';

interface GalleryStatsSectionProps {
  totalImages: number;
  totalEvents: number;
  years: number;
}

const GalleryStatsSection: React.FC<GalleryStatsSectionProps> = ({
  totalImages,
  totalEvents,
  years
}) => {
  const stats = [
    {
      id: 1,
      icon: '📸',
      value: totalImages.toLocaleString(),
      label: 'Total Images',
      color: 'from-paralympic-blue to-paralympic-green',
      bgColor: 'bg-paralympic-blue/10'
    },
    {
      id: 2,
      icon: '🎯',
      value: totalEvents.toString(),
      label: 'Event Collections',
      color: 'from-paralympic-green to-paralympic-yellow',
      bgColor: 'bg-paralympic-green/10'
    },
    {
      id: 3,
      icon: '📅',
      value: years.toString(),
      label: 'Years Documented',
      color: 'from-paralympic-red to-paralympic-blue',
      bgColor: 'bg-paralympic-red/10'
    },
    {
      id: 4,
      icon: '🌍',
      value: '50+',
      label: 'Countries Featured',
      color: 'from-paralympic-yellow to-paralympic-red',
      bgColor: 'bg-paralympic-yellow/10'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-paralympic-gray to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-paralympic-blue to-paralympic-green px-6 py-2 rounded-full mb-6">
            <span className="text-white font-bold">📊 GALLERY STATISTICS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-paralympic-navy mb-4">
            A Visual Legacy
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive collection captures decades of Paralympic excellence, featuring moments that have shaped the movement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`${stat.bgColor} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 group`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-paralympic-navy font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-200/50">
            <h3 className="text-2xl font-bold text-paralympic-navy mb-4">
              Growing Collection
            </h3>
            <p className="text-gray-600 mb-6">
              Our gallery is constantly updated with new images from Paralympic events worldwide. 
              Every photo tells a story of determination, excellence, and inspiration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-paralympic-blue mb-1">Weekly</div>
                <div className="text-sm text-gray-600">New Images Added</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-paralympic-green mb-1">HD Quality</div>
                <div className="text-sm text-gray-600">Professional Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-paralympic-red mb-1">Free Access</div>
                <div className="text-sm text-gray-600">Public Gallery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryStatsSection;