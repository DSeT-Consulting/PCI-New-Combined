"use client"

import React from 'react';
import {
    Calendar,
    Clock,
    Users,
    User,
    FileText,
    Trophy,
    Info,
    ArrowLeft,
    Mail,
    ExternalLink,
    AlertCircle,
    CheckCircle,
    Globe,
    Link as LinkIcon,
    Accessibility
} from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import Link from 'next/link';

// Championship info constants
const CHAMPIONSHIP_INFO = {
    classificationDates: "23-26 September 2025"
};

// Classification requirements interface
interface ClassificationRequirement {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    details: string[];
}

// Classification requirements data
const CLASSIFICATION_REQUIREMENTS: ClassificationRequirement[] = [
    {
        icon: Clock,
        title: "Arrive 30 minutes early",
        description: "Athletes must present to the classification 30 minutes before the allocated time on the classification schedule",
        details: [
            "Check the classification schedule regularly for updates",
            "Allow extra time for travel and preparation",
            "Late arrivals may result in missed classification slots",
            "Reschedule requests should be made immediately if delays occur"
        ]
    },
    {
        icon: FileText,
        title: "Bring passport and accreditation",
        description: "Athletes must bring a passport along with their accreditation",
        details: [
            "Original passport required (not photocopies)",
            "Valid accreditation badge must be worn",
            "Additional photo ID may be requested",
            "Ensure all documents are current and valid"
        ]
    },
    {
        icon: User,
        title: "Support person required",
        description: "Athletes must be accompanied by one support person proficient in English",
        details: [
            "Support person must be proficient in English for communication",
            "Could be coach, team official, or designated support staff",
            "Support person should understand athlete's impairment",
            "Maximum one support person per athlete allowed"
        ]
    },
    {
        icon: Users,
        title: "Appropriate sports attire",
        description: "Athletes should be appropriately dressed in sports clothes. We recommend wearing shorts for the classification evaluation",
        details: [
            "Wear shorts to allow proper assessment of lower limbs",
            "Comfortable athletic clothing recommended",
            "Avoid restrictive clothing that may interfere with evaluation",
            "Bring additional clothing layers if needed"
        ]
    },
    {
        icon: Trophy,
        title: "Competition equipment",
        description: "Must bring all sports equipment and competition clothing including shoes to be used in competition (for technical assessment)",
        details: [
            "Racing wheelchair (if applicable)",
            "Throwing implements and seats",
            "Prosthetics or orthoses used in competition",
            "Competition spikes and clothing",
            "Any adaptive equipment or aids"
        ]
    }
];

// Impairment categories
const IMPAIRMENT_CATEGORIES = [
    {
        title: "Physical Impairment",
        description: "Athletes with limb deficiencies, muscle weakness, or joint restrictions",
        classRange: "T/F11-T/F20, T/F31-T/F38, T/F40-T/F47, T/F51-T/F57",
        examples: ["Limb deficiency", "Muscle weakness", "Joint restrictions", "Short stature"]
    },
    {
        title: "Vision Impairment",
        description: "Athletes who are blind or have visual impairments",
        classRange: "T/F11-T/F13",
        examples: ["Total blindness", "Partial sight", "Light perception", "Visual field defects"]
    },
    {
        title: "Intellectual Impairment",
        description: "Athletes with intellectual impairments affecting cognitive function",
        classRange: "T/F20",
        examples: ["Intellectual disability", "Cognitive impairment", "Learning difficulties"]
    }
];

// Page Header Component
const PageHeader: React.FC = () => (
    <section className="relative bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-purple-900 text-white py-12 sm:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-paralympic-green rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-paralympic-yellow rounded-full blur-lg"></div>
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
                    <Accessibility className="h-4 w-4 text-paralympic-green" />
                    <span className="font-medium text-sm">Classification Information</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Classification
                    <span className="block text-paralympic-green">Information</span>
                </h1>

                <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                    Everything you need to know about the classification process, schedule, requirements, and procedures for the New Delhi 2025 Championships.
                </p>
            </div>
        </div>
    </section>
);

// Quick Overview Component
const QuickOverview: React.FC = () => (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <Calendar className="h-8 w-8 text-paralympic-blue mx-auto mb-4" />
                    <div className="text-lg font-bold text-gray-900 mb-2">4 Days</div>
                    <div className="text-sm text-gray-600">Classification Period</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <Users className="h-8 w-8 text-paralympic-green mx-auto mb-4" />
                    <div className="text-lg font-bold text-gray-900 mb-2">5</div>
                    <div className="text-sm text-gray-600">Key Requirements</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <Accessibility className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                    <div className="text-lg font-bold text-gray-900 mb-2">3</div>
                    <div className="text-sm text-gray-600">Impairment Types</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-4" />
                    <div className="text-lg font-bold text-gray-900 mb-2">50+</div>
                    <div className="text-sm text-gray-600">Sport Classes</div>
                </div>
            </div>
        </div>
    </section>
);

// Classification Schedule Component
const ClassificationSchedule: React.FC = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Schedule Information */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-paralympic-blue/5 to-purple-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Calendar className="h-6 w-6 text-paralympic-blue" />
                            Classification Schedule
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-paralympic-blue/10 rounded-lg">
                                    <Calendar className="h-6 w-6 text-paralympic-blue" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Classification Days</div>
                                    <div className="text-gray-600">{CHAMPIONSHIP_INFO.classificationDates}</div>
                                    <div className="text-sm text-gray-500 mt-1">4 days before competition begins</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <div className="font-semibold text-yellow-800 mb-2">Important Notice</div>
                                    <p className="text-yellow-700 text-sm">
                                        We are expecting that all athletes who need classification will be present for all days of classification. Therefore, please make sure to plan for this in your travel arrangements.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-blue-800 mb-2">Schedule Release</div>
                                    <p className="text-blue-700 text-sm">
                                        The first version of the classification schedule is due at the end of August 2025. Updates will be communicated to teams promptly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Mail className="h-6 w-6 text-paralympic-green" />
                            Contact Information
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <div className="font-semibold text-gray-900 mb-3">Classification Team</div>
                                <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg">
                                    <LinkIcon className="h-5 w-5 text-paralympic-blue" />
                                    <div>
                                        <div className="font-medium text-gray-900">Email</div>
                                        <div className="text-paralympic-blue break-all">classification@worldparaathletics.org</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="font-semibold text-gray-900 mb-3">Team Questions</div>
                                <p className="text-gray-600 text-sm mb-4">
                                    For teams that have questions about classification procedures, requirements, or scheduling, please contact World Para Athletics through the provided link.
                                </p>
                                <Link
                                    href="https://forms.office.com/pages/responsepage.aspx?id=0bw-rXQtCEmH-W51IjGQgg3w0_8mbTpNsffaUdGn8a1UQVBBOUdXMUVRMlFXU0dTTEFDSEhBU0gzNS4u&route=shorturl"
                                    target='_blank'
                                    className="inline-flex items-center gap-2 bg-paralympic-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Submit Team Question
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Classification Requirements Component
const ClassificationRequirements: React.FC = () => (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Classification Requirements</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Essential requirements that all athletes must follow for their classification session
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                {CLASSIFICATION_REQUIREMENTS.map((requirement: ClassificationRequirement, index: number) => (
                    <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="flex gap-4 items-center md:flex-shrink-0">
                                <div className="p-4 bg-paralympic-blue/10 rounded-xl flex-shrink-0">
                                    <requirement.icon className="h-8 w-8 text-paralympic-blue" />
                                </div>
                                <h4 className="md:hidden text-xl font-bold text-gray-900">{requirement.title}</h4>
                            </div>

                            <div className="flex-grow">
                                <h4 className="hidden md:block text-xl font-bold text-gray-900 mb-3">{requirement.title}</h4>
                                <p className="text-gray-600 mb-4">{requirement.description}</p>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h5 className="font-semibold text-gray-900 mb-3">Additional Details:</h5>
                                    <ul className="space-y-2">
                                        {requirement.details.map((detail: string, detailIndex: number) => (
                                            <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// Impairment Categories Component
const ImpairmentCategories: React.FC = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Impairment Categories</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Understanding the different impairment categories and their corresponding sport classes
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {IMPAIRMENT_CATEGORIES.map((category, index) => (
                    <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
                        <div className="p-3 bg-purple-600/10 rounded-xl w-fit mb-6">
                            <Accessibility className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                        <p className="text-gray-700 mb-4">{category.description}</p>

                        <div className="bg-white/60 rounded-lg p-4 mb-4">
                            <div className="text-sm font-semibold text-gray-900 mb-2">Sport Classes:</div>
                            <div className="text-sm text-gray-600 font-mono">{category.classRange}</div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm font-semibold text-gray-900">Examples:</div>
                            {category.examples.map((example: string, exampleIndex: number) => (
                                <div key={exampleIndex} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                    <span className="text-sm text-gray-700">{example}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
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
                        <Calendar className="h-8 w-8 text-paralympic-blue mb-4" />
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
                <Link href="/wpa-new-delhi-2025/documents" className="block">
                    <div className="h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <FileText className="h-8 w-8 text-purple-600 mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Documents</h3>
                        <p className="text-gray-600 text-sm">Access qualification criteria and guides</p>
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
const ClassificationPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <PageHeader />
            <QuickOverview />
            <ClassificationSchedule />
            <ClassificationRequirements />
            <ImpairmentCategories />
            <RelatedLinks />
            <Footer />
        </div>
    );
};

export default ClassificationPage;