"use client"

import React, { useState } from 'react';
import {
    FileText,
    Download,
    ExternalLink,
    ArrowLeft,
    Calendar,
    Trophy,
    Users,
    Globe,
    Search,
    Filter,
    Star,
    Clock,
    Building,
    CreditCard,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import Link from 'next/link';

// Document interface
interface KeyDocument {
    title: string;
    description: string;
    type: string;
    link: string;
    isNew?: boolean;
    category: 'qualification' | 'accommodation' | 'accreditation' | 'schedule' | 'general';
    priority: 'high' | 'medium' | 'low';
    lastUpdated: string;
}

// Documents data
const KEY_DOCUMENTS: KeyDocument[] = [
    {
        title: "Qualification Criteria",
        description: "Official qualification criteria for the championships including minimum entry standards and qualification periods",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-02/New%20Delhi%202025_Qualification%20Criteria%20and%20Event%20Programme.pdf",
        category: "qualification",
        priority: "high",
        lastUpdated: "February 2025"
    },
    {
        title: "Medal Event Programme",
        description: "Complete information about the medal event programme, including all events, rounds, and competition format",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-02/New%20Delhi%202025%20World%20Para%20Athletics%20Championships%20Event%20Programme_17%20February%202025.pdf",
        category: "schedule",
        priority: "high",
        lastUpdated: "February 2025"
    },
    {
        title: "Accommodation Package",
        description: "Comprehensive details about accommodation options, packages, pricing, and booking procedures for teams",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-05/V7.1%20New%20Delhi%202025%20World%20Para%20Athletics%20Championships.pdf",
        isNew: true,
        category: "accommodation",
        priority: "medium",
        lastUpdated: "May 2025"
    },
    {
        title: "Accreditation Announcement",
        description: "Important information about accreditation process, requirements, deadlines, and procedures for all personnel",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-07/New%20Delhi%202025_NPC%20Accreditation%20Announcement.pdf",
        category: "accreditation",
        priority: "high",
        lastUpdated: "July 2025"
    },
    {
        title: "Accreditation User Guide",
        description: "Step-by-step guide for completing the accreditation process, including system navigation and document requirements",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-07/New%20Delhi%202025_NPC%20Accreditation%20User%20Guide.pdf",
        category: "accreditation",
        priority: "medium",
        lastUpdated: "July 2025"
    },
    {
        title: "Competition Schedule",
        description: "Complete competition schedule for all events including session times, venue assignments, and daily programme",
        type: "pdf",
        link: "https://www.paralympic.org/sites/default/files/2025-05/2025_05_08_New%20Delhi%202025%20Competition%20Schedule%20V3.0.pdf",
        isNew: true,
        category: "schedule",
        priority: "high",
        lastUpdated: "May 2025"
    }
];

// Document categories
const DOCUMENT_CATEGORIES = [
    { id: 'all', name: 'All Documents', icon: FileText, count: KEY_DOCUMENTS.length },
    { id: 'qualification', name: 'Qualification', icon: Trophy, count: KEY_DOCUMENTS.filter(doc => doc.category === 'qualification').length },
    { id: 'schedule', name: 'Schedule', icon: Calendar, count: KEY_DOCUMENTS.filter(doc => doc.category === 'schedule').length },
    { id: 'accreditation', name: 'Accreditation', icon: Users, count: KEY_DOCUMENTS.filter(doc => doc.category === 'accreditation').length },
    { id: 'accommodation', name: 'Accommodation', icon: Building, count: KEY_DOCUMENTS.filter(doc => doc.category === 'accommodation').length },
];

// Page Header Component
const PageHeader: React.FC = () => (
    <section className="relative bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-purple-900 text-white py-12 sm:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-xl"></div>
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
                    <FileText className="h-4 w-4 text-purple-300" />
                    <span className="font-medium text-sm">Key Documents</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Essential
                    <span className="block text-purple-300">Documents</span>
                </h1>

                <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                    Access all important documents including qualification criteria, competition schedules, accreditation guides, and accommodation information.
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
                    <FileText className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">{KEY_DOCUMENTS.length}</div>
                    <div className="text-sm text-gray-600">Total Documents</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <Star className="h-8 w-8 text-paralympic-yellow mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">{KEY_DOCUMENTS.filter(doc => doc.isNew).length}</div>
                    <div className="text-sm text-gray-600">Recently Updated</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <AlertCircle className="h-8 w-8 text-paralympic-red mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">{KEY_DOCUMENTS.filter(doc => doc.priority === 'high').length}</div>
                    <div className="text-sm text-gray-600">High Priority</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <CheckCircle className="h-8 w-8 text-paralympic-green mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">5</div>
                    <div className="text-sm text-gray-600">Categories</div>
                </div>
            </div>
        </div>
    </section>
);

// Documents Section Component
const DocumentsSection: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocuments = KEY_DOCUMENTS.filter(doc => {
        const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'qualification': return <Trophy className="h-5 w-5" />;
            case 'schedule': return <Calendar className="h-5 w-5" />;
            case 'accreditation': return <Users className="h-5 w-5" />;
            case 'accommodation': return <Building className="h-5 w-5" />;
            default: return <FileText className="h-5 w-5" />;
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Document Library</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Browse and download all essential documents for the New Delhi 2025 World Para Athletics Championships
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="max-w-6xl mx-auto mb-12">
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search documents..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category Filters */}
                    {/* <div className="flex flex-wrap gap-3 justify-center">
                        {DOCUMENT_CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    selectedCategory === category.id
                                        ? 'bg-purple-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <category.icon className="h-4 w-4" />
                                <span>{category.name}</span>
                                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div> */}
                </div>

                {/* Documents Grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDocuments.map((doc: KeyDocument, index: number) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 border border-gray-100">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                                        {getCategoryIcon(doc.category)}
                                    </div>
                                    {/* <div className="flex gap-2">
                                        {doc.isNew && (
                                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                                NEW
                                            </span>
                                        )}
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(doc.priority)}`}>
                                            {doc.priority.charAt(0).toUpperCase() + doc.priority.slice(1)}
                                        </span>
                                    </div> */}
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-3">{doc.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{doc.description}</p>

                                {/* <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Updated {doc.lastUpdated}
                                    </span>
                                    <span className="uppercase font-medium">{doc.type}</span>
                                </div> */}

                                <Link href={doc.link} target='_blank' className="block">
                                    <button className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors group">
                                        <ExternalLink className="h-4 w-4" />
                                        <span>View Document</span>
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {filteredDocuments.length === 0 && (
                        <div className="text-center py-12">
                            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
                            <p className="text-gray-600">Try adjusting your search terms or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// Important Notice Component
const ImportantNotice: React.FC = () => (
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-yellow-500">
                    <div className="flex flex-col md:flex-row items-start gap-4">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <AlertCircle className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Document Updates & Notifications</h3>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    <strong>Stay Updated:</strong> Documents may be updated as we approach the championships.
                                    Check this page regularly for the latest versions and new releases.
                                </p>
                                <p>
                                    <strong>Official Source:</strong> All documents are sourced directly from World Para Athletics
                                    and the Paralympic Movement. Always use the latest versions for accurate information.
                                </p>
                                <p>
                                    <strong>Questions:</strong> If you have questions about any document or need clarification,
                                    please contact the support team through our official channels.
                                </p>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <Link href="/wpa-new-delhi-2025/competition-info" className="block">
                    <div className="h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Trophy className="h-8 w-8 text-paralympic-blue mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Competition Info</h3>
                        <p className="text-gray-600 text-sm">Event details and venue information</p>
                    </div>
                </Link>
                <Link href="/wpa-new-delhi-2025/timeline" className="block">
                    <div className="h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Clock className="h-8 w-8 text-paralympic-red mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Timeline</h3>
                        <p className="text-gray-600 text-sm">Important dates and deadlines</p>
                    </div>
                </Link>
                <Link href="/wpa-new-delhi-2025/classification" className="block">
                    <div className="h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Users className="h-8 w-8 text-paralympic-green mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Classification</h3>
                        <p className="text-gray-600 text-sm">Classification requirements and process</p>
                    </div>
                </Link>
                <Link href="/wpa-new-delhi-2025/support" className="block">
                    <div className="h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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
const DocumentsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <PageHeader />
            <QuickStats />
            <DocumentsSection />
            <ImportantNotice />
            <RelatedLinks />
            <Footer />
        </div>
    );
};

export default DocumentsPage;