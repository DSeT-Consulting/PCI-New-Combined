// components/athletes/AthleteTable.tsx
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
  age: number;
}

interface AthleteTableProps {
  athletes: Athlete[];
}

const AthleteTable: React.FC<AthleteTableProps> = ({ athletes }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-paralympic-gray">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-paralympic-navy uppercase tracking-wider">
                Athlete
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-paralympic-navy uppercase tracking-wider">
                Sport
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-paralympic-navy uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-paralympic-navy uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-paralympic-navy uppercase tracking-wider">
                Medals
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-paralympic-navy uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {athletes.map(athlete => (
              <tr key={athlete.id} className="hover:bg-paralympic-gray/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <Image
                        src={athlete.image}
                        alt={athlete.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-paralympic-navy">{athlete.name}</div>
                      <div className="text-sm text-gray-500">{athlete.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-paralympic-navy">{athlete.sport}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-paralympic-navy">{athlete.state}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-paralympic-navy">{athlete.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    {athlete.medals.gold > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-paralympic-yellow/20 text-paralympic-navy">
                        🥇 {athlete.medals.gold}
                      </span>
                    )}
                    {athlete.medals.silver > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        🥈 {athlete.medals.silver}
                      </span>
                    )}
                    {athlete.medals.bronze > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        🥉 {athlete.medals.bronze}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/athletes/${athlete.name.toLowerCase().replace(' ', '-')}`}
                    className="text-paralympic-blue hover:text-paralympic-green transition-colors"
                  >
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AthleteTable;