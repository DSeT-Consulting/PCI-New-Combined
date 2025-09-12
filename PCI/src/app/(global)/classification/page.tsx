// src\app\(global)\classification\page.tsx
"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, Award, Eye, Heart, Brain, Ruler, Zap, Target, Info, User, FileText, Check, ExternalLink } from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';

// TypeScript interfaces
interface HeroContent {
    title: string;
    description: string;
}

interface Section {
    icon: IconType;
    title: string;
    description: string;
    note?: string;
    bgColor: string;
}

interface EligibilityRequirement {
    icon: IconType;
    title: string;
    description: string;
}

interface EligibilityContent {
    title: string;
    subtitle: string;
    requirements: EligibilityRequirement[];
}

interface Impairment {
    type: string;
    description: string;
    icon: IconType;
    color: string;
}

interface SportLink {
    name: string;
    link: string;
}

interface ClassificationPathwayContent {
    title: string;
    subtitle: string;
    requirements: string[];
    sportsLinks: SportLink[];
}

interface ClassificationConstants {
    hero: HeroContent;
    sections: {
        sportSpecific: Omit<Section, 'bgColor'>;
        sportClasses: Omit<Section, 'bgColor'>;
        governance: Omit<Section, 'bgColor'>;
    };
    sectionsNote: string;
    eligibility: EligibilityContent;
    impairments: Impairment[];
    classificationPathway: ClassificationPathwayContent;
}

type IconType = 'pyramid' | 'users' | 'building' | 'wheelchair' | 'user-check' | 'zap' | 'target' | 'user' | 'ruler' | 'brain' | 'eye';

interface IconComponentProps {
    type: IconType;
    className?: string;
}

// Classification page constants for easy editing
const CLASSIFICATION_CONSTANTS: ClassificationConstants = {
    hero: {
        title: "What Is Classification?",
        description: "Classification in Para athletics is a process used to determine which athletes are eligible to compete in the sport and to group athletes for competition based on the extent of their impairments. The goal is to minimize the impact of impairments on performance, ensuring fair competition."
    },

    sections: {
        sportSpecific: {
            icon: "pyramid",
            title: "Sport-Specific Nature Of Classification",
            description: "Classification is tailored to each sport because impairments affect performance differently depending on the sport. Therefore, an athlete may qualify for one sport but not for another. Simply having an impairment does not automatically qualify an athlete for Para sports."
        },

        sportClasses: {
            icon: "users",
            title: "Sport Classes",
            description: "Athletes are grouped into 'Sport Classes' based on the degree of activity limitation caused by their impairments. This system is analogous to grouping athletes by age, gender, or weight categories."
        },

        governance: {
            icon: "building",
            title: "Governance",
            description: "Classification in various Para sports is regulated by the International Paralympic Committee (IPC) Germany, Athlete Classification Code and Standards, which provide the framework and guidelines for fair and consistent classification across sports.",
        }
    },
    sectionsNote: "This overview is intended to provide a basic understanding of classification in Para sport. For detailed and sport-specific rules, refer to the official classification regulations of the respective sport.",

    eligibility: {
        title: "Eligibility",
        subtitle: "To be eligible to compete in Para athletics, a person must",
        requirements: [
            {
                icon: "wheelchair",
                title: "Have an eligible impairment.",
                description: "Must have one of the recognized eligible impairments"
            },
            {
                icon: "user-check",
                title: "Meet the minimum impairment criteria as defined by the respective sporting governing bodies.",
                description: "The impairment must meet specific minimum criteria"
            }
        ]
    },

    impairments: [
        {
            type: "Impaired Muscle Power",
            description: "Athletes with Impaired Muscle Power have a Health Condition that either reduces or eliminates their ability to voluntarily contract their muscles in order to move or to generate force. Examples: Spinal cord injury (complete or incomplete, tetra-or paraplegia or paraparesis), muscular dystrophy, post-polio syndrome, spina bifida etc.",
            icon: "zap",
            color: "from-red-500 to-orange-500"
        },
        {
            type: "Impaired passive range of movement",
            description: "Athletes with Impaired Passive Range of Movement have a restriction or a lack of passive movement in one or more joints. Examples: Arthrogryposis and contracture resulting from chronic joint immobilisation or trauma affecting a joint.",
            icon: "target",
            color: "from-blue-500 to-cyan-500"
        },
        {
            type: "Limb deficiency",
            description: "Athletes with Limb Deficiency have total or partial absence of bones or joints as a consequence of trauma (traumatic amputation), illness (bone cancer) or congenital limb deficiency (dysmelia).",
            icon: "user",
            color: "from-green-500 to-emerald-500"
        },
        {
            type: "Leg length difference",
            description: "Athletes with leg length difference have a difference in the length of their legs as a result of a disturbance of limb growth, and/or trauma.",
            icon: "ruler",
            color: "from-purple-500 to-pink-500"
        },
        {
            type: "Short Stature",
            description: "Athletes with Short Stature have a reduced length in the bones of the upper limbs, lower limbs and/or trunk. Examples: : Achondroplasia, growth hormone dysfunction, osteogenesis imperfecta etc.",
            icon: "user",
            color: "from-indigo-500 to-blue-500"
        },
        {
            type: "Hypertonia",
            description: "Athletes with Hypertonia have an increase in muscle tension and a reduced ability of a muscle to stretch caused by damage to the central nervous system. Examples: Cerebral palsy, traumatic brain injury (TBI), stroke etc.",
            icon: "brain",
            color: "from-yellow-500 to-orange-500"
        },
        {
            type: "Ataxia",
            description: "Athletes with Ataxia have uncoordinated movements caused by damage to the central nervous system. Examples: Cerebral palsy, TBI, stroke, multiple sclerosis etc.",
            icon: "brain",
            color: "from-teal-500 to-green-500"
        },
        {
            type: "Athetosis",
            description: "Athletes with Athetosis have continual slow involuntary movements. Examples: Cerebral palsy, TBI, stroke etc.",
            icon: "brain",
            color: "from-rose-500 to-pink-500"
        },
        {
            type: "Vision Impairment",
            description: "Athletes with Vision Impairment have reduced, or no vision caused by damage to the eye structure, optical nerves or optical pathways, or visual cortex of the brain. Examples: Retinitis pigmentosa, diabetic retinopathy etc.",
            icon: "eye",
            color: "from-amber-500 to-yellow-500"
        },
        {
            type: "Intellectual Impairment",
            description: "Athletes with an Intellectual Impairment have a restriction in intellectual functioning and adaptive behaviour in which affects conceptual, social and practical adaptive skills required for everyday life. This impairment must be present before the age of 18.",
            icon: "brain",
            color: "from-slate-500 to-gray-500"
        }
    ],

    classificationPathway: {
        title: "Pathway For Classification Of An Athlete",
        subtitle: "To license an Athlete, you will need the following",
        requirements: [
            "Athlete's profile in Sport Data Management Systems (SDMS)",
            "Copy of athlete's latest valid passport",
            "Latest photo with plain background (not older than one year)",
            "IPC athlete eligibility agreement",
            "Medical diagnostic form (MDF) - for athletes with visual impairment (VI) and physical impairment (PI) to be filled by registered medical practitioner (RMP)",
            "Supporting medical documentation includes but not restricted to: latest radiological scans, investigations, operative notes and discharge summary (if applicable).",
            "Intellectual impairment: athletes must meet the VIRTUS II I eligibility criteria and shall be listed on the VIRTUS international eligibility master list. It is the responsibility of the athlete and the NPC to submit a copy of training history & sporty activity limitations inventory - questionnaire (TSAL-Q) form via the SDMS online system.",
            "Athlete epilepsy declaration form - only for shooting para sport athletes"
        ],

        sportsLinks: [
            { name: "Para Athletics", link: "https://www.paralympic.org/athletics/documents" },
            { name: "Para Swimming", link: "https://www.paralympic.org/swimming/classification/npc-info" },
            { name: "Para Powerlifting", link: "https://www.paralympic.org/powerlifting/documents" },
            { name: "Para Shooting", link: "https://www.paralympic.org/shooting/classification" }
        ]
    }
};

// Component for the icon based on type
const IconComponent: React.FC<IconComponentProps> = ({ type, className = "w-8 h-8" }) => {
    const icons: Record<IconType, React.ReactElement> = {
        pyramid: (
            <div className={`${className} flex items-center justify-center`}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2l10 20H2L12 2z" />
                </svg>
            </div>
        ),
        users: <Users className={className} />,
        building: (
            <div className={`${className} flex items-center justify-center`}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2l8 4v10l-8 4-8-4V6l8-4z" />
                </svg>
            </div>
        ),
        wheelchair: (
            <div className={`${className} flex items-center justify-center`}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <circle cx="18" cy="18" r="6" />
                    <circle cx="6" cy="6" r="3" />
                    <path d="M12 12v6" />
                    <path d="M6 12h12" />
                </svg>
            </div>
        ),
        "user-check": (
            <div className={`${className} flex items-center justify-center relative`}>
                <User className="w-5 h-5" />
                <Check className="w-3 h-3 absolute translate-x-2 -translate-y-2" />
            </div>
        ),
        zap: <Zap className={className} />,
        target: <Target className={className} />,
        user: <User className={className} />,
        ruler: <Ruler className={className} />,
        brain: <Brain className={className} />,
        eye: <Eye className={className} />
    };

    return icons[type];
};

// Component for the hero section
const ClassificationHero: React.FC = () => {
    return (
        <section className="relative bg-gradient-to-br from-paralympic-blue via-paralympic-navy to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 scale-150"></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
                        {CLASSIFICATION_CONSTANTS.hero.title}
                    </h1>
                    <div className="w-24 h-1 bg-paralympic-yellow mx-auto mb-8"></div>
                    <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 animate-fade-in-up">
                        {CLASSIFICATION_CONSTANTS.hero.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

// Classification overview sections
const ClassificationOverview: React.FC = () => {
    const { sportSpecific, sportClasses, governance } = CLASSIFICATION_CONSTANTS.sections;

    const sections: Section[] = [
        {
            ...sportSpecific,
            bgColor: "from-emerald-500 to-teal-500"
        },
        {
            ...sportClasses,
            bgColor: "from-orange-500 to-red-500"
        },
        {
            ...governance,
            bgColor: "from-blue-500 to-indigo-500"
        }
    ];

    return (
        <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container mx-auto px-4 lg:px-8 space-y-16">
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 group hover:scale-105"
                        >
                            {/* Icon */}
                            <div className={`w-16 h-16 bg-gradient-to-br ${section.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                                <IconComponent type={section.icon} className="w-8 h-8 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl lg:text-2xl font-bold text-paralympic-navy mb-4 group-hover:text-paralympic-blue transition-colors">
                                {section.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {section.description}
                            </p>


                        </div>
                    ))}
                </div>

                {CLASSIFICATION_CONSTANTS.sectionsNote && (
                    <div className="bg-paralympic-blue/5 border border-paralympic-blue/20 rounded-lg p-4 mt-4">
                        <p className="text-sm text-paralympic-navy font-medium text-center">
                            {CLASSIFICATION_CONSTANTS.sectionsNote}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

// Eligibility section
const EligibilitySection: React.FC = () => {
    const { eligibility } = CLASSIFICATION_CONSTANTS;

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-paralympic-navy via-slate-800 to-paralympic-blue text-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                        {eligibility.title}
                    </h2>
                    <div className="w-24 h-1 bg-paralympic-yellow mx-auto mb-8"></div>
                    <p className="text-lg lg:text-xl text-gray-200">
                        {eligibility.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {eligibility.requirements.map((requirement, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 group"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-paralympic-yellow/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-paralympic-yellow/30 transition-colors">
                                <IconComponent type={requirement.icon} className="w-8 h-8 text-paralympic-yellow" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white">
                                {requirement.title}
                            </h3>
                            <p className="text-gray-200 leading-relaxed">
                                {requirement.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Impairments table component
const ImpairmentsTable: React.FC = () => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const toggleRow = (index: number): void => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-5xl font-bold text-paralympic-navy mb-6">
                            Eligible Impairments For Para Sport
                        </h2>
                        <div className="w-24 h-1 bg-paralympic-yellow mx-auto"></div>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-hidden rounded-2xl shadow-2xl border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-paralympic-navy to-paralympic-blue text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-lg font-semibold">Impairment Type</th>
                                    <th className="px-6 py-4 text-left text-lg font-semibold">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CLASSIFICATION_CONSTANTS.impairments.map((impairment, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            } hover:bg-paralympic-blue/5 transition-colors border-b border-gray-100`}
                                    >
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 bg-gradient-to-br ${impairment.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                    <IconComponent type={impairment.icon} className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="font-semibold text-paralympic-navy text-lg">
                                                    {impairment.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-gray-700 leading-relaxed">
                                            {impairment.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-4">
                        {CLASSIFICATION_CONSTANTS.impairments.map((impairment, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleRow(index)}
                                    className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-paralympic-blue focus:ring-inset"
                                    aria-expanded={expandedRow === index}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 bg-gradient-to-br ${impairment.color} rounded-xl flex items-center justify-center`}>
                                                <IconComponent type={impairment.icon} className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="font-semibold text-paralympic-navy">
                                                {impairment.type}
                                            </span>
                                        </div>
                                        {expandedRow === index ? (
                                            <ChevronUp className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        )}
                                    </div>
                                </button>

                                {expandedRow === index && (
                                    <div className="px-6 pb-4 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                                        {impairment.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Classification pathway section
const ClassificationPathway: React.FC = () => {
    const { classificationPathway } = CLASSIFICATION_CONSTANTS;

    const handleLinkClick = (link: string): void => {
        if (link !== '#') {
            window.open(link, '_blank');
        }
    };

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-5xl font-bold text-paralympic-navy mb-6">
                            {classificationPathway.title}
                        </h2>
                        <div className="w-24 h-1 bg-paralympic-yellow mx-auto mb-6"></div>
                        <p className="text-lg lg:text-xl text-gray-600">
                            {classificationPathway.subtitle}
                        </p>
                    </div>

                    {/* Requirements List */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 mb-12 border border-gray-100">
                        <div className="space-y-6">
                            {classificationPathway.requirements.map((requirement, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="w-8 h-8 bg-paralympic-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white font-bold text-sm">{index + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-700 leading-relaxed">
                                            {requirement}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sports Links Table */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        <div className="bg-gradient-to-r from-paralympic-navy to-paralympic-blue px-6 py-4">
                            <h3 className="text-lg font-semibold text-white">Sport-Specific Classification</h3>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {classificationPathway.sportsLinks.map((sport, index) => (
                                <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="w-8 h-8 bg-paralympic-blue/10 text-paralympic-blue rounded-full flex items-center justify-center font-semibold text-sm">
                                                {index + 1}
                                            </span>
                                            <span className="font-medium text-paralympic-navy">
                                                {sport.name}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleLinkClick(sport.link)}
                                            className="inline-flex items-center gap-2 text-paralympic-blue hover:text-paralympic-navy font-medium transition-colors"
                                            aria-label={`Open ${sport.name} classification details`}
                                        >
                                            <span>Click Here</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Main Classification Page Component
const ClassificationPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {/* Skip to main content for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-paralympic-blue text-white px-4 py-2 rounded-lg font-medium z-50"
            >
                Skip to main content
            </a>

            <main id="main-content" role="main">
                <ClassificationHero />
                <ClassificationOverview />
                <EligibilitySection />
                <ImpairmentsTable />
                <ClassificationPathway />
            </main>
            <Footer />
        </div>
    );
};

export default ClassificationPage;