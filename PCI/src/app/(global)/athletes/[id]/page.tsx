// src\app\(global)\athletes\[id]\page.tsx
"use client"

import React, { useState } from 'react';
import { ArrowLeft, Trophy, MapPin, Calendar, Star, Medal, Target, TrendingUp, ChevronLeft, ChevronRight, Users, Award, Clock } from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import Link from 'next/link';
import Image from 'next/image';

// Utility function for consistent date formatting
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Type definitions
interface Achievement {
    title: string;
    date: string;
    type: 'gold' | 'silver' | 'bronze';
}

interface Match {
    event: string;
    date: string;
    position: string;
    time: string;
}

interface TrainingMetric {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'stable';
}

interface SocialLinks {
    twitter?: string;
    instagram?: string;
    facebook?: string;
}

interface Player {
    name: string;
    age: number;
    state: string;
    sport: string;
    totalMedals: number;
    goldMedals: number;
    silverMedals: number;
    bronzeMedals: number;
    joinDate: string;
    coachName: string;
    personalBest: string;
    ranking: number;
    profileImage: string;
    achievements: Achievement[];
    recentMatches: Match[];
    trainingMetrics: TrainingMetric[];
    upcomingEvents: string[];
    inspirationalQuote: string;
    socialLinks: SocialLinks;
}

// Component Props Interfaces
interface AthleteNavigationProps {
    currentIndex: number;
    totalAthletes: number;
    onNavigate: (direction: 'prev' | 'next') => void;
}

interface ProfileHeaderProps {
    player: Player;
}

interface StatsCardsProps {
    player: Player;
}

interface MedalBreakdownProps {
    player: Player;
}

interface RecentAchievementsProps {
    achievements: Achievement[];
}

interface RecentPerformanceProps {
    matches: Match[];
}

interface UpcomingEventsProps {
    events: string[];
}

interface AdditionalInfoProps {
    player: Player;
}

interface SimilarAthletesProps {
    athletes: Player[];
    currentIndex: number;
    onAthleteClick: (index: number) => void;
}

// Mock data for multiple athletes
const mockAthletes: Player[] = [
    {
        name: "Rajesh Kumar",
        age: 22,
        state: "Karnataka",
        sport: "Swimming",
        totalMedals: 15,
        goldMedals: 8,
        silverMedals: 4,
        bronzeMedals: 3,
        joinDate: "2020-03-15",
        coachName: "Coach Suresh Mehta",
        personalBest: "1:54.32",
        ranking: 3,
        profileImage: "/assets/dummy-profile.png",
        inspirationalQuote: "Every stroke in the pool is a step closer to my dreams.",
        achievements: [
            { title: "State Champion 2024", date: "2024-06-15", type: "gold" },
            { title: "Regional Runner-up 2024", date: "2024-05-20", type: "silver" },
            { title: "National Qualifier 2023", date: "2023-08-10", type: "bronze" }
        ],
        recentMatches: [
            { event: "State Championship", date: "2024-06-15", position: "1st", time: "1:54.32" },
            { event: "Regional Meet", date: "2024-05-20", position: "2nd", time: "1:55.10" },
            { event: "District Championship", date: "2024-04-18", position: "1st", time: "1:56.45" }
        ],
        trainingMetrics: [
            { label: "Training Hours/Week", value: "25", change: "+5%", trend: "up" },
            { label: "Personal Best", value: "1:54.32", change: "-2.1s", trend: "up" },
            { label: "Competition Readiness", value: "92%", change: "+8%", trend: "up" }
        ],
        upcomingEvents: ["National Championships 2025", "Asian Para Games Trials"],
        socialLinks: {
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Priya Sharma",
        age: 24,
        state: "Maharashtra",
        sport: "Athletics",
        totalMedals: 18,
        goldMedals: 10,
        silverMedals: 5,
        bronzeMedals: 3,
        joinDate: "2019-08-12",
        coachName: "Coach Anita Singh",
        personalBest: "12.45s",
        ranking: 2,
        profileImage: "/assets/dummy-profile.png",
        inspirationalQuote: "Running is about pushing beyond limits.",
        achievements: [
            { title: "National Record Holder", date: "2024-07-10", type: "gold" },
            { title: "Asian Games Silver", date: "2024-04-22", type: "silver" },
            { title: "Commonwealth Champion", date: "2023-09-15", type: "gold" }
        ],
        recentMatches: [
            { event: "National Championships", date: "2024-07-10", position: "1st", time: "12.45s" },
            { event: "Asian Para Games", date: "2024-04-22", position: "2nd", time: "12.58s" },
            { event: "State Meet", date: "2024-03-18", position: "1st", time: "12.67s" }
        ],
        trainingMetrics: [
            { label: "Training Hours/Week", value: "30", change: "+3%", trend: "up" },
            { label: "Personal Best", value: "12.45s", change: "-0.8s", trend: "up" },
            { label: "Competition Readiness", value: "95%", change: "+5%", trend: "up" }
        ],
        upcomingEvents: ["World Championships 2025", "Paralympic Trials"],
        socialLinks: {
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Arjun Patel",
        age: 26,
        state: "Gujarat",
        sport: "Powerlifting",
        totalMedals: 12,
        goldMedals: 6,
        silverMedals: 4,
        bronzeMedals: 2,
        joinDate: "2018-01-20",
        coachName: "Coach Vikram Joshi",
        personalBest: "220kg",
        ranking: 1,
        profileImage: "/assets/dummy-profile.png",
        inspirationalQuote: "Strength comes from determination.",
        achievements: [
            { title: "World Record Holder", date: "2024-08-05", type: "gold" },
            { title: "Paralympic Champion", date: "2024-03-28", type: "gold" },
            { title: "Asian Champion", date: "2023-11-12", type: "gold" }
        ],
        recentMatches: [
            { event: "World Championships", date: "2024-08-05", position: "1st", time: "220kg" },
            { event: "Paralympic Games", date: "2024-03-28", position: "1st", time: "218kg" },
            { event: "Asian Championships", date: "2023-11-12", position: "1st", time: "215kg" }
        ],
        trainingMetrics: [
            { label: "Training Hours/Week", value: "35", change: "+10%", trend: "up" },
            { label: "Personal Best", value: "220kg", change: "+15kg", trend: "up" },
            { label: "Competition Readiness", value: "98%", change: "+3%", trend: "up" }
        ],
        upcomingEvents: ["World Record Attempt", "International Championships"],
        socialLinks: {
            instagram: "#",
            twitter: "#"
        }
    }
];

// Navigation Component
const AthleteNavigation: React.FC<AthleteNavigationProps> = ({ 
    currentIndex, 
    totalAthletes, 
    onNavigate 
}) => {
    return (
        <div className="flex items-center justify-between mb-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <Link href="/athletes">
                <button className="flex items-center gap-2 text-paralympic-navy hover:text-paralympic-blue transition-colors">
                    <ArrowLeft size={20} />
                    Back to Athletes
                </button>
            </Link>

            <div className="flex items-center gap-4">
                <span className="text-paralympic-navy text-sm font-medium">
                    {currentIndex + 1} of {totalAthletes} Athletes
                </span>
                
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onNavigate('prev')}
                        disabled={currentIndex === 0}
                        className="p-2 rounded-lg bg-paralympic-gray hover:bg-paralympic-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    
                    <button
                        onClick={() => onNavigate('next')}
                        disabled={currentIndex === totalAthletes - 1}
                        className="p-2 rounded-lg bg-paralympic-gray hover:bg-paralympic-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Clean Header Component
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ player }) => {
    return (
        <div className="bg-gradient-to-r from-paralympic-blue to-paralympic-navy text-white rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                    <Image
                        src={player.profileImage}
                        alt={player.name}
                        className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg object-cover"
                        width={200}
                        height={200}
                    />
                    <div className="absolute -top-2 -right-2 bg-paralympic-yellow rounded-full p-2">
                        <Star size={16} fill="white" color="white" />
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{player.name}</h1>
                    
                    <div className="flex flex-wrap items-center gap-6 mb-4">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{player.state}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>Age {player.age}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Target size={16} />
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{player.sport}</span>
                        </div>
                    </div>

                    <blockquote className="italic text-white/90 border-l-4 border-paralympic-yellow pl-4">
                        &quot;{player.inspirationalQuote}&quot;
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

// Simple Stats Cards
const StatsCards: React.FC<StatsCardsProps> = ({ player }) => {
    const yearsTraining = new Date().getFullYear() - new Date(player.joinDate).getFullYear();
    const stats = [
        { icon: Trophy, label: "Total Medals", value: player.totalMedals, color: "bg-paralympic-red" },
        { icon: Calendar, label: "Years Training", value: `${yearsTraining} Years`, color: "bg-paralympic-navy" },
        { icon: Target, label: "Personal Best", value: player.personalBest, color: "bg-paralympic-blue" },
        { icon: Users, label: "Sport Category", value: player.sport, color: "bg-gray-600" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                    <div key={index} className={`${stat.color} text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}>
                        <div className="flex items-center justify-between mb-3">
                            <IconComponent size={24} className="opacity-80" />
                        </div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-white/90 text-sm">{stat.label}</div>
                    </div>
                );
            })}
        </div>
    );
};

// Simple Medal Breakdown
const MedalBreakdown: React.FC<MedalBreakdownProps> = ({ player }) => {
    const medals = [
        { type: "Gold", count: player.goldMedals, color: "text-yellow-600", bg: "bg-yellow-50" },
        { type: "Silver", count: player.silverMedals, color: "text-gray-600", bg: "bg-gray-50" },
        { type: "Bronze", count: player.bronzeMedals, color: "text-orange-600", bg: "bg-orange-50" }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-paralympic-navy mb-4 flex items-center gap-2">
                <Trophy size={20} />
                Medal Breakdown
            </h3>
            <div className="space-y-3">
                {medals.map((medal, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${medal.bg}`}>
                        <span className="font-medium text-paralympic-navy">{medal.type} Medals</span>
                        <span className={`text-xl font-bold ${medal.color}`}>{medal.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Clean Achievements
const RecentAchievements: React.FC<RecentAchievementsProps> = ({ achievements }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-paralympic-navy mb-4 flex items-center gap-2">
                <Award size={20} />
                Recent Achievements
            </h3>
            <div className="space-y-3">
                {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-paralympic-gray rounded-lg">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                            achievement.type === 'gold' ? 'bg-yellow-500' :
                            achievement.type === 'silver' ? 'bg-gray-400' : 'bg-orange-500'
                        }`}></div>
                        <div className="flex-1">
                            <div className="font-medium text-paralympic-navy">{achievement.title}</div>
                            <div className="text-sm text-gray-600">{formatDate(achievement.date)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Clean Performance
const RecentPerformance: React.FC<RecentPerformanceProps> = ({ matches }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-paralympic-navy mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                Recent Performance
            </h3>
            <div className="space-y-3">
                {matches.map((match, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-paralympic-gray rounded-lg">
                        <div>
                            <div className="font-medium text-paralympic-navy">{match.event}</div>
                            <div className="text-sm text-gray-600">{formatDate(match.date)}</div>
                        </div>
                        <div className="text-right">
                            <div className={`font-bold ${
                                match.position === '1st' ? 'text-paralympic-yellow' : 
                                match.position === '2nd' ? 'text-gray-600' :
                                'text-orange-600'
                            }`}>
                                {match.position}
                            </div>
                            <div className="text-sm text-gray-600">{match.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Simple Upcoming Events
const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-paralympic-navy mb-4 flex items-center gap-2">
                <Clock size={20} />
                Upcoming Events
            </h3>
            <div className="space-y-2">
                {events.map((event, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-paralympic-gray rounded-lg">
                        <div className="w-2 h-2 bg-paralympic-blue rounded-full"></div>
                        <span className="text-paralympic-navy">{event}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Simple Additional Info
const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ player }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-paralympic-navy mb-4 flex items-center gap-2">
                <Users size={20} />
                Additional Information
            </h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-paralympic-gray rounded-lg">
                    <span className="text-gray-600">Coach</span>
                    <span className="font-medium text-paralympic-navy">{player.coachName}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-paralympic-gray rounded-lg">
                    <span className="text-gray-600">Joined</span>
                    <span className="font-medium text-paralympic-navy">{formatDate(player.joinDate)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-paralympic-gray rounded-lg">
                    <span className="text-gray-600">Sport</span>
                    <span className="font-medium text-paralympic-navy">{player.sport}</span>
                </div>
            </div>
        </div>
    );
};

// Simple Similar Athletes
const SimilarAthletes: React.FC<SimilarAthletesProps> = ({ athletes, currentIndex, onAthleteClick }) => {
    const otherAthletes = athletes.filter((_, index) => index !== currentIndex);

    return (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-paralympic-navy mb-4 flex items-center gap-2">
                <Users size={24} />
                Other Athletes
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
                {otherAthletes.map((athlete, index) => {
                    const originalIndex = athletes.findIndex(a => a.name === athlete.name);
                    return (
                        <div 
                            key={index} 
                            className="bg-paralympic-gray rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer"
                            onClick={() => onAthleteClick(originalIndex)}
                        >
                            <div className="flex items-center gap-3">
                                <Image
                                    src={athlete.profileImage}
                                    alt={athlete.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                    width={60}
                                    height={60}
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-paralympic-navy">{athlete.name}</h3>
                                    <p className="text-sm text-gray-600">{athlete.sport} • {athlete.state}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600">Rank #{athlete.ranking}</div>
                                    <div className="text-sm font-medium text-paralympic-navy">{athlete.totalMedals} medals</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Main Profile Component
const PlayerProfile: React.FC = () => {
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    
    const getCurrentPlayer = (): Player => {
        const player = mockAthletes[currentPlayerIndex];
        if (player) return player;
        
        const firstPlayer = mockAthletes[0];
        if (firstPlayer) return firstPlayer;
        
        return {
            name: "Unknown Player",
            age: 0,
            state: "Unknown",
            sport: "Unknown",
            totalMedals: 0,
            goldMedals: 0,
            silverMedals: 0,
            bronzeMedals: 0,
            joinDate: "2020-01-01",
            coachName: "Unknown Coach",
            personalBest: "N/A",
            ranking: 0,
            profileImage: "/assets/dummy-profile.png",
            achievements: [],
            recentMatches: [],
            trainingMetrics: [],
            upcomingEvents: [],
            inspirationalQuote: "Stay determined.",
            socialLinks: {}
        };
    };
    
    const currentPlayer = getCurrentPlayer();

    const handleNavigation = (direction: 'prev' | 'next'): void => {
        if (direction === 'prev' && currentPlayerIndex > 0) {
            setCurrentPlayerIndex(currentPlayerIndex - 1);
        } else if (direction === 'next' && currentPlayerIndex < mockAthletes.length - 1) {
            setCurrentPlayerIndex(currentPlayerIndex + 1);
        }
    };

    const handleAthleteClick = (index: number): void => {
        if (index >= 0 && index < mockAthletes.length) {
            setCurrentPlayerIndex(index);
        }
    };

    return (
        <div className="min-h-screen bg-paralympic-gray">
            <Navbar />
            
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Navigation */}
                <AthleteNavigation 
                    currentIndex={currentPlayerIndex}
                    totalAthletes={mockAthletes.length}
                    onNavigate={handleNavigation}
                />

                {/* Header */}
                <ProfileHeader player={currentPlayer} />

                {/* Stats Cards */}
                <StatsCards player={currentPlayer} />

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <MedalBreakdown player={currentPlayer} />
                            <RecentAchievements achievements={currentPlayer.achievements} />
                        </div>
                        <RecentPerformance matches={currentPlayer.recentMatches} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <UpcomingEvents events={currentPlayer.upcomingEvents} />
                        <AdditionalInfo player={currentPlayer} />
                    </div>
                </div>

                {/* Other Athletes */}
                <SimilarAthletes 
                    athletes={mockAthletes}
                    currentIndex={currentPlayerIndex}
                    onAthleteClick={handleAthleteClick}
                />

                {/* Footer Navigation */}
                <div className="mt-8 flex items-center justify-between bg-white rounded-lg shadow-md p-4">
                    <button
                        onClick={() => handleNavigation('prev')}
                        disabled={currentPlayerIndex === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-paralympic-blue text-white rounded-lg hover:bg-paralympic-navy disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft size={18} />
                        Previous
                    </button>
                    
                    <div className="text-center">
                        <div className="font-medium text-paralympic-navy">{currentPlayer.name}</div>
                        <div className="text-sm text-gray-600">{currentPlayerIndex + 1} of {mockAthletes.length}</div>
                    </div>
                    
                    <button
                        onClick={() => handleNavigation('next')}
                        disabled={currentPlayerIndex === mockAthletes.length - 1}
                        className="flex items-center gap-2 px-4 py-2 bg-paralympic-blue text-white rounded-lg hover:bg-paralympic-navy disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Next
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default PlayerProfile;