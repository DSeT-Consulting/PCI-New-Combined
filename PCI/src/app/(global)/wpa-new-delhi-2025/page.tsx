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
    Link as LinkIcon
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
    <section className='w-full h-full'>
        <Image
            src="/assets/wpa-new-delhi-2025-hero-bg.png"
            alt="New Delhi 2025 World Para Athletics Championships"
            className="object-cover w-full h-auto"
            width="1600"
            height="900"
        />
    </section>
);

// Hero Section Component
const GradientSection: React.FC = () => (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-purple-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-paralympic-yellow rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-paralympic-green rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-paralympic-red rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Star className="h-4 w-4 text-paralympic-yellow" />
                        <span className="font-medium">12th Edition</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        New Delhi 2025
                        <span className="block text-paralympic-yellow">World Para Athletics</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-paralympic-green to-paralympic-yellow">
                            Championships
                        </span>
                    </h1>

                    <p className="text-xl text-gray-200 leading-relaxed">
                        The largest Para sport event ever held in India. Join us as over 1,000 athletes from around the world compete in 186 medal events at the prestigious Jawaharlal Nehru Stadium.
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm">
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
                <div className="relative">
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-paralympic-yellow">{CHAMPIONSHIP_INFO.athletes}</div>
                                <div className="text-sm text-gray-300">Athletes</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-paralympic-green">{CHAMPIONSHIP_INFO.medalEvents}</div>
                                <div className="text-sm text-gray-300">Medal Events</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-paralympic-red">{CHAMPIONSHIP_INFO.seatingCapacity}</div>
                                <div className="text-sm text-gray-300">Seating Capacity</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white">{CHAMPIONSHIP_INFO.edition}</div>
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
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-paralympic-blue/10 rounded-xl">
                            <Trophy className="h-6 w-6 text-paralympic-blue" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{CHAMPIONSHIP_INFO.medalEvents}</div>
                            <div className="text-sm text-gray-600">Medal Events</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-paralympic-green/10 rounded-xl">
                            <Users className="h-6 w-6 text-paralympic-green" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{CHAMPIONSHIP_INFO.athletes}</div>
                            <div className="text-sm text-gray-600">Athletes Expected</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-paralympic-red/10 rounded-xl">
                            <Globe className="h-6 w-6 text-paralympic-red" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">100+</div>
                            <div className="text-sm text-gray-600">Countries</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl">
                            <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">9</div>
                            <div className="text-sm text-gray-600">Competition Days</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Competition Information Component
const CompetitionInfoSection: React.FC = () => (
    <section id="competition-info" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Competition Information</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Essential details about the New Delhi 2025 World Para Athletics Championships
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Competition Details */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-paralympic-blue/5 to-paralympic-green/5 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <Calendar className="h-6 w-6 text-paralympic-blue mt-1" />
                                <div>
                                    <div className="font-semibold text-gray-900">Competition Dates</div>
                                    <div className="text-gray-600">{CHAMPIONSHIP_INFO.competitionDates} (9 days of competition)</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-paralympic-green mt-1" />
                                <div>
                                    <div className="font-semibold text-gray-900">Venue</div>
                                    <div className="text-gray-600">{CHAMPIONSHIP_INFO.venue} in {CHAMPIONSHIP_INFO.location}</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Trophy className="h-6 w-6 text-paralympic-red mt-1" />
                                <div>
                                    <div className="font-semibold text-gray-900">Medal Events</div>
                                    <div className="text-gray-600">{CHAMPIONSHIP_INFO.medalEvents} total ({CHAMPIONSHIP_INFO.menEvents} men&apos;s, {CHAMPIONSHIP_INFO.womenEvents} women&apos;s, {CHAMPIONSHIP_INFO.mixedEvents} mixed)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-paralympic-yellow/5 to-orange-100/50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Venue Information</h3>
                        <p className="text-gray-700 mb-4">
                            The JLN Stadium was constructed to host the Asian Games in 1982 and later renovated and upgraded for hosting the 2010 Commonwealth Games. The venue has a seating capacity to accommodate {CHAMPIONSHIP_INFO.seatingCapacity} spectators and is maintained by the Sports Authority of India on behalf of the Ministry of Sports and Youth Affairs.
                        </p>
                        <Link href="https://sportsauthorityofindia.nic.in/sai/stadiaJln" className='flex w-fit' target='_blank'>
                            <div className="flex items-center gap-2 text-sm text-paralympic-blue">
                                <ExternalLink className="h-4 w-4" />
                                <span>Learn more about the venue</span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Historical Context */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Historical Significance</h3>
                        <p className="text-gray-700 mb-4">
                            This will be the {CHAMPIONSHIP_INFO.edition} edition of the World Para Athletics Championships and the largest Para sport event ever held in India.
                        </p>
                        <p className="text-gray-700 mb-6">
                            Asia has hosted the World Championships in four occasions, at Doha 2015 in Qatar, Dubai 2019 in the United Arab Emirates and Kobe 2024 in Japan.
                        </p>
                        <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-lg font-semibold text-gray-900 mb-2">Did you know?</div>
                            <p className="text-gray-700 text-sm">
                                The competition programme will feature 15 more medal events than at the last edition of the championships in Kobe.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Impairment Types</h3>
                        <div className="space-y-3">
                            {CHAMPIONSHIP_INFO.impairmentTypes.map((type: string, index: number) => (
                                <div key={index} className="flex items-center gap-3 bg-white/60 rounded-lg p-3">
                                    <Accessibility className="h-5 w-5 text-paralympic-green" />
                                    <span className="font-medium text-gray-800">{type}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Timeline Component
const TimelineSection: React.FC = () => {
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

    const toggleExpand = (index: number): void => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedItems(newExpanded);
    };

    const getTypeColor = (type: TimelineEvent['type']): string => {
        switch (type) {
            case 'qualification': return 'bg-paralympic-green text-white';
            case 'entry': return 'bg-paralympic-blue text-white';
            case 'deadline': return 'bg-paralympic-red text-white';
            case 'invitation': return 'bg-purple-600 text-white';
            case 'system': return 'bg-paralympic-yellow text-black';
            case 'confirmation': return 'bg-teal-600 text-white';
            case 'payment': return 'bg-orange-600 text-white';
            default: return 'bg-gray-600 text-white';
        }
    };

    return (
        <section id="timeline" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Qualification and Entry Timeline</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Important dates and deadlines for athletes and teams participating in the championships
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {TIMELINE_EVENTS.map((event: TimelineEvent, index: number) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(event.type)}`}>
                                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="text-sm font-semibold text-paralympic-blue mb-2">{event.date}</div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                                                    {event.description && (
                                                        <div className="text-gray-600">
                                                            {expandedItems.has(index) ? (
                                                                <p>{event.description}</p>
                                                            ) : (
                                                                <p className="line-clamp-2">{event.description}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                {/* {event.description && (
                                                    <button
                                                        onClick={() => toggleExpand(index)}
                                                        className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                    >
                                                        {expandedItems.has(index) ?
                                                            <ChevronUp className="h-5 w-5 text-gray-500" /> :
                                                            <ChevronDown className="h-5 w-5 text-gray-500" />
                                                        }
                                                    </button>
                                                )} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Classification Section Component
const ClassificationSection: React.FC = () => (
    <section id="classification" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Classification</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Essential information about the classification process and requirements
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Classification Details */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-paralympic-blue/5 to-purple-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Classification Schedule</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Calendar className="h-6 w-6 text-paralympic-blue" />
                                <div>
                                    <div className="font-semibold text-gray-900">Classification Days</div>
                                    <div className="text-gray-600">{CHAMPIONSHIP_INFO.classificationDates}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-yellow-800">Important Notice</div>
                                    <p className="text-yellow-700 text-sm mt-1">
                                        We are expecting that all athletes who need classification will be present for all days of classification. Therefore, please make sure to plan for this in your travel arrangements.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-gray-700 text-sm">
                                The first version of the classification schedule is due at the end of August 2025.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="font-semibold text-gray-900 mb-2">Classification Team</div>
                                <div className="flex items-center gap-2 text-paralympic-blue">
                                    <LinkIcon className="h-4 w-4" />
                                    <span>classification@worldparaathletics.org</span>
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900 mb-2">Questions?</div>
                                <p className="text-gray-600 text-sm">
                                    For teams that have questions, please contact World Para Athletics through the provided link.
                                </p>
                                <Link
                                    href="https://forms.office.com/pages/responsepage.aspx?id=0bw-rXQtCEmH-W51IjGQgg3w0_8mbTpNsffaUdGn8a1UQVBBOUdXMUVRMlFXU0dTTEFDSEhBU0gzNS4u&route=shorturl"
                                    className='text-sm text-paralympic-blue hover:underline font-semibold flex items-center gap-1 mt-2 w-fit'
                                    target='_blank'
                                >
                                    Click Here
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Classification Requirements */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Classification Requirements</h3>
                    <div className="space-y-6">
                        {CLASSIFICATION_REQUIREMENTS.map((requirement: ClassificationRequirement, index: number) => (
                            <div key={index} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-paralympic-blue/10 rounded-xl">
                                        <requirement.icon className="h-6 w-6 text-paralympic-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">{requirement.title}</h4>
                                        <p className="text-gray-600 text-sm">{requirement.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Key Documents Section Component
const KeyDocumentsSection: React.FC = () => (
    <section id="documents" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Documents</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Access important documents and resources for the championships
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {KEY_DOCUMENTS.map((doc: KeyDocument, index: number) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-paralympic-blue/10 rounded-xl group-hover:bg-paralympic-blue/20 transition-colors">
                                <FileText className="h-6 w-6 text-paralympic-blue" />
                            </div>
                            {doc.isNew && (
                                <span className="bg-paralympic-green text-white text-xs px-2 py-1 rounded-full font-semibold">
                                    NEW
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{doc.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
                        <Link href={doc.link} target='_blank'>
                            <button className="flex items-center gap-2 text-paralympic-blue hover:text-paralympic-navy font-semibold text-sm group">
                                {/* <Download className="h-4 w-4" /> */}
                                <span>View Document</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// Team Question Box Component
const TeamQuestionSection: React.FC = () => (
    <section className="py-16 bg-gradient-to-r from-paralympic-blue to-paralympic-navy text-white">
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <Heart className="h-12 w-12 text-paralympic-yellow mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-4">Team Question Box</h2>
                    <p className="text-xl text-blue-100">
                        For teams that have questions, please contact World Para Athletics through our support channels.
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                    <p className="text-blue-100 mb-4">
                        Our dedicated support team is here to assist teams with any questions about registration, qualification, or event logistics.
                    </p>
                    
                    <div className='flex items-center justify-center'>
                        <Link href="/contact" className='flex w-fit'>
                            <button className="bg-paralympic-yellow text-paralympic-navy px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-colors">
                                Contact Support Team
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Additional Sections Component
const AdditionalInfoSection: React.FC = () => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Accessibility & Inclusion */}
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8">
                    <div className="p-3 bg-paralympic-green/10 rounded-xl w-fit mb-6">
                        <Accessibility className="h-8 w-8 text-paralympic-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Accessibility & Inclusion</h3>
                    <p className="text-gray-700 mb-6">
                        We are committed to ensuring the championships are fully accessible to all participants, officials, and spectators. The venue features comprehensive accessibility infrastructure and support services.
                    </p>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-paralympic-green rounded-full"></div>
                            <span>Wheelchair accessible facilities</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-paralympic-green rounded-full"></div>
                            <span>Audio-visual assistance available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-paralympic-green rounded-full"></div>
                            <span>Multilingual support services</span>
                        </div>
                    </div>
                </div>

                {/* Legacy & Impact */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                    <div className="p-3 bg-purple-600/10 rounded-xl w-fit mb-6">
                        <Globe className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Legacy & Impact</h3>
                    <p className="text-gray-700 mb-6">
                        This championship will leave a lasting legacy for Para athletics in India and across Asia, inspiring a new generation of Para athletes and promoting inclusive sports development.
                    </p>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <span>Youth development programs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <span>Community engagement initiatives</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <span>Infrastructure improvements</span>
                        </div>
                    </div>
                </div>

                {/* Media & Broadcasting */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8">
                    <div className="p-3 bg-orange-600/10 rounded-xl w-fit mb-6">
                        <Globe className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Coverage</h3>
                    <p className="text-gray-700 mb-6">
                        The championships will be broadcast globally, showcasing the incredible athletic performances to millions of viewers worldwide and promoting Para athletics on an international scale.
                    </p>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                            <span>Live streaming coverage</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                            <span>Multi-language commentary</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
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
    <section className="py-16 bg-gradient-to-r from-paralympic-navy via-paralympic-blue to-purple-900 text-white">
        <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">
                    Be Part of <span className="text-paralympic-yellow">History</span>
                </h2>
                <p className="text-xl text-blue-100 mb-8">
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

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-3xl font-bold text-paralympic-yellow mb-2">Sep 27 - Oct 5</div>
                        <div className="text-blue-200">Competition Dates</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-paralympic-green mb-2">New Delhi</div>
                        <div className="text-blue-200">JLN Stadium</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-2">1,000+</div>
                        <div className="text-blue-200">Athletes</div>
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

            {/* Competition Information */}
            <CompetitionInfoSection />

            {/* Timeline Section */}
            <TimelineSection />

            <GradientSection />

            {/* Classification Section */}
            <ClassificationSection />

            {/* Key Documents */}
            <KeyDocumentsSection />

            {/* Team Question Box */}
            <TeamQuestionSection />

            {/* Additional Information */}
            <AdditionalInfoSection />

            {/* Footer CTA */}
            <FooterCTASection />

            <Footer />
        </div>
    );
};

export default WPADelhi2025Page;