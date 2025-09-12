'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RECENT_RECORDS = [
    {
        id: 1,
        type: 'World Record',
        athlete: 'Maria Santos',
        country: 'ESP',
        event: 'Swimming 100m Freestyle S12',
        record: '56.23s',
        improvement: '-0.45s',
        date: '2025-03-15',
        imageUrl: '/api/placeholder/300/200',
        color: 'from-yellow-400 to-orange-500',
    },
    {
        id: 2,
        type: 'Paralympic Record',
        athlete: 'David Chen',
        country: 'CHN',
        event: 'Shot Put F37',
        record: '15.67m',
        improvement: '+0.23m',
        date: '2025-03-12',
        imageUrl: '/api/placeholder/300/200',
        color: 'from-green-400 to-emerald-600',
    },
    {
        id: 3,
        type: 'Continental Record',
        athlete: 'Ahmed Hassan',
        country: 'EGY',
        event: 'Javelin Throw F54',
        record: '28.45m',
        improvement: '+1.12m',
        date: '2025-03-08',
        imageUrl: '/api/placeholder/300/200',
        color: 'from-blue-400 to-cyan-600',
    },
];

export default function RecordsAchievementsBanner() {
    const [activeRecord, setActiveRecord] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveRecord((prev) => (prev + 1) % RECENT_RECORDS.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentRecord = RECENT_RECORDS[activeRecord];

    return (
        <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-paralympic-blue/20 to-paralympic-green/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-paralympic-red/20 to-paralympic-yellow/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Left side - Record info */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                                <svg className="w-5 h-5 text-paralympic-yellow mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-white font-semibold">LATEST ACHIEVEMENTS</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                New Records Set
                            </h2>
                        </div>

                        {/* Current record highlight */}
                        {
                            currentRecord && (
                                <div className={`bg-gradient-to-r ${currentRecord.color} rounded-2xl p-6 mb-6 transform transition-all duration-1000`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                            <span className="text-white font-semibold text-sm">{currentRecord.type}</span>
                                        </div>
                                        <div className="text-white/80 text-sm">
                                            {new Date(currentRecord.date).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {currentRecord.athlete}
                                            </h3>
                                            <p className="text-white/90 mb-3">
                                                {currentRecord.country} • {currentRecord.event}
                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-white/20 rounded-lg px-4 py-2">
                                                    <div className="text-white/80 text-xs">New Record</div>
                                                    <div className="text-white font-bold text-xl">{currentRecord.record}</div>
                                                </div>
                                                <div className="flex items-center text-white">
                                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                    </svg>
                                                    <span className="font-semibold">{currentRecord.improvement}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative h-32 rounded-lg overflow-hidden">
                                            <Image
                                                src={currentRecord.imageUrl}
                                                alt={currentRecord.athlete}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* Record indicators */}
                        <div className="flex space-x-2 mb-6">
                            {RECENT_RECORDS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveRecord(index)}
                                    className={`h-2 rounded-full transition-all ${index === activeRecord
                                            ? 'bg-white w-8'
                                            : 'bg-white/40 w-2 hover:bg-white/60'
                                        }`}
                                    aria-label={`Go to record ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right side - All records list */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Recent Achievements</h3>
                            <div className="space-y-4">
                                {RECENT_RECORDS.map((record, index) => (
                                    <div
                                        key={record.id}
                                        className={`p-4 rounded-lg cursor-pointer transition-all ${index === activeRecord
                                                ? 'bg-white/20 border border-white/30'
                                                : 'bg-white/5 hover:bg-white/10'
                                            }`}
                                        onClick={() => setActiveRecord(index)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white font-semibold text-sm">{record.athlete}</span>
                                            <span className="text-white/60 text-xs">{record.country}</span>
                                        </div>
                                        <div className="text-white/80 text-sm mb-1">{record.event}</div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-white font-bold">{record.record}</span>
                                            <span className="text-green-400 text-sm">{record.improvement}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/records"
                                className="block mt-6 text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                            >
                                View All Records
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}