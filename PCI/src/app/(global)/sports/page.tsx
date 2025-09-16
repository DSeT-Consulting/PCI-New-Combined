// src\app\(global)\sports\page.tsx
"use client"

import React, { useState, useRef } from 'react';
import { Flame, Snowflake, Trophy, Calendar, MapPin, Users, Star, type LucideIcon, Search, Target, Award, Medal, Heart } from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';

// Type definitions
interface Sport {
    name: string;
    description: string;
    classifications: string;
    sportImage: string;
}

interface GameSectionProps {
    type: 'Summer' | 'Winter';
    icon: LucideIcon;
    sports: Sport[];
    bgColor: string;
    accentColor: string;
    sectionRef: React.RefObject<HTMLElement>;
}

interface StatItem {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
}

// Hero Section Component
const HeroSection: React.FC<{ onSummerClick: () => void; onWinterClick: () => void }> = ({ onSummerClick, onWinterClick }) => {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-paralympic-green overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/30 rounded-full animate-pulse-slow"></div>
                <div className="absolute top-40 right-32 w-24 h-24 border-2 border-paralympic-yellow/40 rounded-full animate-float"></div>
                <div className="absolute bottom-32 left-40 w-16 h-16 bg-paralympic-red/20 rounded-full animate-bounce-slow"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20 flex items-center min-h-screen">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <div className="mb-8 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-paralympic-yellow to-white bg-clip-text text-transparent">
                            Para Sports India
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Celebrating extraordinary Indian athletes who redefine the limits of human potential through summer and winter Paralympic sports
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 animate-fade-in">
                        <button
                            onClick={onSummerClick}
                            className="group bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
                        >
                            <Flame className="w-5 h-5 text-paralympic-yellow group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">Explore Summer Games</span>
                        </button>
                        <button
                            onClick={onWinterClick}
                            className="group bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
                        >
                            <Snowflake className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">Discover Winter Games</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Statistics Component - Updated for India
const StatsSection: React.FC = () => {
    const stats: StatItem[] = [
        { label: "Summer Sports", value: "22", icon: Flame, color: "text-paralympic-red" },
        { label: "Winter Sports", value: "6", icon: Snowflake, color: "text-paralympic-blue" },
        { label: "Paralympic Medals", value: "31+", icon: Medal, color: "text-paralympic-yellow" },
        { label: "Active Athletes", value: "500+", icon: Heart, color: "text-paralympic-green" }
    ];

    return (
        <section className="py-20 bg-gradient-to-r from-paralympic-gray to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-paralympic-navy mb-4">
                        India Para Sports at a Glance
                    </h2>
                    <p className="text-lg text-paralympic-darkgray max-w-2xl mx-auto">
                        Discover the incredible achievements and growing participation in Paralympic sports across India
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat: StatItem, index: number) => (
                        <div key={index} className="text-center group">
                            <div className="mb-4 flex justify-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-paralympic-navy mb-2">{stat.value}</div>
                            <div className="text-paralympic-darkgray font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Search Component
const SearchSection: React.FC<{ searchTerm: string; onSearchChange: (term: string) => void }> = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="container mx-auto px-4 mb-8">
            <div className="max-w-md mx-auto relative">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-paralympic-darkgray w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search para sports..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-paralympic-blue focus:border-transparent bg-white shadow-sm"
                    />
                </div>
            </div>
        </div>
    );
};

// Game Section Component - Enhanced with images and better design
const GameSection: React.FC<GameSectionProps> = ({ type, icon: Icon, sports, bgColor, accentColor, sectionRef }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredSports = sports.filter((sport: Sport) =>
        sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sport.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section ref={sectionRef} className={`py-20 ${bgColor}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <div className={`w-20 h-20 ${accentColor} rounded-full flex items-center justify-center shadow-lg`}>
                            <Icon className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-paralympic-navy mb-4">
                        {type} Paralympic Games
                    </h2>
                    <p className="text-xl text-paralympic-darkgray max-w-3xl mx-auto mb-8">
                        {type === 'Summer'
                            ? 'Experience the thrill of summer Paralympic sports featuring athletics, swimming, cycling and many more disciplines that showcase incredible athletic prowess.'
                            : 'Witness the grace and power of winter Paralympic sports on snow and ice, where athletes compete in skiing, hockey, and other winter disciplines.'
                        }
                    </p>
                </div>

                <SearchSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSports.map((sport: Sport, index: number) => (
                        <div
                            key={index}
                            className="group cursor-pointer h-full"
                        >
                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-105 group-hover:-translate-y-2 h-full flex flex-col">
                                {/* Sport Image with Creative Icon Overlay */}
                                <div className="relative h-56 overflow-hidden">
                                    {/* Background Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                        style={{ backgroundImage: `url(${sport.sportImage})` }}
                                    ></div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/10 to-black/20"></div>

                                    {/* Creative Icon Placement */}
                                    {/* <div className="absolute inset-0 flex items-center justify-center">
                                        <div className={`${sport.iconBg} p-6 rounded-full shadow-2xl backdrop-blur-sm border-2 border-white/30 group-hover:scale-110 transition-all duration-300`}>
                                        <sport.icon className="w-12 h-12 text-white drop-shadow-lg" />
                                        </div>
                                    </div> */}

                                    {/* Trophy Badge */}
                                    <div className="absolute top-4 right-4">
                                        <div className={`w-10 h-10 ${accentColor} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20`}>
                                            <Trophy className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    {/* Floating Decorative Elements */}
                                    <div className="absolute top-6 left-6 w-3 h-3 bg-white/40 rounded-full animate-pulse-slow shadow-lg"></div>
                                    <div className="absolute bottom-8 left-8 w-2 h-2 bg-paralympic-yellow/80 rounded-full animate-float shadow-md"></div>
                                    <div className="absolute bottom-6 right-8 w-4 h-4 border-2 border-white/60 rounded-full animate-bounce-slow"></div>
                                    <div className="absolute top-1/3 left-4 w-1 h-1 bg-white/50 rounded-full"></div>
                                    <div className="absolute bottom-1/3 right-6 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                                </div>

                                {/* Card Content with Fixed Height */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold text-paralympic-navy mb-3 group-hover:text-paralympic-blue transition-colors">
                                        {sport.name}
                                    </h3>
                                    <p className="text-paralympic-darkgray mb-6 leading-relaxed flex-1">
                                        {sport.description}
                                    </p>

                                    {/* Classifications - Only field shown */}
                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between text-sm gap-4">
                                            <span className="text-paralympic-darkgray font-medium">Classifications:</span>
                                            <span className="font-semibold text-right text-paralympic-navy bg-paralympic-gray px-3 py-1 rounded text-xs">
                                                {sport.classifications}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredSports.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-paralympic-darkgray text-lg">No sports found matching your search.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

// CTA Section Component
const CTASection: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-paralympic-navy to-paralympic-blue relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-40 h-40 border border-white/30 rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 border border-paralympic-yellow/40 rounded-full animate-float"></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Join the Para Sports Movement in India
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
                    Be part of India&apos;s growing Paralympic community. Discover training programs, volunteer opportunities,
                    and ways to support our incredible para-athletes.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="bg-paralympic-yellow text-paralympic-navy px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg">
                        Find Training Centers
                    </button>
                    <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all duration-300">
                        Support Athletes
                    </button>
                </div>
            </div>
        </section>
    );
};

// Main Para Sports Page Component
const ParaSportsPage: React.FC = () => {
    const summerSectionRef = useRef<HTMLElement>(null);
    const winterSectionRef = useRef<HTMLElement>(null);

    const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const summerSports: Sport[] = [
        {
            name: "Blind Football",
            description: "A modified version of football for athletes with visual impairments, using a ball with a noise-making device and blindfolds for fairness.",
            classifications: "B1",
            sportImage: "/assets/sports/summer/Blind-Football.jpg",
        },
        {
            name: "Boccia",
            description: "A precision ball sport similar to bocce, designed for athletes with severe physical disabilities affecting motor skills.",
            classifications: "BC1–BC4",
            sportImage: "/assets/sports/summer/Boccia.jpg",
        },
        {
            name: "Goalball",
            description: "A team sport for visually impaired athletes where players try to throw a ball embedded with bells into the opponent’s goal.",
            classifications: "B1–B3",
            sportImage: "/assets/sports/summer/Goalball.jpg",
        },
        {
            name: "Para Archery",
            description: "Adapted archery for athletes with physical impairments, featuring recurve and compound bow categories.",
            classifications: "W1, Open",
            sportImage: "/assets/sports/summer/Para-Archery.jpg",
        },
        {
            name: "Para Athletics",
            description: "Track and field events including sprints, distance running, jumping, and throwing disciplines adapted for various classifications.",
            classifications: "T11–T64, F11–F64",
            sportImage: "/assets/sports/summer/Para-Athletics.jpg",
        },
        {
            name: "Para Badminton",
            description: "Competitive badminton adapted for players with physical impairments including wheelchair and standing categories.",
            classifications: "WH1–WH2, SL3–SL4, SU5, SH6",
            sportImage: "/assets/sports/summer/Para-Badminton.jpg",
        },
        {
            name: "Para Canoe",
            description: "Canoeing adapted for athletes with physical impairments, using kayak (K) and va’a (V) boats.",
            classifications: "KL1–KL3, VL1–VL3",
            sportImage: "/assets/sports/summer/Para-Canoe.jpg",
        },
        {
            name: "Para Cycling",
            description: "Includes road and track cycling for athletes with physical or visual impairments, using bicycles, tricycles, handcycles, and tandems.",
            classifications: "C1–C5, T1–T2, H1–H5, B",
            sportImage: "/assets/sports/summer/Para-Cycling.jpg",
        },
        {
            name: "Para Equestrian",
            description: "Dressage competition for athletes with physical impairments, judged on skill, accuracy, and harmony with the horse.",
            classifications: "Grade I–V",
            sportImage: "/assets/sports/summer/Para-Equestrian.jpg",
        },
        {
            name: "Para Judo",
            description: "Judo competition for visually impaired athletes focusing on grip, balance, and throwing techniques.",
            classifications: "B1–B3",
            sportImage: "/assets/sports/summer/Para-Judo.jpg",
        },
        {
            name: "Para Powerlifting",
            description: "Bench press competition for athletes with lower limb impairments, testing upper body strength.",
            classifications: "Weight categories",
            sportImage: "/assets/sports/summer/Para-Powerlifting.jpg",
        },
        {
            name: "Para Rowing",
            description: "Rowing races on water for athletes with physical, visual, or intellectual impairments using fixed-seat boats.",
            classifications: "PR1–PR3",
            sportImage: "/assets/sports/summer/Para-Rowing.jpg",
        },
        {
            name: "Para Swimming",
            description: "Swimming races for athletes with physical, visual, and intellectual impairments, with a wide range of strokes and distances.",
            classifications: "S1–S14, SB1–SB14, SM1–SM14",
            sportImage: "/assets/sports/summer/Para-Swimming.jpg",
        },
        {
            name: "Para Table Tennis",
            description: "Table tennis matches for athletes with physical or intellectual impairments, played in standing or wheelchair categories.",
            classifications: "Class 1–11",
            sportImage: "/assets/sports/summer/Para-Table-Tennis.jpg",
        },
        {
            name: "Para Taekwondo",
            description: "Sparring-based martial art for athletes with limb impairments, focusing on kicks and upper-body strikes.",
            classifications: "K41–K44",
            sportImage: "/assets/sports/summer/Para-Taekwondo.jpg",
        },
        {
            name: "Para Triathlon",
            description: "Multi-discipline event combining swimming, cycling, and running for athletes with various impairments.",
            classifications: "PTWC, PTS2–PTS5, PTVI",
            sportImage: "/assets/sports/summer/Para-Triathlon.jpg",
        },
        {
            name: "Shooting Para Sport",
            description: "Target shooting sport using rifles and pistols for athletes with physical impairments, focusing on precision and control.",
            classifications: "SH1, SH2",
            sportImage: "/assets/sports/summer/Shooting-Para-Sport.jpg",
        },
        {
            name: "Sitting Volleyball",
            description: "A fast-paced team sport played on a smaller court with a lower net, designed for athletes with lower limb impairments.",
            classifications: "VS1, VS2",
            sportImage: "/assets/sports/summer/Sitting-Volleyball.jpg",
        },
        {
            name: "Wheelchair Basketball",
            description: "Adapted basketball played in wheelchairs, emphasizing speed, strategy, and upper body coordination.",
            classifications: "1.0–4.5 (point system)",
            sportImage: "/assets/sports/summer/Wheelchair-Basketball.jpg",
        },
        {
            name: "Wheelchair Fencing",
            description: "Fencing for athletes in wheelchairs, using foil, épée, and sabre to score touches on the opponent.",
            classifications: "Category A, B, C",
            sportImage: "/assets/sports/summer/Wheelchair-Fencing.jpg",
        },
        {
            name: "Wheelchair Rugby",
            description: "A full-contact sport combining elements of rugby, basketball, and handball for quadriplegic athletes.",
            classifications: "0.5–3.5 (point system)",
            sportImage: "/assets/sports/summer/Wheelchair-Rugby.jpg",
        },
        {
            name: "Wheelchair Tennis",
            description: "Tennis adapted for wheelchair athletes, allowing two bounces of the ball before returning.",
            classifications: "Open, Quad",
            sportImage: "/assets/sports/summer/Wheelchair-Tennis.jpg",
        }
    ];

    const winterSports: Sport[] = [
        {
            name: "Para Alpine Skiing",
            description: "Downhill skiing events including slalom, giant slalom, and super-G, adapted for athletes with physical and visual impairments.",
            classifications: "Standing, Sitting, Visually Impaired (B1–B3)",
            sportImage: "/assets/sports/winter/Para-Alpine-Skiing.jpg",
        },
        {
            name: "Para Snowboard",
            description: "Snowboard cross and banked slalom events for athletes with lower limb impairments, emphasizing agility and speed.",
            classifications: "SB-LL1, SB-LL2, SB-UL",
            sportImage: "/assets/sports/winter/Para-Snowboard.jpg",
        },
        {
            name: "Para Ice Hockey",
            description: "Team sport similar to ice hockey, played on sledges by athletes with lower limb impairments using two sticks for movement and shooting.",
            classifications: "Minimum disability required",
            sportImage: "/assets/sports/winter/Para-Ice-Hockey.jpg",
        },
        {
            name: "Para Nordic Skiing",
            description: "Includes cross-country skiing and biathlon for athletes with physical or visual impairments, using standing, sitting, or guided techniques.",
            classifications: "LW1-LW12, B1-B3",
            sportImage: "/assets/sports/winter/Para-Nodic-Skiing.jpg",
        },
        {
            name: "Wheelchair Curling",
            description: "Team sport where athletes in wheelchairs slide stones on ice towards a target area, without sweeping.",
            classifications: "Wheelchair users with lower limb impairments",
            sportImage: "/assets/sports/winter/Wheelchair-Curling.jpg",
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <HeroSection
                onSummerClick={() => scrollToSection(summerSectionRef)}
                onWinterClick={() => scrollToSection(winterSectionRef)}
            />
            <StatsSection />
            <GameSection
                type="Summer"
                icon={Flame}
                sports={summerSports}
                bgColor="bg-gradient-to-br from-white to-paralympic-gray"
                accentColor="bg-paralympic-red"
                sectionRef={summerSectionRef}
            />
            <GameSection
                type="Winter"
                icon={Snowflake}
                sports={winterSports}
                bgColor="bg-gradient-to-br from-paralympic-gray to-white"
                accentColor="bg-paralympic-blue"
                sectionRef={winterSectionRef}
            />
            <CTASection />
            <Footer />
        </div>
    );
};

export default ParaSportsPage;