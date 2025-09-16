"use client"

import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    Users,
    AlertTriangle,
    CheckCircle,
    Info,
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    CreditCard,
    FileText,
    UserCheck,
    Building,
    Globe
} from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import Link from 'next/link';

// Type definitions
interface TimelineEvent {
    date: string;
    title: string;
    description?: string;
    type: 'qualification' | 'entry' | 'deadline' | 'invitation' | 'system' | 'confirmation' | 'payment';
    importance: 'high' | 'medium' | 'low';
    status: 'upcoming' | 'active' | 'completed';
}

// Timeline events data
const TIMELINE_EVENTS: TimelineEvent[] = [
    {
        date: "01 January 2024",
        title: "Start of the qualification period for athletes to achieve MES performances",
        type: "qualification",
        importance: "high",
        status: "completed"
    },
    {
        date: "17 February 2025",
        title: "Start date to submit Preliminary Entry by Number",
        description: "WPA appreciates the cooperation of teams to provide a realistic estimate of team size",
        type: "entry",
        importance: "medium",
        status: "completed"
    },
    {
        date: "14 March 2025",
        title: "Deadline to submit Preliminary Entry by Number",
        type: "deadline",
        importance: "high",
        status: "completed"
    },
    {
        date: "02 June 2025",
        title: "Start date to apply for a Direct Invitation",
        type: "invitation",
        importance: "medium",
        status: "upcoming"
    },
    {
        date: "02 June 2025",
        title: "Opening of Online Entry System for Entry by Number",
        description: "The correct Entry by Number data is important to allow accurate planning for the Championships services and programme",
        type: "system",
        importance: "high",
        status: "upcoming"
    },
    {
        date: "07 July 2025",
        title: "Deadline for Entry by Number",
        description: "NPCs will be invoiced based on the number provided at this entry deadline. No reimbursements allowed after this deadline",
        type: "deadline",
        importance: "high",
        status: "upcoming"
    },
    {
        date: "08 July 2025",
        title: "Opening of Online Entry System for Entry by Name",
        type: "system",
        importance: "high",
        status: "upcoming"
    },
    {
        date: "03 August 2025",
        title: "End of qualification period for athletes to achieve MES performances",
        type: "qualification",
        importance: "high",
        status: "upcoming"
    },
    {
        date: "04 August 2025",
        title: "Deadline to apply for a Direct Invitation",
        type: "deadline",
        importance: "medium",
        status: "upcoming"
    },
    {
        date: "06 August 2025",
        title: "Deadline for WPA to confirm Direct Invitations approvals to NPCs",
        type: "confirmation",
        importance: "medium",
        status: "upcoming"
    },
    {
        date: "08 August 2025",
        title: "Deadline for Online Entry by Name (final entry deadline)",
        description: "No changes in the entries will be accepted after this date",
        type: "deadline",
        importance: "high",
        status: "upcoming"
    },
    {
        date: "08 September 2025",
        title: "Deadline for Competition Fee Payment",
        type: "payment",
        importance: "high",
        status: "upcoming"
    }
];

// Page Header Component
const PageHeader: React.FC = () => (
    <section className="relative bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-purple-900 text-white py-16 sm:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-paralympic-red rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-paralympic-yellow rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-paralympic-green rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Back Button */}
            <Link href="/wpa-new-delhi-2025" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to Overview</span>
            </Link>

            <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <Clock className="h-4 w-4 text-paralympic-red" />
                    <span className="font-medium text-sm">Timeline & Deadlines</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Qualification &
                    <span className="block text-paralympic-red">Entry Timeline</span>
                </h1>

                <p className="text-xl text-blue-100 leading-relaxed">
                    Complete schedule of important dates, deadlines, and qualification periods for the New Delhi 2025 World Para Athletics Championships.
                </p>
            </div>
        </div>
    </section>
);

// Quick Overview Component
const QuickOverview: React.FC = () => (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                    <div className="p-3 bg-paralympic-green/10 rounded-full w-fit mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-paralympic-green" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">3</div>
                    <div className="text-sm text-gray-600">Completed Deadlines</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                    <div className="p-3 bg-paralympic-yellow/10 rounded-full w-fit mx-auto mb-4">
                        <Clock className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">9</div>
                    <div className="text-sm text-gray-600">Upcoming Deadlines</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                    <div className="p-3 bg-paralympic-red/10 rounded-full w-fit mx-auto mb-4">
                        <AlertTriangle className="h-8 w-8 text-paralympic-red" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">5</div>
                    <div className="text-sm text-gray-600">Critical Deadlines</div>
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

    const getStatusColor = (status: TimelineEvent['status']): string => {
        switch (status) {
            case 'completed': return 'border-l-paralympic-green bg-green-50';
            case 'active': return 'border-l-paralympic-yellow bg-yellow-50';
            case 'upcoming': return 'border-l-gray-300 bg-white';
            default: return 'border-l-gray-300 bg-white';
        }
    };

    const getTypeIcon = (type: TimelineEvent['type']) => {
        switch (type) {
            case 'qualification': return <UserCheck className="h-5 w-5" />;
            case 'entry': return <FileText className="h-5 w-5" />;
            case 'deadline': return <AlertTriangle className="h-5 w-5" />;
            case 'invitation': return <Users className="h-5 w-5" />;
            case 'system': return <Building className="h-5 w-5" />;
            case 'confirmation': return <CheckCircle className="h-5 w-5" />;
            case 'payment': return <CreditCard className="h-5 w-5" />;
            default: return <Calendar className="h-5 w-5" />;
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Timeline</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        All important dates and deadlines for qualification, entry, and participation in the championships
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {TIMELINE_EVENTS.map((event: TimelineEvent, index: number) => (
                            <div
                                key={index}
                                className={`relative border-l-4 ${getStatusColor(event.status)} rounded-r-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
                            >
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className={`px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-2 ${getTypeColor(event.type)}`}>
                                                {getTypeIcon(event.type)}
                                                <span>{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-grow min-w-0">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="text-sm font-semibold text-paralympic-blue">{event.date}</div>
                                                        {event.importance === 'high' && (
                                                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                                                Critical
                                                            </span>
                                                        )}
                                                        {event.status === 'completed' && (
                                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                                                Completed
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{event.title}</h3>
                                                    {event.description && (
                                                        <div className="text-gray-600">
                                                            {expandedItems.has(index) ? (
                                                                <p className="text-sm">{event.description}</p>
                                                            ) : (
                                                                <p className="text-sm line-clamp-2">{event.description}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                {event.description && (
                                                    <button
                                                        onClick={() => toggleExpand(index)}
                                                        className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                    >
                                                        {expandedItems.has(index) ?
                                                            <ChevronUp className="h-5 w-5 text-gray-500" /> :
                                                            <ChevronDown className="h-5 w-5 text-gray-500" />
                                                        }
                                                    </button>
                                                )}
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

// Important Notes Component
const ImportantNotes: React.FC = () => (
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Important Notes</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Critical Deadlines</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm"><strong>July 7, 2025:</strong> Entry by Number deadline - No reimbursements after this date</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm"><strong>August 8, 2025:</strong> Final entry deadline - No changes accepted after</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm"><strong>September 8, 2025:</strong> Competition fee payment deadline</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Info className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Information</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm">Qualification period runs from January 1, 2024 to August 3, 2025</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm">Online entry systems will be available for different phases</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm">Direct invitations can be applied for from June 2 to August 4, 2025</span>
                                    </li>
                                </ul>
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
                <Link href="/wpa-new-delhi-2025/competition-info" className="block">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Calendar className="h-8 w-8 text-paralympic-blue mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Competition Info</h3>
                        <p className="text-gray-600 text-sm">Event details and venue information</p>
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
                        <FileText className="h-8 w-8 text-purple-600 mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Documents</h3>
                        <p className="text-gray-600 text-sm">Access qualification criteria and guides</p>
                    </div>
                </Link>
                <Link href="/wpa-new-delhi-2025/support" className="block">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Globe className="h-8 w-8 text-orange-600 mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Support</h3>
                        <p className="text-gray-600 text-sm">Get help with team questions</p>
                    </div>
                </Link>
            </div>
        </div>
    </section>
);

// Main Component
const TimelinePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <PageHeader />
            <QuickOverview />
            <TimelineSection />
            <ImportantNotes />
            <RelatedLinks />
            <Footer />
        </div>
    );
};

export default TimelinePage;