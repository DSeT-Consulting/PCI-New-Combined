"use client"

import React, { useState } from 'react';
import {
    Heart,
    Mail,
    Phone,
    MessageCircle,
    Clock,
    Users,
    Globe,
    ExternalLink,
    ArrowLeft,
    HelpCircle,
    FileText,
    Calendar,
    MapPin,
    Trophy,
    CheckCircle,
    AlertCircle,
    Send,
    User,
    Building,
    Info
} from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import Link from 'next/link';

// Support categories interface
interface SupportCategory {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    faqs: FAQ[];
}

// FAQ interface
interface FAQ {
    question: string;
    answer: string;
}

// Support categories data
const SUPPORT_CATEGORIES: SupportCategory[] = [
    {
        id: 'registration',
        title: 'Registration & Entry',
        description: 'Help with team registration, entry procedures, and qualification questions',
        icon: Users,
        color: 'bg-blue-500',
        faqs: [
            {
                question: 'When is the deadline for entry by name?',
                answer: 'The deadline for online entry by name (final entry deadline) is August 8, 2025. No changes in the entries will be accepted after this date.'
            },
            {
                question: 'How do I apply for a direct invitation?',
                answer: 'Direct invitation applications can be submitted from June 2, 2025 to August 4, 2025. WPA will confirm direct invitation approvals to NPCs by August 6, 2025.'
            },
            {
                question: 'What is the difference between entry by number and entry by name?',
                answer: 'Entry by number provides team size estimates for planning purposes (deadline: July 7, 2025), while entry by name provides specific athlete details for final entries (deadline: August 8, 2025).'
            }
        ]
    },
    {
        id: 'classification',
        title: 'Classification',
        description: 'Questions about classification procedures, requirements, and scheduling',
        icon: Trophy,
        color: 'bg-green-500',
        faqs: [
            {
                question: 'When does classification take place?',
                answer: 'Classification will take place from September 23-26, 2025, four days before the competition begins.'
            },
            {
                question: 'What do athletes need to bring for classification?',
                answer: 'Athletes must bring their passport, accreditation, all competition equipment and clothing, and be accompanied by one English-proficient support person.'
            },
            {
                question: 'How early should athletes arrive for classification?',
                answer: 'Athletes must present to classification 30 minutes before their allocated time on the classification schedule.'
            }
        ]
    },
    {
        id: 'accommodation',
        title: 'Accommodation & Travel',
        description: 'Information about accommodation packages, travel arrangements, and logistics',
        icon: Building,
        color: 'bg-purple-500',
        faqs: [
            {
                question: 'Are accommodation packages mandatory?',
                answer: 'Accommodation packages are not mandatory, but they are recommended for convenience and proximity to the venue. Details are available in the accommodation package document.'
            },
            {
                question: 'When should teams arrive in New Delhi?',
                answer: 'Teams with athletes requiring classification should arrive by September 22, 2025 to ensure availability for all classification days (September 23-26).'
            },
            {
                question: 'Is transportation provided to the venue?',
                answer: 'Transportation details will be provided in the final team manual. Official accommodation packages typically include venue transportation.'
            }
        ]
    },
    {
        id: 'technical',
        title: 'Technical & Competition',
        description: 'Competition format, technical regulations, and event-specific queries',
        icon: FileText,
        color: 'bg-orange-500',
        faqs: [
            {
                question: 'How many medal events will there be?',
                answer: 'The New Delhi 2025 Championships will feature 186 medal events total: 101 men\'s events, 84 women\'s events, and 1 mixed event.'
            },
            {
                question: 'What is the competition format?',
                answer: 'The competition format follows World Para Athletics rules. Specific event formats and rounds are detailed in the Medal Event Programme document.'
            },
            {
                question: 'Are there equipment regulations?',
                answer: 'All equipment must comply with World Para Athletics technical regulations. Athletes should bring all competition equipment for classification technical assessment.'
            }
        ]
    }
];

// Contact information
const CONTACT_INFO = {
    classification: {
        email: 'classification@worldparaathletics.org',
        description: 'For classification-related questions and concerns'
    },
    general: {
        email: 'info@newdelhi2025.org',
        description: 'For general championship information and team questions'
    },
    technical: {
        email: 'technical@worldparaathletics.org',
        description: 'For technical regulations and competition format questions'
    }
};

// Page Header Component
const PageHeader: React.FC = () => (
    <section className="relative bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-purple-900 text-white py-16 sm:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full blur-xl"></div>
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
                    <Heart className="h-4 w-4 text-orange-300" />
                    <span className="font-medium text-sm">Team Support</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Team Support &
                    <span className="block text-orange-300">Question Box</span>
                </h1>

                <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                    Get help with registration, qualification questions, event logistics, and any other inquiries about the New Delhi 2025 World Para Athletics Championships.
                </p>
            </div>
        </div>
    </section>
);

// Quick Support Stats Component
const QuickSupportStats: React.FC = () => (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <Clock className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">24/7</div>
                    <div className="text-sm text-gray-600">Support Available</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <Globe className="h-8 w-8 text-green-500 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">5+</div>
                    <div className="text-sm text-gray-600">Languages</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <MessageCircle className="h-8 w-8 text-purple-500 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">4</div>
                    <div className="text-sm text-gray-600">Support Categories</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                    <CheckCircle className="h-8 w-8 text-orange-500 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">100%</div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                </div>
            </div>
        </div>
    </section>
);

// Support Categories Component
const SupportCategoriesSection: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('registration');
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    const currentCategory = SUPPORT_CATEGORIES.find(cat => cat.id === selectedCategory);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Choose a category below to find answers to common questions or get direct support from our team
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Category Tabs */}
                    <div className="grid md:grid-cols-4 gap-4 mb-12">
                        {SUPPORT_CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                                    selectedCategory === category.id
                                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                }`}
                            >
                                <category.icon className="h-8 w-8 mb-4" />
                                <h3 className="font-bold mb-2">{category.title}</h3>
                                <p className="text-sm opacity-90">{category.description}</p>
                            </button>
                        ))}
                    </div>

                    {/* Selected Category Content */}
                    {currentCategory && (
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-3 ${currentCategory.color} rounded-xl`}>
                                    <currentCategory.icon className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{currentCategory.title}</h3>
                                    <p className="text-gray-600">{currentCategory.description}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h4>
                                {currentCategory.faqs.map((faq, index) => (
                                    <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <button
                                            onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-medium text-gray-900">{faq.question}</span>
                                            <HelpCircle className={`h-5 w-5 text-gray-400 transition-transform ${
                                                expandedFAQ === index ? 'rotate-180' : ''
                                            }`} />
                                        </button>
                                        {expandedFAQ === index && (
                                            <div className="px-4 pb-4 border-t border-gray-100">
                                                <p className="text-gray-700 pt-3">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// Contact Information Component
const ContactInformation: React.FC = () => (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Direct Contact</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Need personalized assistance? Contact our dedicated support teams directly
                </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
                {/* Classification Support */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="p-3 bg-green-100 rounded-xl w-fit mb-6">
                        <Trophy className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Classification Team</h3>
                    <p className="text-gray-600 mb-6">{CONTACT_INFO.classification.description}</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <a href={`mailto:${CONTACT_INFO.classification.email}`} className="text-blue-600 hover:underline break-all">
                                {CONTACT_INFO.classification.email}
                            </a>
                        </div>
                    </div>
                </div>

                {/* General Support */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="p-3 bg-blue-100 rounded-xl w-fit mb-6">
                        <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">General Support</h3>
                    <p className="text-gray-600 mb-6">{CONTACT_INFO.general.description}</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <a href={`mailto:${CONTACT_INFO.general.email}`} className="text-blue-600 hover:underline break-all">
                                {CONTACT_INFO.general.email}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Technical Support */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="p-3 bg-orange-100 rounded-xl w-fit mb-6">
                        <FileText className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Team</h3>
                    <p className="text-gray-600 mb-6">{CONTACT_INFO.technical.description}</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <a href={`mailto:${CONTACT_INFO.technical.email}`} className="text-blue-600 hover:underline break-all">
                                {CONTACT_INFO.technical.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Team Question Form Component
const TeamQuestionForm: React.FC = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Submit a Team Question</h2>
                    <p className="text-lg text-gray-600">
                        Can&apos;t find the answer you&apos;re looking for? Submit your question directly to our support team
                    </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                        <div className="text-center mb-8">
                            <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                                <MessageCircle className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Official Team Question Form</h3>
                            <p className="text-gray-600 mb-6">
                                Use the official World Para Athletics form to submit detailed questions about registration,
                                classification, competition format, or any other championship-related topics.
                            </p>
                            <Link
                                href="https://forms.office.com/pages/responsepage.aspx?id=0bw-rXQtCEmH-W51IjGQgg3w0_8mbTpNsffaUdGn8a1UQVBBOUdXMUVRMlFXU0dTTEFDSEhBU0gzNS4u&route=shorturl"
                                target='_blank'
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                <ExternalLink className="h-5 w-5" />
                                Open Question Form
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">What to Include:</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        Your team/country name
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        Specific question or concern
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        Relevant dates or deadlines
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        Contact information for follow-up
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Response Time:</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <Clock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        General questions: 24-48 hours
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Clock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        Technical questions: 2-3 business days
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Clock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        Urgent matters: Same day response
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
                        <Trophy className="h-8 w-8 text-paralympic-blue mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Competition Info</h3>
                        <p className="text-gray-600 text-sm">Event details and venue information</p>
                    </div>
                </Link>
                <Link href="/wpa-new-delhi-2025/timeline" className="block">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <Clock className="h-8 w-8 text-paralympic-red mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Timeline</h3>
                        <p className="text-gray-600 text-sm">Important dates and deadlines</p>
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
            </div>
        </div>
    </section>
);

// Main Component
const SupportPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <PageHeader />
            <QuickSupportStats />
            <SupportCategoriesSection />
            <ContactInformation />
            <TeamQuestionForm />
            <RelatedLinks />
            <Footer />
        </div>
    );
};

export default SupportPage;