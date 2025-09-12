// pages/athletes/athletesPage.tsx
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import AthletesHeroBanner from '~/components/athletes/AthletesHeroBanner';
import SearchAndFilters from '~/components/athletes/SearchAndFilters';
import AthleteCard from '~/components/athletes/AthleteCard';
import AthleteTable from '~/components/athletes/AthleteTable';
import MedalStatsSection from '~/components/athletes/MedalStatsSection';
import StateMedalStats from '~/components/athletes/StateMedalStats';
import UpcomingEvents from '~/components/athletes/UpcomingEvents';
import SupportSection from '~/components/athletes/SupportSection';
import TrainingCenters from '~/components/athletes/TrainingCenters';
import Pagination from '~/components/athletes/Pagination';

// Type definitions
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
  debut: number;
  achievements: string[];
  classification: string;
  personalBest: string;
  coach: string;
  trainingCenter: string;
}

// Sample data for Indian Paralympic athletes
const INDIAN_PARALYMPIC_ATHLETES: Athlete[] = [
  {
    id: 1,
    name: 'Player Name',
    sport: 'Sport Name',
    category: 'xyz',
    state: 'State',
    image: '/assets/home/higlights1.png',
    medals: { gold: 1, silver: 1, bronze: 1 },
    totalMedals: 3,
    age: 20,
    debut: 2000,
    achievements: ['Achievement Number - 1', 'Achievement Number - 2'],
    classification: 'SH1',
    personalBest: '249.6 points',
    coach: 'Coach Name',
    trainingCenter: 'Training Center Name'
  },
  {
    id: 2,
    name: 'Player Name 2',
    sport: 'Sport Name 2',
    category: 'xyz',
    state: 'State 2',
    image: '/assets/home/higlights1.png',
    medals: { gold: 2, silver: 1, bronze: 0 },
    totalMedals: 3,
    age: 25,
    debut: 2004,
    achievements: ['Achievement Number - 1', 'Achievement Number - 2'],
    classification: 'SH1',
    personalBest: '249.6 points',
    coach: 'Coach Name',
    trainingCenter: 'Training Center Name'
  },
  {
    id: 3,
    name: 'Player Name 3',
    sport: 'Sport Name 3',
    category: 'xyz',
    state: 'State 3',
    image: '/assets/home/higlights1.png',
    medals: { gold: 0, silver: 2, bronze: 1 },
    totalMedals: 3,
    age: 22,
    debut: 2008,
    achievements: ['Achievement Number - 1', 'Achievement Number - 2'],
    classification: 'SH1',
    personalBest: '249.6 points',
    coach: 'Coach Name',
    trainingCenter: 'Training Center Name'
  },
  {
    id: 4,
    name: 'Player Name 4',
    sport: 'Sport Name 4',
    category: 'xyz',
    state: 'State 4',
    image: '/assets/home/higlights1.png',
    medals: { gold: 1, silver: 0, bronze: 2 },
    totalMedals: 3,
    age: 28,
    debut: 2012,
    achievements: ['Achievement Number - 1', 'Achievement Number - 2'],
    classification: 'SH1',
    personalBest: '249.6 points',
    coach: 'Coach Name',
    trainingCenter: 'Training Center Name'
  },
  {
    id: 5,
    name: 'Player Name 5',
    sport: 'Sport Name 5',
    category: 'xyz',
    state: 'State 5',
    image: '/assets/home/higlights1.png',
    medals: { gold: 0, silver: 1, bronze: 1 },
    totalMedals: 2,
    age: 24,
    debut: 2016,
    achievements: ['Achievement Number - 1', 'Achievement Number - 2'],
    classification: 'SH1',
    personalBest: '249.6 points',
    coach: 'Coach Name',
    trainingCenter: 'Training Center Name'
  },
  {
    id: 6,
    name: 'Player Name 6',
    sport: 'Sport Name 6',
    category: 'xyz',
    state: 'State 6',
    image: '/assets/home/higlights1.png',
    medals: { gold: 2, silver: 0, bronze: 0 },
    totalMedals: 2,
    age: 26,
    debut: 2020,
    achievements: ['Achievement Number - 1', 'Achievement Number - 2'],
    classification: 'SH1',
    personalBest: '249.6 points',
    coach: 'Coach Name',
    trainingCenter: 'Training Center Name'
  },
  {
    id: 7,
    name: 'Player Name 7',
    sport: 'Sport Name 7',
    category: 'xyz',
    state: 'State 7',
    image: '/assets/home/higlights1.png',
    medals: { gold: 1, silver: 1, bronze: 0 },
    totalMedals: 2,
    age: 23,
    debut: 2021,
    achievements: ['Achievement Number - 1', 'Achievement Number - 2'],
    classification: 'SH1',
    personalBest: '249.6 points',
    coach: 'Coach Name',
    trainingCenter: 'Training Center Name'
  },
  {
    id: 8,
    name: 'Player Name 8',
    sport: 'Sport Name 8',
    category: 'xyz',
    state: 'State 8',
    image: '/assets/home/higlights1.png',
    medals: { gold: 0, silver: 0, bronze: 1 },
    totalMedals: 1,
    age: 21,
    debut: 2021,
    achievements: ['Achievement Number - 1', 'Achievement Number - 2'],
    classification: 'SH1',
    personalBest: '249.6 points',
    coach: 'Coach Name',
    trainingCenter: 'Training Center Name'
  }
];

// Medal statistics by state
const STATE_MEDAL_STATS = {
  'State Name 1': { gold: 2, silver: 1, bronze: 1, total: 4 },
  'State Name 2': { gold: 1, silver: 2, bronze: 0, total: 3 },
  'State Name 3': { gold: 0, silver: 1, bronze: 2, total: 3 },
  'State Name 4': { gold: 1, silver: 0, bronze: 1, total: 2 },
  'State Name 5': { gold: 0, silver: 1, bronze: 1, total: 2 },
  'State Name 6': { gold: 1, silver: 0, bronze: 0, total: 1 },
  'State Name 7': { gold: 0, silver: 1, bronze: 0, total: 1 },
  'State Name 8': { gold: 0, silver: 0, bronze: 1, total: 1 },
};

const UPCOMING_EVENTS = [
  { name: 'Event Name-1 Goes Here', location: 'Location, Country', date: '2026-05-09' },
  { name: 'Event Name-2 Goes Here', location: 'Location, Country', date: '2024-08-28' },
  { name: 'Event Name-3 Goes Here', location: 'Location, Country', date: '2025-07-15' }
];

function AthletesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [selectedState, setSelectedState] = useState('All States');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const athletesPerPage = 8;

  // Filter and sort athletes
  const filteredAndSortedAthletes = useMemo(() => {
    const filtered = INDIAN_PARALYMPIC_ATHLETES.filter(athlete => {
      const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.sport.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSport = selectedSport === 'All Sports' || athlete.sport === selectedSport;
      const matchesState = selectedState === 'All States' || athlete.state === selectedState;

      return matchesSearch && matchesSport && matchesState;
    });

    // Sort athletes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'medals-desc':
          return b.totalMedals - a.totalMedals;
        case 'medals-asc':
          return a.totalMedals - b.totalMedals;
        case 'age':
          return a.age - b.age;
        case 'state':
          return a.state.localeCompare(b.state);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedSport, selectedState, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedAthletes.length / athletesPerPage);
  const startIndex = (currentPage - 1) * athletesPerPage;
  const currentAthletes = filteredAndSortedAthletes.slice(startIndex, startIndex + athletesPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSport, selectedState, sortBy]);

  // Calculate total medals
  const totalMedals = INDIAN_PARALYMPIC_ATHLETES.reduce((acc, athlete) => ({
    gold: acc.gold + athlete.medals.gold,
    silver: acc.silver + athlete.medals.silver,
    bronze: acc.bronze + athlete.medals.bronze,
    total: acc.total + athlete.totalMedals
  }), { gold: 0, silver: 0, bronze: 0, total: 0 });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <AthletesHeroBanner 
          totalMedals={totalMedals}
          totalAthletes={INDIAN_PARALYMPIC_ATHLETES.length}
        />

        {/* Medal Stats Section */}
        <MedalStatsSection 
          totalMedals={totalMedals}
          totalAthletes={INDIAN_PARALYMPIC_ATHLETES.length}
        />

        {/* Search and Filter Section */}
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          resultsCount={currentAthletes.length}
          totalCount={filteredAndSortedAthletes.length}
        />

        {/* Athletes Display */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {currentAthletes.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-paralympic-navy mb-2">No athletes found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentAthletes.map(athlete => (
                  <AthleteCard key={athlete.id} athlete={athlete} />
                ))}
              </div>
            ) : (
              <AthleteTable athletes={currentAthletes} />
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>

        {/* State-wise Medal Distribution */}
        <StateMedalStats stateMedalStats={STATE_MEDAL_STATS} />

        {/* Upcoming Events for Indian Athletes */}
        <UpcomingEvents events={UPCOMING_EVENTS} />

        {/* Support Our Athletes */}
        <SupportSection />

        {/* Training Centers Across India */}
        <TrainingCenters />

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-paralympic-blue via-purple-600 to-paralympic-blue">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Discover More Stories
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Explore individual athlete journeys, upcoming events, and ways to support Team India&apos;s Paralympic dreams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="bg-white text-paralympic-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-paralympic-gray transition-all duration-300 transform hover:scale-105"
              >
                View Events
              </Link>
              <Link
                href="/news"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-paralympic-blue transition-all duration-300 transform hover:scale-105"
              >
                Latest News
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default AthletesPage;