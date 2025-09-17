// src\app\(global)\wpa-new-delhi-2025\page.tsx
"use client"

import React, { useState } from 'react';
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Medal,
    Download,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Trophy,
    Globe,
    Heart,
    Star,
    ArrowRight,
    Info,
    User,
    Accessibility,
    FileText,
    Link as LinkIcon,
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    Volume2,
    Maximize,
    Eye,
    Camera
} from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import Image from 'next/image';
import Link from 'next/link';

// Type definitions
interface TimelineEvent {
    date: string;
    title: string;
    description?: string;
    type: 'qualification' | 'entry' | 'deadline' | 'invitation' | 'system' | 'confirmation' | 'payment';
}

interface ClassificationRequirement {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

interface KeyDocument {
    title: string;
    description: string;
    type: string;
    link: string;
    isNew?: boolean;
}

// Constants for easy management
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

const TIMELINE_EVENTS: TimelineEvent[] = [
    {
        date: "01 January 2024",
        title: "Start of the qualification period for athletes to achieve MES performances",
        type: "qualification"
    },
    {
        date: "17 February 2025",
        title: "Start date to submit Preliminary Entry by Number",
        description: "WPA appreciates the cooperation of teams to provide a realistic estimate of team size",
        type: "entry"
    },
    {
        date: "14 March 2025",
        title: "Deadline to submit Preliminary Entry by Number",
        type: "deadline"
    },
    {
        date: "02 June 2025",
        title: "Start date to apply for a Direct Invitation",
        type: "invitation"
    },
    {
        date: "02 June 2025",
        title: "Opening of Online Entry System for Entry by Number",
        description: "The correct Entry by Number data is important to allow accurate planning for the Championships services and programme",
        type: "system"
    },
    {
        date: "07 July 2025",
        title: "Deadline for Entry by Number",
        description: "NPCs will be invoiced based on the number provided at this entry deadline. No reimbursements allowed after this deadline",
        type: "deadline"
    },
    {
        date: "08 July 2025",
        title: "Opening of Online Entry System for Entry by Name",
        type: "system"
    },
    {
        date: "03 August 2025",
        title: "End of qualification period for athletes to achieve MES performances",
        type: "qualification"
    },
    {
        date: "04 August 2025",
        title: "Deadline to apply for a Direct Invitation",
        type: "deadline"
    },
    {
        date: "06 August 2025",
        title: "Deadline for WPA to confirm Direct Invitations approvals to NPCs",
        type: "confirmation"
    },
    {
        date: "08 August 2025",
        title: "Deadline for Online Entry by Name (final entry deadline)",
        description: "No changes in the entries will be accepted after this date",
        type: "deadline"
    },
    {
        date: "08 September 2025",
        title: "Deadline for Competition Fee Payment",
        type: "payment"
    }
];

const KEY_DOCUMENTS: KeyDocument[] = [
    {
        title: "Qualification Criteria",
        description: "Official qualification criteria for the championships",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-02/New%20Delhi%202025_Qualification%20Criteria%20and%20Event%20Programme.pdf"
    },
    {
        title: "Medal Event Programme",
        description: "Complete information about the medal event programme",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-02/New%20Delhi%202025%20World%20Para%20Athletics%20Championships%20Event%20Programme_17%20February%202025.pdf"
    },
    {
        title: "Accommodation Package",
        description: "Details about accommodation options and packages",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-05/V7.1%20New%20Delhi%202025%20World%20Para%20Athletics%20Championships.pdf",
        isNew: true
    },
    {
        title: "Accreditation Announcement",
        description: "Information about accreditation process and requirements",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-07/New%20Delhi%202025_NPC%20Accreditation%20Announcement.pdf"
    },
    {
        title: "Accreditation User Guide",
        description: "Step-by-step guide for accreditation process",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-07/New%20Delhi%202025_NPC%20Accreditation%20User%20Guide.pdf"
    },
    {
        title: "Competition Schedule",
        description: "Complete competition schedule for all events",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-05/2025_05_08_New%20Delhi%202025%20Competition%20Schedule%20V3.0.pdf",
        isNew: true
    }
];

const CLASSIFICATION_REQUIREMENTS: ClassificationRequirement[] = [
    {
        icon: Clock,
        title: "Arrive 30 minutes early",
        description: "Athletes must present to the classification 30 minutes before the allocated time on the classification schedule"
    },
    {
        icon: FileText,
        title: "Bring passport and accreditation",
        description: "Athletes must bring a passport along with their accreditation"
    },
    {
        icon: User,
        title: "Support person required",
        description: "Athletes must be accompanied by one support person proficient in English"
    },
    {
        icon: Users,
        title: "Appropriate sports attire",
        description: "Athletes should be appropriately dressed in sports clothes. We recommend wearing shorts for the classification evaluation"
    },
    {
        icon: Trophy,
        title: "Competition equipment",
        description: "Must bring all sports equipment and competition clothing including shoes to be used in competition (for technical assessment)"
    }
];

const HeroSection: React.FC = () => (
    <section className='w-full h-auto overflow-hidden'>
        <div className="relative w-full">
            <Image
                src="/assets/wpa-new-delhi-2025-hero-bg.png"
                alt="New Delhi 2025 World Para Athletics Championships"
                className="object-cover w-full h-auto max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] lg:max-h-none"
                width="1600"
                height="900"
                priority
            />
        </div>
    </section>
);

// Hero Section Component
const GradientSection: React.FC = () => (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-purple-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-paralympic-yellow rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-paralympic-green rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-paralympic-red rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Content */}
                <div className="space-y-6 sm:space-y-8">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Star className="h-4 w-4 text-paralympic-yellow" />
                        <span className="font-medium">12th Edition</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        New Delhi 2025
                        <span className="block text-paralympic-yellow">World Para Athletics</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-paralympic-green to-paralympic-yellow">
                            Championships
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                        The largest Para sport event ever held in India. Join us as over 1,000 athletes from around the world compete in 186 medal events at the prestigious Jawaharlal Nehru Stadium.
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-paralympic-yellow" />
                            <span>{CHAMPIONSHIP_INFO.competitionDates}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-paralympic-green" />
                            <span>{CHAMPIONSHIP_INFO.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-paralympic-red" />
                            <span>{CHAMPIONSHIP_INFO.athletes} Athletes</span>
                        </div>
                    </div>

                    {/* <div className="flex flex-wrap gap-4">
                        <button className="bg-gradient-to-r from-paralympic-green to-paralympic-blue hover:from-paralympic-blue hover:to-paralympic-green px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                            View Competition Schedule
                        </button>
                        <button className="border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300">
                            Registration Information
                        </button>
                    </div> */}
                </div>

                {/* Visual Element */}
                <div className="relative mt-8 lg:mt-0">
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 transform rotate-1 sm:rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paralympic-yellow">{CHAMPIONSHIP_INFO.athletes}</div>
                                <div className="text-sm text-gray-300">Athletes</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paralympic-green">{CHAMPIONSHIP_INFO.medalEvents}</div>
                                <div className="text-sm text-gray-300">Medal Events</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paralympic-red">{CHAMPIONSHIP_INFO.seatingCapacity}</div>
                                <div className="text-sm text-gray-300">Seating Capacity</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{CHAMPIONSHIP_INFO.edition}</div>
                                <div className="text-sm text-gray-300">Edition</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Quick Info Section Component
const QuickInfoSection: React.FC = () => (
    <section className="py-10 sm:py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-8">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 bg-paralympic-blue/10 rounded-lg sm:rounded-xl">
                            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-paralympic-blue" />
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-900">{CHAMPIONSHIP_INFO.medalEvents}</div>
                            <div className="text-xs sm:text-sm text-gray-600">Medal Events</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 bg-paralympic-green/10 rounded-lg sm:rounded-xl">
                            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-paralympic-green" />
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-900">{CHAMPIONSHIP_INFO.athletes}</div>
                            <div className="text-xs sm:text-sm text-gray-600">Athletes Expected</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 bg-paralympic-red/10 rounded-lg sm:rounded-xl">
                            <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-paralympic-red" />
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-900">100+</div>
                            <div className="text-xs sm:text-sm text-gray-600">Countries</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg sm:rounded-xl">
                            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-900">9</div>
                            <div className="text-xs sm:text-sm text-gray-600">Competition Days</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Next Events Preview Section
const NextEventsPreviewSection: React.FC = () => {
    const [isMobile, setIsMobile] = React.useState(false);
    const [isTablet, setIsTablet] = React.useState(false);

    React.useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640); // sm breakpoint
            setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1280); // between sm and xl
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const events = [
        {
            id: 1,
            title: "Opening Ceremony",
            date: "27 Sep",
            day: "Friday",
            time: "19:00",
            type: "ceremony",
            description: "Grand opening ceremony with cultural performances",
            color: "from-paralympic-blue to-purple-600"
        },
        {
            id: 2,
            title: "Track Events - Day 1",
            date: "28 Sep",
            day: "Saturday",
            time: "09:00",
            type: "track",
            description: "100m, 400m, 800m heats and finals",
            color: "from-paralympic-green to-teal-600"
        },
        {
            id: 3,
            title: "Field Events - Day 1",
            date: "28 Sep",
            day: "Saturday",
            time: "10:30",
            type: "field",
            description: "Shot put, Long jump, High jump competitions",
            color: "from-paralympic-red to-orange-600"
        },
        {
            id: 4,
            title: "Marathon Events",
            date: "29 Sep",
            day: "Sunday",
            time: "07:00",
            type: "marathon",
            description: "Men's and Women's marathon competitions",
            color: "from-purple-600 to-pink-600"
        },
        {
            id: 5,
            title: "Finals Week",
            date: "01-05 Oct",
            day: "Multiple Days",
            time: "Various",
            type: "finals",
            description: "Medal events and closing ceremonies",
            color: "from-paralympic-yellow to-orange-500"
        }
    ];

    // Filter events based on screen size
    const getDisplayEvents = () => {
        if (isMobile) {
            return events.slice(0, 3);
        } else if (isTablet) {
            return events.slice(0, 5);
        }
        return events; // Show all events on desktop
    };

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'ceremony': return Trophy;
            case 'track': return Clock;
            case 'field': return Medal;
            case 'marathon': return Users;
            case 'finals': return Star;
            default: return Calendar;
        }
    };

    return (
        <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 bg-paralympic-blue/10 px-4 py-2 rounded-full mb-4">
                        <Calendar className="h-4 w-4 text-paralympic-blue" />
                        <span className="text-sm font-medium text-paralympic-blue">Upcoming Events</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Next Events Preview
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the upcoming events and competitions throughout the championship
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
                    {getDisplayEvents().map((event, index) => {
                        const IconComponent = getEventIcon(event.type);
                        return (
                            <div
                                key={event.id}
                                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-gray-200"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-br ${event.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="h-6 w-6 text-white" />
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-paralympic-blue transition-colors duration-200">
                                            {event.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            {event.description}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3 text-gray-400" />
                                                <span className="text-xs text-gray-600">{event.date}</span>
                                            </div>
                                            <span className="text-xs font-medium text-paralympic-blue bg-blue-50 px-2 py-1 rounded-full">
                                                {event.day}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3 text-gray-400" />
                                            <span className="text-xs text-gray-600">{event.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* View Complete Schedule Card - Always visible */}
                    <Link href="/wpa-new-delhi-2025/schedule">
                        <div className="group bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-purple-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-transparent hover:border-white/20 relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-4 right-4 w-16 h-16 bg-paralympic-yellow rounded-full blur-xl"></div>
                                <div className="absolute bottom-2 left-2 w-12 h-12 bg-paralympic-green rounded-full blur-lg"></div>
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Calendar className="h-6 w-6 text-white" />
                                </div>

                                <div className="space-y-3 text-white">
                                    <div>
                                        <h3 className="font-bold text-sm sm:text-base group-hover:text-paralympic-yellow transition-colors duration-200">
                                            Complete Schedule
                                        </h3>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs">9 Days</span>
                                            <span className="text-xs">
                                                186 Events
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3 text-paralympic-green" />
                                            <span className="text-xs text-blue-200">Full Details</span>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-white/20 flex items-center justify-center">
                                        <ArrowRight className="h-4 w-4 text-white group-hover:text-paralympic-yellow group-hover:translate-x-1 transition-all duration-200" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Delhi 2025 Highlights Reel Section
const Delhi2025HighlightsSection: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const highlights = [
        {
            id: 1,
            type: 'image' as const,
            src: '/assets/wpa/wpa-reel-1.png',
            alt: 'JLN Stadium preparation for Delhi 2025',
            title: 'World-Class Venue Ready',
            description: 'Jawaharlal Nehru Stadium undergoes major upgrades for the championships',
        },
        {
            id: 2,
            type: 'image' as const,
            src: '/assets/wpa/wpa-reel-2.png',
            alt: 'Athletes training for Delhi 2025',
            title: 'Elite Athletes Prepare',
            description: 'Watch world-class para athletes gear up for the biggest event in India',
        },
        {
            id: 3,
            type: 'image' as const,
            src: '/assets/wpa/wpa-reel-3.png',
            alt: 'Paralympic athletes in action',
            title: 'Record-Breaking Performances Expected',
            description: 'Athletes aim to set new world records in Delhi',
        },
        {
            id: 4,
            type: 'image' as const,
            src: '/assets/wpa/wpa-reel-4.png',
            alt: 'Delhi 2025 promotional highlights',
            title: 'The Journey Begins',
            description: 'Official Delhi 2025 promotional highlights showcasing the excitement',
        }
    ];

    // Auto-advance functionality
    React.useEffect(() => {
        if (!isPlaying || isHovered) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % highlights.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPlaying, isHovered, highlights.length]);

    // Touch/swipe support
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(0);
        if (e.touches[0]) {
            setTouchStart(e.touches[0].clientX);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches[0]) {
            setTouchEnd(e.touches[0].clientX);
        }
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            setCurrentSlide((prev) => (prev + 1) % highlights.length);
        }
        if (isRightSwipe) {
            setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length);
        }
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % highlights.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length);
    };

    const currentHighlight = highlights[currentSlide];

    if (!currentHighlight) {
        return null;
    }

    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
                        <Camera className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-600">Live Updates</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Delhi 2025 Highlights Reel
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Experience the excitement and preparation leading up to the biggest Para athletics event in India
                    </p>
                </div>

                {/* Main Slideshow */}
                <div
                    className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Slideshow Container */}
                    <div className="relative aspect-video sm:aspect-[21/9] overflow-hidden">
                        <div className="relative w-full h-full">
                            <Image
                                src={currentHighlight.src}
                                alt={currentHighlight.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority={currentSlide === 0}
                            />
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
                            {/* Tags - Hidden on mobile */}
                            <div className="hidden sm:flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                                    <Eye className="h-3 w-3" /> Photo
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight mb-2 sm:mb-2">
                                {currentHighlight.title}
                            </h3>

                            {/* Description - Hidden on mobile */}
                            <p className="hidden sm:block text-sm lg:text-base text-gray-200 max-w-2xl">
                                {currentHighlight.description}
                            </p>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>

                        {/* Play/Pause Button */}
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {highlights.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index
                                        ? 'bg-white w-8'
                                        : 'bg-white/50 hover:bg-white/70'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="mt-6 sm:mt-8">
                    <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {highlights.map((highlight, index) => (
                            <button
                                key={highlight.id}
                                onClick={() => goToSlide(index)}
                                className={`relative flex-shrink-0 w-20 h-12 sm:w-24 sm:h-14 rounded-lg overflow-hidden transition-all duration-300 ${currentSlide === index
                                        ? 'ring-2 ring-paralympic-blue ring-offset-2 scale-105'
                                        : 'opacity-70 hover:opacity-100'
                                    }`}
                            >
                                <Image
                                    src={highlight.src}
                                    alt={highlight.alt}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Essential Information Overview Section
const EssentialInfoSection: React.FC = () => (
    <section id="essential-info" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Essential Information</h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                    Everything you need to know about participating in the New Delhi 2025 World Para Athletics Championships
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Competition Details */}
                <div className="bg-gradient-to-br from-paralympic-blue/5 to-paralympic-green/5 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-paralympic-blue/10 rounded-lg">
                            <Trophy className="h-6 w-6 text-paralympic-blue" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Competition Info</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        Complete details about venue, dates, medal events, and historical significance of this landmark championship.
                    </p>
                    <div className="space-y-2 mb-4">
                        <div className="text-xs text-gray-500">
                            📅 {CHAMPIONSHIP_INFO.competitionDates}
                        </div>
                        <div className="text-xs text-gray-500">
                            📍 {CHAMPIONSHIP_INFO.venue}, {CHAMPIONSHIP_INFO.location}
                        </div>
                        <div className="text-xs text-gray-500">
                            🏆 {CHAMPIONSHIP_INFO.medalEvents} Medal Events
                        </div>
                    </div>
                    <Link href="/wpa-new-delhi-2025/competition-info">
                        <button className="w-full bg-paralympic-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-paralympic-navy transition-colors text-sm">
                            View Competition Details
                        </button>
                    </Link>
                </div>

                {/* Timeline & Deadlines */}
                <div className="bg-gradient-to-br from-paralympic-red/5 to-orange-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-paralympic-red/10 rounded-lg">
                            <Clock className="h-6 w-6 text-paralympic-red" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Timeline & Deadlines</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        Important qualification periods, entry deadlines, and key dates for athletes and teams.
                    </p>
                    <div className="space-y-2 mb-4">
                        <div className="text-xs text-gray-500">
                            🎯 Entry by Number: March 14, 2025
                        </div>
                        <div className="text-xs text-gray-500">
                            📝 Final Entry: August 8, 2025
                        </div>
                        <div className="text-xs text-gray-500">
                            💰 Payment Due: September 8, 2025
                        </div>
                    </div>
                    <Link href="/wpa-new-delhi-2025/timeline">
                        <button className="w-full bg-paralympic-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                            View Full Timeline
                        </button>
                    </Link>
                </div>

                {/* Classification */}
                <div className="bg-gradient-to-br from-paralympic-green/5 to-teal-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-paralympic-green/10 rounded-lg">
                            <User className="h-6 w-6 text-paralympic-green" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Classification</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        Classification schedule, requirements, and essential information for athletes needing classification.
                    </p>
                    <div className="space-y-2 mb-4">
                        <div className="text-xs text-gray-500">
                            📅 {CHAMPIONSHIP_INFO.classificationDates}
                        </div>
                        <div className="text-xs text-gray-500">
                            📋 5 Key Requirements
                        </div>
                        <div className="text-xs text-gray-500">
                            ✉️ classification@worldparaathletics.org
                        </div>
                    </div>
                    <Link href="/wpa-new-delhi-2025/classification">
                        <button className="w-full bg-paralympic-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm">
                            View Classification Info
                        </button>
                    </Link>
                </div>

                {/* Documents */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-600/10 rounded-lg">
                            <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Key Documents</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        Access qualification criteria, event programme, accommodation packages, and accreditation guides.
                    </p>
                    <div className="space-y-2 mb-4">
                        <div className="text-xs text-gray-500">
                            📄 {KEY_DOCUMENTS.length} Essential Documents
                        </div>
                        <div className="text-xs text-gray-500">
                            🆕 Recently Updated Files
                        </div>
                        <div className="text-xs text-gray-500">
                            📋 Competition Schedule Available
                        </div>
                    </div>
                    <Link href="/wpa-new-delhi-2025/documents">
                        <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm">
                            Access Documents
                        </button>
                    </Link>
                </div>

                {/* Support & Contact */}
                <div className="bg-gradient-to-br from-paralympic-yellow/5 to-orange-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-paralympic-yellow/20 rounded-lg">
                            <Heart className="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Team Support</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        Get help with registration, qualification questions, event logistics, and other team inquiries.
                    </p>
                    <div className="space-y-2 mb-4">
                        <div className="text-xs text-gray-500">
                            🎯 Dedicated Support Team
                        </div>
                        <div className="text-xs text-gray-500">
                            💬 24/7 Question Box
                        </div>
                        <div className="text-xs text-gray-500">
                            🌐 Multilingual Assistance
                        </div>
                    </div>
                    <Link href="/wpa-new-delhi-2025/support">
                        <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-sm">
                            Get Support
                        </button>
                    </Link>
                </div>

                {/* Quick Access */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gray-200 rounded-lg">
                            <ArrowRight className="h-6 w-6 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Quick Links</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        Fast access to frequently needed information and external resources for teams and athletes.
                    </p>
                    <div className="space-y-2">
                        <Link href="/contact" className="block">
                            <div className="text-xs text-paralympic-blue hover:underline">
                                → Contact PCI Support
                            </div>
                        </Link>
                        <Link href="https://sportsauthorityofindia.nic.in/sai/stadiaJln" target="_blank" className="block">
                            <div className="text-xs text-paralympic-blue hover:underline">
                                → JLN Stadium Information
                            </div>
                        </Link>
                        <Link href="https://forms.office.com/pages/responsepage.aspx?id=0bw-rXQtCEmH-W51IjGQgg3w0_8mbTpNsffaUdGn8a1UQVBBOUdXMUVRMlFXU0dTTEFDSEhBU0gzNS4u&route=shorturl" target="_blank" className="block">
                            <div className="text-xs text-paralympic-blue hover:underline">
                                → Team Questions Form
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
);





// Additional Sections Component
const AdditionalInfoSection: React.FC = () => (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Accessibility & Inclusion */}
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                    <div className="p-2 sm:p-3 bg-paralympic-green/10 rounded-lg sm:rounded-xl w-fit mb-4 sm:mb-6">
                        <Accessibility className="h-6 w-6 sm:h-8 sm:w-8 text-paralympic-green" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Accessibility & Inclusion</h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                        We are committed to ensuring the championships are fully accessible to all participants, officials, and spectators. The venue features comprehensive accessibility infrastructure and support services.
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-paralympic-green rounded-full flex-shrink-0"></div>
                            <span>Wheelchair accessible facilities</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-paralympic-green rounded-full flex-shrink-0"></div>
                            <span>Audio-visual assistance available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-paralympic-green rounded-full flex-shrink-0"></div>
                            <span>Multilingual support services</span>
                        </div>
                    </div>
                </div>

                {/* Legacy & Impact */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                    <div className="p-2 sm:p-3 bg-purple-600/10 rounded-lg sm:rounded-xl w-fit mb-4 sm:mb-6">
                        <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Legacy & Impact</h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                        This championship will leave a lasting legacy for Para athletics in India and across Asia, inspiring a new generation of Para athletes and promoting inclusive sports development.
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                            <span>Youth development programs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                            <span>Community engagement initiatives</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                            <span>Infrastructure improvements</span>
                        </div>
                    </div>
                </div>

                {/* Media & Broadcasting */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                    <div className="p-2 sm:p-3 bg-orange-600/10 rounded-lg sm:rounded-xl w-fit mb-4 sm:mb-6">
                        <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Global Coverage</h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                        The championships will be broadcast globally, showcasing the incredible athletic performances to millions of viewers worldwide and promoting Para athletics on an international scale.
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0"></div>
                            <span>Live streaming coverage</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0"></div>
                            <span>Multi-language commentary</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0"></div>
                            <span>Digital content platforms</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Footer CTA Section
const FooterCTASection: React.FC = () => (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-paralympic-navy via-paralympic-blue to-purple-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                    Be Part of <span className="text-paralympic-yellow">History</span>
                </h2>
                <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
                    Join us for the largest Para sport event ever held in India. Whether you&apos;re an athlete, official, or spectator, this championship promises to be an unforgettable celebration of athletic excellence and human determination.
                </p>

                {/* <div className="flex flex-wrap gap-4 justify-center mb-12">
                    <button className="bg-paralympic-green hover:bg-green-600 px-8 py-4 rounded-xl font-semibold transition-colors">
                        Register as Athlete
                    </button>
                    <button className="bg-paralympic-yellow text-paralympic-navy hover:bg-yellow-300 px-8 py-4 rounded-xl font-semibold transition-colors">
                        Official Registration
                    </button>
                    <button className="border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold transition-colors">
                        Spectator Information
                    </button>
                </div> */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                    <div>
                        <div className="text-2xl sm:text-3xl font-bold text-paralympic-yellow mb-2">Sep 27 - Oct 5</div>
                        <div className="text-blue-200 text-sm sm:text-base">Competition Dates</div>
                    </div>
                    <div>
                        <div className="text-2xl sm:text-3xl font-bold text-paralympic-green mb-2">New Delhi</div>
                        <div className="text-blue-200 text-sm sm:text-base">JLN Stadium</div>
                    </div>
                    <div>
                        <div className="text-2xl sm:text-3xl font-bold text-white mb-2">1,000+</div>
                        <div className="text-blue-200 text-sm sm:text-base">Athletes</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


// Main Component
const WPADelhi2025Page: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <HeroSection />

            {/* Quick Info Section */}
            <QuickInfoSection />

            {/* Next Events Preview */}
            <NextEventsPreviewSection />

            {/* Delhi 2025 Highlights Reel */}
            <Delhi2025HighlightsSection />

            {/* Essential Information Overview */}
            <EssentialInfoSection />

            <GradientSection />

            {/* Additional Information */}
            <AdditionalInfoSection />

            {/* Footer CTA */}
            <FooterCTASection />

            <Footer />
        </div>
    );
};

export default WPADelhi2025Page;