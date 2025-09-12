'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TOP_SPORTS, LATEST_IMPROVEMENTS } from '~/lib/data';

export default function WorldRankingsSection() {
  const [activeTab, setActiveTab] = useState<'current' | 'improvements'>('current');

  return (
    <section className="py-16 bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Rankings header */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-white font-semibold">Section Title</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-paralympic-navy mb-6">
                Sports & Stars
              </h2>

              <p className="text-paralympic-navy/80 text-lg mb-8">
                Discover the world&apos;s top-ranked Paralympic athletes across all sports and classifications.
              </p>

              {/* Tab Navigation */}
              <div className="flex bg-paralympic-navy/10 backdrop-blur-sm rounded-full p-1 mb-6">
                <button
                  onClick={() => setActiveTab('current')}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${activeTab === 'current'
                      ? 'bg-white text-paralympic-navy'
                      : 'text-white hover:bg-white/10'
                    }`}
                >
                  Top Sports
                </button>
                <button
                  onClick={() => setActiveTab('improvements')}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${activeTab === 'improvements'
                      ? 'bg-white text-paralympic-navy'
                      : 'text-white hover:bg-white/10'
                    }`}
                >
                  Rising Stars
                </button>
              </div>

              <Link
                href="/rankings"
                className="inline-flex items-center text-paralympic-navy hover:text-white font-medium transition-colors"
              >
                <span>View All Sports</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right side - Rankings content */}
          <div className="lg:col-span-2">
            {activeTab === 'current' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TOP_SPORTS.map((sport, index) => (
                  <div
                    key={sport.id}
                    className={`bg-white rounded-xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 ${index === 0 ? 'md:col-span-2 bg-gradient-to-r from-yellow-400 to-yellow-500' : ''
                      }`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${index === 0 ? 'bg-white text-yellow-600' :
                          index === 1 ? 'bg-gray-300 text-gray-700' :
                            index === 2 ? 'bg-yellow-600 text-white' :
                              'bg-paralympic-blue text-white'
                        }`}>
                        {sport.rank}
                      </div>

                      {/* Athlete photo */}
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={sport.imageUrl}
                          alt={sport.sport}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${index === 0 ? 'text-white' : 'text-paralympic-navy'}`}>
                          {sport.sport}
                        </h3>
                        <div className="flex items-center mt-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                            {sport.achievement}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/athletes/${sport.sport.toLowerCase().replace(' ', '-')}`}
                      className={`inline-flex items-center mt-4 font-medium text-sm ${index === 0 ? 'text-white hover:text-yellow-200' : 'text-paralympic-blue hover:text-paralympic-green'
                        } transition-colors`}
                    >
                      <span>VIEW FULL PROFILE</span>
                      <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-paralympic-navy mb-6">Latest Improvements</h3>
                <div className="space-y-4">
                  {LATEST_IMPROVEMENTS.map((athlete, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <div className="font-semibold text-paralympic-navy">{athlete.name}</div>
                        <div className="text-sm text-gray-600">{athlete.event}</div>
                      </div>
                      <div className="text-green-600 font-bold">{athlete.achievement}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}