// src\app\(global)\latest-updates\page.tsx
"use client"

import React, { useState, useMemo } from 'react';
import {
    Calendar,
    Download,
    FileText,
    Filter,
    Search,
    Users,
    Trophy,
    Bell,
    Clock,
    ExternalLink,
    AlertCircle,
    Megaphone,
    BookOpen,
    Award
} from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';

// Type definitions
type Priority = 'high' | 'medium' | 'low';

interface Update {
    readonly id: number;
    readonly date: string;
    readonly title: string;
    readonly category: string;
    readonly type: string;
    readonly priority: Priority;
    readonly url: string;
}

interface Category {
    readonly id: string;
    readonly name: string;
    readonly icon: React.ReactNode;
    readonly color: string;
}

interface Stats {
    readonly total: number;
    readonly thisMonth: number;
    readonly highPriority: number;
    readonly categories: number;
}

interface PriorityBadge {
    readonly text: string;
    readonly color: string;
}

// Constants
const LATEST_UPDATES: readonly Update[] = [
    {
        id: 1,
        date: "06.07.2025",
        title: "National Para Shooting Selection Trial 3 & 4 for 2025 OF Shotgun events at AMU",
        category: "Selection Trials",
        type: "pdf",
        priority: "high",
        url: "/docs/para-shooting-selection-trial-3-4.pdf"
    },
    {
        id: 2,
        date: "05.07.2025",
        title: "Circular – Cairo 2025 Para Powerlifting World Championships",
        category: "Championships",
        type: "pdf",
        priority: "medium",
        url: "/docs/cairo-2025-para-powerlifting.pdf"
    },
    {
        id: 3,
        date: "19.06.2025",
        title: "Notice – Para Shooting",
        category: "Notices",
        type: "pdf",
        priority: "medium",
        url: "/docs/para-shooting-notice.pdf"
    },
    {
        id: 4,
        date: "10.06.2025",
        title: "Selection Trials Registration",
        category: "Registration",
        type: "pdf",
        priority: "high",
        url: "/docs/selection-trials-registration.pdf"
    },
    {
        id: 5,
        date: "24.05.2025",
        title: "7th Indian Open Para Athletics International Championship 2025 – Information Package",
        category: "Championships",
        type: "pdf",
        priority: "medium",
        url: "/docs/indian-open-para-athletics-2025.pdf"
    },
    {
        id: 6,
        date: "10.05.2025",
        title: "English Press Release PCI 10.05.2025",
        category: "Press Release",
        type: "pdf",
        priority: "low",
        url: "/docs/english-press-release-may-2025.pdf"
    },
    {
        id: 7,
        date: "10.05.2025",
        title: "Hindi Press Release PCI 10.05.2025",
        category: "Press Release",
        type: "pdf",
        priority: "low",
        url: "/docs/hindi-press-release-may-2025.pdf"
    },
    {
        id: 8,
        date: "08.05.2025",
        title: "Circular Beijing 2025 World Cup Powerlifting",
        category: "Championships",
        type: "pdf",
        priority: "medium",
        url: "/docs/beijing-2025-world-cup-powerlifting.pdf"
    },
    {
        id: 9,
        date: "03.04.2025",
        title: "Notice – Extension closing date for application submission – Inviting Applications From Eligible Candidates For Appointment In Various Grades Of Coaching Cadre On A Contractual Basis For Para Shooting Sports",
        category: "Recruitment",
        type: "pdf",
        priority: "high",
        url: "/docs/coaching-cadre-extension-notice.pdf"
    },
    {
        id: 10,
        date: "19.03.2025",
        title: "Notice – Inviting Applications From Eligible Candidates For Appointment In Various Grades Of Coaching Cadre On A Contractual Basis For Para Shooting Sports",
        category: "Recruitment",
        type: "pdf",
        priority: "high",
        url: "/docs/coaching-cadre-recruitment.pdf"
    },
    {
        id: 11,
        date: "15.03.2025",
        title: "Results – New Delhi 2025 World Para Athletics Grand Prix",
        category: "Results",
        type: "pdf",
        priority: "medium",
        url: "/docs/new-delhi-2025-grand-prix-results.pdf"
    },
    {
        id: 12,
        date: "15.02.2025",
        title: "Invitation of Tender – Tender Enquiry For Supply Of Para Athletics Implement & Equipment",
        category: "Tenders",
        type: "pdf",
        priority: "medium",
        url: "/docs/para-athletics-equipment-tender.pdf"
    },
    {
        id: 13,
        date: "27.01.2025",
        title: "Schedule – Para Athletics National Technical Official (PA – NTO) Seminar Cum Examination, 2025",
        category: "Training",
        type: "pdf",
        priority: "medium",
        url: "/docs/pa-nto-seminar-schedule-2025.pdf"
    },
    {
        id: 14,
        date: "20.01.2025",
        title: "Invitation for 2nd Winter Para-Sport Comp, organized by the Himachal Pradesh Parasports Association (HPPA) and PCI",
        category: "Competitions",
        type: "pdf",
        priority: "medium",
        url: "/docs/2nd-winter-para-sport-comp.pdf"
    },
    {
        id: 15,
        date: "16.01.2025",
        title: "New Delhi 2025 WPA Grand Prix",
        category: "Championships",
        type: "pdf",
        priority: "medium",
        url: "/docs/new-delhi-2025-wpa-grand-prix.pdf"
    },
    {
        id: 16,
        date: "02.01.2025",
        title: "Notice – Para Athletics National Technical Official (PA – NTO) Seminar Cum Examination, 2025",
        category: "Training",
        type: "pdf",
        priority: "medium",
        url: "/docs/pa-nto-seminar-notice-2025.pdf"
    }
] as const;

const CATEGORIES: readonly Category[] = [
    {
        id: 'all',
        name: 'All Updates',
        icon: <FileText className="w-4 h-4" />,
        color: 'bg-paralympic-blue'
    },
    {
        id: 'Selection Trials',
        name: 'Selection Trials',
        icon: <Trophy className="w-4 h-4" />,
        color: 'bg-paralympic-green'
    },
    {
        id: 'Championships',
        name: 'Championships',
        icon: <Award className="w-4 h-4" />,
        color: 'bg-paralympic-red'
    },
    {
        id: 'Notices',
        name: 'Notices',
        icon: <Bell className="w-4 h-4" />,
        color: 'bg-paralympic-yellow'
    },
    {
        id: 'Press Release',
        name: 'Press Releases',
        icon: <Megaphone className="w-4 h-4" />,
        color: 'bg-paralympic-navy'
    },
    {
        id: 'Recruitment',
        name: 'Recruitment',
        icon: <Users className="w-4 h-4" />,
        color: 'bg-purple-600'
    },
    {
        id: 'Training',
        name: 'Training',
        icon: <BookOpen className="w-4 h-4" />,
        color: 'bg-indigo-600'
    }
] as const;

const PRIORITY_COLORS: Record<Priority, string> = {
    high: 'border-l-4 border-l-red-500 bg-red-50',
    medium: 'border-l-4 border-l-yellow-500 bg-yellow-50',
    low: 'border-l-4 border-l-green-500 bg-green-50'
} as const;

const PRIORITY_BADGES: Record<Priority, PriorityBadge> = {
    high: { text: 'High Priority', color: 'bg-red-100 text-red-800 border-red-200' },
    medium: { text: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    low: { text: 'Low', color: 'bg-green-100 text-green-800 border-green-200' }
} as const;

// Utility functions
const parseDate = (dateString: string): Date => {
    const parts = dateString.split('.');
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
        return new Date(); // Fallback to current date
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return new Date(); // Fallback to current date
    }

    return new Date(year, month - 1, day);
};

const formatDate = (dateString: string): string => {
    const date = parseDate(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getDateParts = (dateString: string): { day: string; month: string; year: string } => {
    const formatted = formatDate(dateString);
    const parts = formatted.split(' ');
    return {
        day: parts[1]?.replace(',', '') ?? '1',
        month: parts[0] ?? 'Jan',
        year: parts[2] ?? '2025'
    };
};

// Components
const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-gradient-to-br from-paralympic-blue via-paralympic-navy to-paralympic-blue min-h-[40vh] flex items-center justify-center overflow-hidden py-16">
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-20 h-20 bg-paralympic-yellow/20 rounded-full animate-float" />
                <div
                    className="absolute top-32 right-20 w-16 h-16 bg-paralympic-green/20 rounded-full animate-float"
                    style={{ animationDelay: '1s' }}
                />
                <div
                    className="absolute bottom-20 left-1/4 w-12 h-12 bg-paralympic-red/20 rounded-full animate-float"
                    style={{ animationDelay: '2s' }}
                />
                <div
                    className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-float"
                    style={{ animationDelay: '0.5s' }}
                />
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                    <Bell className="w-5 h-5 text-paralympic-yellow animate-pulse" />
                    <span className="text-white font-medium">Stay Updated</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                    Latest <span className="text-paralympic-yellow">Updates</span>
                </h1>

                <p
                    className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up"
                    style={{ animationDelay: '0.2s' }}
                >
                    Stay informed with the latest announcements, selection trials, championships, and important notices from the Paralympic Committee of India.
                </p>

                <div
                    className="flex flex-wrap gap-4 justify-center animate-fade-in-up"
                    style={{ animationDelay: '0.4s' }}
                >
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <FileText className="w-4 h-4 text-paralympic-yellow" />
                        <span className="text-white text-sm">Official Documents</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <Clock className="w-4 h-4 text-paralympic-green" />
                        <span className="text-white text-sm">Real-time Updates</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <Download className="w-4 h-4 text-paralympic-red" />
                        <span className="text-white text-sm">Easy Access</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

const QuickStats: React.FC<{ updates: readonly Update[] }> = ({ updates }) => {
    const stats: Stats = useMemo(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const thisMonthUpdates = updates.filter(update => {
            const updateDate = parseDate(update.date);
            return updateDate.getMonth() === currentMonth && updateDate.getFullYear() === currentYear;
        }).length;

        const highPriorityUpdates = updates.filter(update => update.priority === 'high').length;
        const uniqueCategories = new Set(updates.map(update => update.category));

        return {
            total: updates.length,
            thisMonth: thisMonthUpdates,
            highPriority: highPriorityUpdates,
            categories: uniqueCategories.size
        };
    }, [updates]);

    const statItems = [
        {
            icon: <FileText className="w-6 h-6 text-white" />,
            value: stats.total,
            label: 'Total Updates',
            bgColor: 'bg-paralympic-blue',
            borderColor: 'hover:border-paralympic-blue/20'
        },
        {
            icon: <Calendar className="w-6 h-6 text-white" />,
            value: stats.thisMonth,
            label: 'This Month',
            bgColor: 'bg-paralympic-green',
            borderColor: 'hover:border-paralympic-green/20'
        },
        {
            icon: <AlertCircle className="w-6 h-6 text-white" />,
            value: stats.highPriority,
            label: 'High Priority',
            bgColor: 'bg-paralympic-red',
            borderColor: 'hover:border-paralympic-red/20'
        },
        {
            icon: <Filter className="w-6 h-6 text-paralympic-navy" />,
            value: stats.categories,
            label: 'Categories',
            bgColor: 'bg-paralympic-yellow',
            borderColor: 'hover:border-paralympic-yellow/20'
        }
    ];

    return (
        <section className="py-12 bg-gradient-to-r from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {statItems.map((item, index) => (
                        <div
                            key={index}
                            className={`text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ${item.borderColor}`}
                        >
                            <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                {item.icon}
                            </div>
                            <div className="text-2xl font-bold text-paralympic-navy mb-1">{item.value}</div>
                            <div className="text-sm text-gray-600">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FilterAndSearch: React.FC<{
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: readonly Category[];
}> = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryClick = (categoryId: string): void => {
        setSelectedCategory(categoryId);
    };

    return (
        <section className="py-8 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                    <div className="relative flex-1 max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search updates..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paralympic-blue focus:border-transparent outline-none transition-all duration-200"
                            aria-label="Search updates"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category.id
                                    ? `${category.color} text-white shadow-lg`
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                aria-label={`Filter by ${category.name}`}
                            >
                                {category.icon}
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const UpdatesList: React.FC<{
    filteredUpdates: readonly Update[];
    handleDocumentClick: (update: Update) => void;
}> = ({ filteredUpdates, handleDocumentClick }) => {
    const handleUpdateClick = (update: Update): void => {
        handleDocumentClick(update);
    };

    if (filteredUpdates.length === 0) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-md mx-auto">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Updates Found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="space-y-4">
                    {filteredUpdates.map((update, index) => {
                        const priorityBadge = PRIORITY_BADGES[update.priority];
                        const dateParts = getDateParts(update.date);

                        return (
                            <div
                                key={update.id}
                                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${PRIORITY_COLORS[update.priority]} overflow-hidden group animate-fade-in-up`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="bg-paralympic-blue text-white rounded-xl p-3 text-center min-w-[120px]">
                                                <div className="text-sm font-medium opacity-90">{dateParts.day}</div>
                                                <div className="text-lg font-bold">{dateParts.month}</div>
                                                <div className="text-sm opacity-90">{dateParts.year}</div>
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${priorityBadge.color}`}>
                                                    <AlertCircle className="w-3 h-3" />
                                                    {priorityBadge.text}
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                                    <FileText className="w-3 h-3" />
                                                    {update.category}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-paralympic-blue transition-colors duration-200">
                                                {update.title}
                                            </h3>

                                            <p className="text-gray-600 text-sm">
                                                Click to view the complete document with all details and requirements.
                                            </p>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <button
                                                onClick={() => handleUpdateClick(update)}
                                                className="flex items-center gap-2 bg-paralympic-blue hover:bg-paralympic-navy text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg group-hover:scale-105"
                                                aria-label={`Open ${update.title}`}
                                            >
                                                <Download className="w-4 h-4" />
                                                <span className="hidden sm:inline">View PDF</span>
                                                <span className="sm:hidden">PDF</span>
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const NewsletterSection: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const handleSubscription = (): void => {
        const trimmedEmail = email.trim();
        if (trimmedEmail?.includes('@')) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            handleSubscription();
        }
    };

    return (
        <section className="py-16 bg-gradient-to-r from-paralympic-blue to-paralympic-navy">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <Bell className="w-12 h-12 text-paralympic-yellow mx-auto mb-6" />

                    <h2 className="text-3xl font-bold text-white mb-4">
                        Never Miss an Update
                    </h2>

                    <p className="text-white/90 mb-8">
                        Subscribe to our newsletter and get the latest Paralympic updates delivered directly to your inbox.
                    </p>

                    {!isSubscribed ? (
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                onKeyDown={handleKeyPress}
                                placeholder="Enter your email address"
                                className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-paralympic-yellow outline-none"
                                aria-label="Email address for newsletter subscription"
                            />
                            <button
                                onClick={handleSubscription}
                                className="bg-paralympic-yellow hover:bg-yellow-400 text-paralympic-navy px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                                aria-label="Subscribe to newsletter"
                            >
                                Subscribe
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
                            <div className="text-paralympic-yellow mb-2 text-2xl">✓</div>
                            <p className="text-white font-medium">Thank you for subscribing!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const LatestUpdatesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredUpdates: readonly Update[] = useMemo(() => {
        return LATEST_UPDATES.filter(update => {
            const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                update.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || update.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const handleDocumentClick = (update: Update): void => {
        // In a real application, this would handle PDF viewing/downloading
        console.log('Opening document:', update.title);
        alert(`Opening: ${update.title}\nThis would normally open the PDF document.`);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <HeroSection />
            <QuickStats updates={LATEST_UPDATES} />
            <FilterAndSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={CATEGORIES}
            />
            <UpdatesList
                filteredUpdates={filteredUpdates}
                handleDocumentClick={handleDocumentClick}
            />
            {/* <NewsletterSection /> */}
            <Footer />
        </div>
    );
};

export default LatestUpdatesPage;