// components/athletes/AthleteCard.tsx
"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Athlete {
  id: number;
  name: string;
  sport: string;
  category: string;
  state: string;
  image: string;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
  totalMedals: number;
  age: number;
}

interface AthleteCardProps {
  athlete: Athlete;
}

const AthleteCard: React.FC<AthleteCardProps> = ({ athlete }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
    <div className="relative h-48 bg-gradient-to-br from-paralympic-gray to-paralympic-blue/10">
      <Image
        src={athlete.image}
        alt={athlete.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
        <span className="text-xs font-bold text-paralympic-navy">{athlete.state}</span>
      </div>
      <div className="absolute top-4 left-4 flex space-x-1">
        {athlete.medals.gold > 0 && (
          <div className="w-6 h-6 bg-paralympic-yellow rounded-full flex items-center justify-center text-xs font-bold text-white">
            {athlete.medals.gold}
          </div>
        )}
        {athlete.medals.silver > 0 && (
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-700">
            {athlete.medals.silver}
          </div>
        )}
        {athlete.medals.bronze > 0 && (
          <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-xs font-bold text-yellow-100">
            {athlete.medals.bronze}
          </div>
        )}
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold text-paralympic-navy mb-2 group-hover:text-paralympic-blue transition-colors">
        {athlete.name}
      </h3>
      <div className="flex items-center justify-between mb-3">
        <span className="text-paralympic-blue font-semibold">{athlete.sport}</span>
        <span className="text-sm text-gray-500 bg-paralympic-gray px-2 py-1 rounded-full">{athlete.category}</span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {athlete.state}
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Age: {athlete.age}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-500">Total Medals:</span>
          <span className="font-bold text-paralympic-navy ml-1">{athlete.totalMedals}</span>
        </div>

        <Link
          href={`/athletes/${athlete.name.toLowerCase().replace(' ', '-')}`}
          className="inline-flex items-center text-paralympic-blue hover:text-paralympic-green font-medium text-sm transition-colors"
        >
          View Profile
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

export default AthleteCard;