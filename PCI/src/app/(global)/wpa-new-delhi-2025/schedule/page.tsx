// src/app/(global)/wpa-new-delhi-2025/schedule/page.tsx
"use client"

import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    Medal,
    Trophy,
    ArrowLeft,
    Filter,
    Search,
    Download,
    Star
} from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import Link from 'next/link';

// Type definitions
interface ScheduleEvent {
    id: number;
    time: string;
    event: string;
    gender: 'Men' | 'Women' | 'Mixed';
    classification: string;
    status: 'Heats' | 'Semi-Final' | 'Final' | 'Medal Event';
    venue: string;
}

interface DaySchedule {
    date: string;
    day: string;
    fullDate: string;
    events: ScheduleEvent[];
}

const WPASchedulePage: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState('All');

    // Sample schedule data - simple and clear structure
    const scheduleData: DaySchedule[] = [
        {
            date: "27 Sep",
            day: "Friday",
            fullDate: "September 27, 2025",
            events: [
                {
                    id: 1,
                    time: "19:00",
                    event: "Opening Ceremony",
                    gender: "Mixed",
                    classification: "All",
                    status: "Medal Event",
                    venue: "JLN Stadium"
                }
            ]
        },
        {
            date: "28 Sep",
            day: "Saturday",
            fullDate: "September 28, 2025",
            events: [
                {
                    id: 2,
                    time: "09:00",
                    event: "100m T54",
                    gender: "Men",
                    classification: "T54",
                    status: "Heats",
                    venue: "Track"
                },
                {
                    id: 3,
                    time: "09:30",
                    event: "100m T54",
                    gender: "Women",
                    classification: "T54",
                    status: "Heats",
                    venue: "Track"
                },
                {
                    id: 4,
                    time: "10:30",
                    event: "Shot Put F32",
                    gender: "Men",
                    classification: "F32",
                    status: "Final",
                    venue: "Field"
                },
                {
                    id: 5,
                    time: "11:00",
                    event: "Long Jump T63",
                    gender: "Women",
                    classification: "T63",
                    status: "Final",
                    venue: "Field"
                },
                {
                    id: 6,
                    time: "19:00",
                    event: "100m T54",
                    gender: "Men",
                    classification: "T54",
                    status: "Final",
                    venue: "Track"
                }
            ]
        },
        {
            date: "29 Sep",
            day: "Sunday",
            fullDate: "September 29, 2025",
            events: [
                {
                    id: 7,
                    time: "07:00",
                    event: "Marathon T54",
                    gender: "Men",
                    classification: "T54",
                    status: "Final",
                    venue: "Road Course"
                },
                {
                    id: 8,
                    time: "08:00",
                    event: "Marathon T54",
                    gender: "Women",
                    classification: "T54",
                    status: "Final",
                    venue: "Road Course"
                },
                {
                    id: 9,
                    time: "10:00",
                    event: "400m T20",
                    gender: "Men",
                    classification: "T20",
                    status: "Heats",
                    venue: "Track"
                }
            ]
        }
    ];

    const filters = ['All', 'Track', 'Field', 'Road', 'Finals Only'];

    const currentDay = scheduleData[selectedDay];

    const filteredEvents = currentDay?.events.filter(event => {
        if (selectedFilter === 'All') return true;
        if (selectedFilter === 'Track') return event.venue === 'Track';
        if (selectedFilter === 'Field') return event.venue === 'Field';
        if (selectedFilter === 'Road') return event.venue === 'Road Course';
        if (selectedFilter === 'Finals Only') return event.status === 'Final' || event.status === 'Medal Event';
        return true;
    }) ?? [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Final': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Medal Event': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Semi-Final': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Heats': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getGenderColor = (gender: string) => {
        switch (gender) {
            case 'Men': return 'bg-blue-50 text-blue-700';
            case 'Women': return 'bg-pink-50 text-pink-700';
            case 'Mixed': return 'bg-green-50 text-green-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header Section */}
            <section className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    {/* Back Button */}
                    <Link
                        href="/wpa-new-delhi-2025"
                        className="inline-flex items-center gap-2 text-paralympic-blue hover:text-paralympic-navy transition-colors mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm font-medium">Back to Main Page</span>
                    </Link>

                    {/* Page Title */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full mb-4">
                            <Calendar className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-600">Complete Schedule</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                            Delhi 2025 Event Schedule
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            All events, timings, and venues for the World Para Athletics Championships
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <div className="text-xl sm:text-2xl font-bold text-blue-600">9</div>
                            <div className="text-xs sm:text-sm text-blue-600">Competition Days</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                            <div className="text-xl sm:text-2xl font-bold text-green-600">186</div>
                            <div className="text-xs sm:text-sm text-green-600">Medal Events</div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4 text-center">
                            <div className="text-xl sm:text-2xl font-bold text-yellow-600">1000+</div>
                            <div className="text-xs sm:text-sm text-yellow-600">Athletes</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                            <div className="text-xl sm:text-2xl font-bold text-purple-600">100+</div>
                            <div className="text-xs sm:text-sm text-purple-600">Countries</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule Content */}
            <section className="py-8 sm:py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">

                        {/* Day Navigation */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Day</h2>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {scheduleData.map((day, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedDay(index)}
                                        className={`flex-shrink-0 px-4 py-3 rounded-lg border transition-all duration-200 ${
                                            selectedDay === index
                                                ? 'bg-paralympic-blue text-white border-paralympic-blue'
                                                : 'bg-white text-gray-700 border-gray-200 hover:border-paralympic-blue hover:text-paralympic-blue'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div className="font-semibold text-sm">{day.date}</div>
                                            <div className="text-xs opacity-90">{day.day}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Events</h2>
                            <div className="flex gap-2 flex-wrap">
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setSelectedFilter(filter)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            selectedFilter === filter
                                                ? 'bg-paralympic-green text-white'
                                                : 'bg-white text-gray-700 border border-gray-200 hover:border-paralympic-green hover:text-paralympic-green'
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Day Header */}
                        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        {currentDay?.fullDate}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        {filteredEvents.length} events scheduled
                                    </p>
                                </div>
                                {/* <button className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                                    <Download className="h-4 w-4" />
                                    <span className="text-sm">Download Day Schedule</span>
                                </button> */}
                            </div>
                        </div>

                        {/* Events List */}
                        <div className="space-y-3">
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => (
                                    <div key={event.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                            {/* Time */}
                                            <div className="flex items-center gap-2 text-paralympic-blue font-semibold min-w-[80px]">
                                                <Clock className="h-4 w-4" />
                                                <span>{event.time}</span>
                                            </div>

                                            {/* Event Details */}
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                                                    {event.event}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGenderColor(event.gender)}`}>
                                                        {event.gender}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(event.status)}`}>
                                                        {event.status}
                                                    </span>
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                                        {event.classification}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Venue */}
                                            <div className="flex items-center gap-2 text-gray-600 min-w-[120px]">
                                                <MapPin className="h-4 w-4" />
                                                <span className="text-sm">{event.venue}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 mb-2">
                                        <Calendar className="h-12 w-12 mx-auto" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No events found</h3>
                                    <p className="text-gray-600">Try a different filter or select another day</p>
                                </div>
                            )}
                        </div>

                        {/* Information Note */}
                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0">
                                    <Star className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-blue-900 mb-1">Important Notes</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• All times are in Indian Standard Time (IST)</li>
                                        <li>• Schedule may change due to weather or other conditions</li>
                                        <li>• Medal ceremonies follow immediately after finals</li>
                                        <li>• Entry is free for all spectators</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default WPASchedulePage;