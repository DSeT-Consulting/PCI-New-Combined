"use client"

import React from 'react';
import {
    Calendar,
    MapPin,
    Trophy,
    Users,
    Globe,
    ExternalLink,
    Accessibility,
    ArrowLeft,
    Clock,
    Star,
    Info
} from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import Link from 'next/link';

// Constants for championship information
const CHAMPIONSHIP_INFO = {
    title: "New Delhi 2025 World Para Athletics Championships",
    venue: "Jawaharlal Nehru (JLN) Stadium",
    location: "New Delhi, India",
    competitionDates: "27 September to 5 October 2025",
    classificationDates: "23-26 September 2025",
    edition: "12th",
    athletes: "1,000+",
    medalEvents: 186,
    menEvents: 101,
    womenEvents: 84,
    mixedEvents: 1,
    seatingCapacity: "60,000",
    impairmentTypes: ["Physical Impairment", "Intellectual Impairment", "Vision Impairment"]
};

// Page Header Component
const PageHeader: React.FC = () => (
    <section className="relative bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-purple-900 text-white py-12 sm:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-paralympic-yellow rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-paralympic-green rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-paralympic-red rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Back Button */}
            <Link href="/wpa-new-delhi-2025" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to Overview</span>
            </Link>

            <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <Trophy className="h-4 w-4 text-paralympic-yellow" />
                    <span className="font-medium text-sm">Competition Information</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Competition
                    <span className="block text-paralympic-yellow">Information</span>
                </h1>

                <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                    Comprehensive details about the New Delhi 2025 World Para Athletics Championships, including venue information, event structure, and historical significance.
                </p>
            </div>
        </div>
    </section>
);

// Quick Stats Component
const QuickStats: React.FC = () => (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-3xl font-bold text-paralympic-blue mb-2">{CHAMPIONSHIP_INFO.medalEvents}</div>
                    <div className="text-sm text-gray-600">Medal Events</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-3xl font-bold text-paralympic-green mb-2">{CHAMPIONSHIP_INFO.athletes}</div>
                    <div className="text-sm text-gray-600">Athletes</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-3xl font-bold text-paralympic-red mb-2">100+</div>
                    <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-3xl font-bold text-purple-600 mb-2">9</div>
                    <div className="text-sm text-gray-600">Days</div>
                </div>
            </div>
        </div>
    </section>
);

// Event Details Component
const EventDetails: React.FC = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Competition Details */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-paralympic-blue/5 to-paralympic-green/5 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Calendar className="h-6 w-6 text-paralympic-blue" />
                            Event Details
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-paralympic-blue/10 rounded-lg">
                                    <Calendar className="h-5 w-5 text-paralympic-blue" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Competition Dates</div>
                                    <div className="text-gray-600">{CHAMPIONSHIP_INFO.competitionDates}</div>
                                    <div className="text-sm text-gray-500 mt-1">9 days of competition</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-paralympic-green/10 rounded-lg">
                                    <MapPin className="h-5 w-5 text-paralympic-green" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Venue</div>
                                    <div className="text-gray-600">{CHAMPIONSHIP_INFO.venue}</div>
                                    <div className="text-sm text-gray-500 mt-1">{CHAMPIONSHIP_INFO.location}</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-paralympic-red/10 rounded-lg">
                                    <Trophy className="h-5 w-5 text-paralympic-red" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Medal Events</div>
                                    <div className="text-gray-600">{CHAMPIONSHIP_INFO.medalEvents} total</div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {CHAMPIONSHIP_INFO.menEvents} men's • {CHAMPIONSHIP_INFO.womenEvents} women's • {CHAMPIONSHIP_INFO.mixedEvents} mixed
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <Users className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Expected Participation</div>
                                    <div className="text-gray-600">Over {CHAMPIONSHIP_INFO.athletes} athletes</div>
                                    <div className="text-sm text-gray-500 mt-1">From 100+ countries worldwide</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-paralympic-yellow/5 to-orange-100/50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <MapPin className="h-6 w-6 text-orange-600" />
                            Venue Information
                        </h3>
                        <p className="text-gray-700 mb-6">
                            The JLN Stadium was constructed to host the Asian Games in 1982 and later renovated and upgraded for hosting the 2010 Commonwealth Games. The venue has a seating capacity to accommodate {CHAMPIONSHIP_INFO.seatingCapacity} spectators and is maintained by the Sports Authority of India on behalf of the Ministry of Sports and Youth Affairs.
                        </p>
                        <div className="bg-white/60 rounded-xl p-4 mb-4">
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="font-semibold text-gray-900">Capacity</div>
                                    <div className="text-gray-600">{CHAMPIONSHIP_INFO.seatingCapacity} spectators</div>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Built</div>
                                    <div className="text-gray-600">1982 (Renovated 2010)</div>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Managed by</div>
                                    <div className="text-gray-600">Sports Authority of India</div>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Track</div>
                                    <div className="text-gray-600">World Athletics certified</div>
                                </div>
                            </div>
                        </div>
                        <Link href="https://sportsauthorityofindia.nic.in/sai/stadiaJln" target='_blank'>
                            <div className="flex items-center gap-2 text-paralympic-blue hover:text-paralympic-navy font-semibold transition-colors">
                                <ExternalLink className="h-4 w-4" />
                                <span>Learn more about the venue</span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Historical Context */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Star className="h-6 w-6 text-purple-600" />
                            Historical Significance
                        </h3>
                        <div className="space-y-4">
                            <p className="text-gray-700">
                                This will be the <strong>{CHAMPIONSHIP_INFO.edition} edition</strong> of the World Para Athletics Championships and the <strong>largest Para sport event ever held in India</strong>.
                            </p>
                            <p className="text-gray-700">
                                Asia has hosted the World Championships on four occasions: Doha 2015 in Qatar, Dubai 2019 in the United Arab Emirates, and Kobe 2024 in Japan. New Delhi 2025 continues this proud tradition.
                            </p>
                        </div>

                        <div className="bg-white/60 rounded-xl p-6 mt-6">
                            <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div>
                                    <div className="text-lg font-semibold text-gray-900 mb-2">Did you know?</div>
                                    <p className="text-gray-700">
                                        The competition programme will feature <strong>15 more medal events</strong> than at the last edition of the championships in Kobe, making it the most comprehensive World Para Athletics Championships to date.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Accessibility className="h-6 w-6 text-paralympic-green" />
                            Impairment Types
                        </h3>
                        <p className="text-gray-700 mb-6">
                            The championships will feature athletes competing across three main impairment categories, each with their own classification system to ensure fair competition.
                        </p>
                        <div className="space-y-4">
                            {CHAMPIONSHIP_INFO.impairmentTypes.map((type: string, index: number) => (
                                <div key={index} className="flex items-center gap-4 bg-white/60 rounded-lg p-4">
                                    <div className="p-2 bg-paralympic-green/10 rounded-lg">
                                        <Accessibility className="h-5 w-5 text-paralympic-green" />
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-800">{type}</span>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {index === 0 && "Athletes with limb deficiencies, muscle weakness, or joint restrictions"}
                                            {index === 1 && "Athletes with intellectual impairments affecting cognitive function"}
                                            {index === 2 && "Athletes who are blind or have visual impairments"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Globe className="h-6 w-6 text-orange-600" />
                            Global Impact
                        </h3>
                        <p className="text-gray-700 mb-6">
                            This championship will showcase the incredible athletic abilities of Para athletes to a global audience, promoting inclusion and inspiring millions worldwide.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/60 rounded-lg p-4">
                                <div className="font-semibold text-gray-900 mb-2">Broadcasting</div>
                                <div className="text-sm text-gray-600">Global television and digital coverage reaching millions of viewers</div>
                            </div>
                            <div className="bg-white/60 rounded-lg p-4">
                                <div className="font-semibold text-gray-900 mb-2">Legacy</div>
                                <div className="text-sm text-gray-600">Inspiring next generation of Para athletes across Asia</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Related Links Component
const RelatedLinks: React.FC = () => (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Related Information</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <Link href="/wpa-new-delhi-2025/timeline" className="block">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Clock className="h-8 w-8 text-paralympic-red mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Timeline & Deadlines</h3>
                        <p className="text-gray-600 text-sm">Important dates and entry deadlines</p>
                    </div>
                </Link>
                <Link href="/wpa-new-delhi-2025/classification" className="block">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Users className="h-8 w-8 text-paralympic-green mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Classification</h3>
                        <p className="text-gray-600 text-sm">Classification requirements and process</p>
                    </div>
                </Link>
                <Link href="/wpa-new-delhi-2025/documents" className="block">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <ExternalLink className="h-8 w-8 text-purple-600 mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Documents</h3>
                        <p className="text-gray-600 text-sm">Access qualification criteria and guides</p>
                    </div>
                </Link>
                <Link href="/contact" className="block">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <ExternalLink className="h-8 w-8 text-orange-600 mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Support</h3>
                        <p className="text-gray-600 text-sm">Get help with team questions</p>
                    </div>
                </Link>
            </div>
        </div>
    </section>
);

// Main Component
const CompetitionInfoPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <PageHeader />
            <QuickStats />
            <EventDetails />
            <RelatedLinks />
            <Footer />
        </div>
    );
};

export default CompetitionInfoPage;