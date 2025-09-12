// src\app\(global)\committee-members\page.tsx

import React from 'react';
import { Users, Award, Heart, Target, Shield, Globe } from 'lucide-react';
import Image from 'next/image';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';

// Type definitions
interface CommitteeMember {
    id: number;
    name: string;
    position: string;
    description: string;
    image: string;
    category: 'executive' | 'management' | 'committee';
}

interface MemberCardProps {
    member: CommitteeMember;
}

interface StatItem {
    icon: React.ComponentType<{ className?: string }>;
    value: string;
    label: string;
    color: string;
}

// Constants for easy management and future admin panel integration
const COMMITTEE_CONSTANTS = {
    pageTitle: "Committee Members",
    pageSubtitle: "Meet the dedicated leaders driving our Paralympic mission forward",
    sectionTitle: "Elected Governing Body (2024-2028)",
    sectionDescription: "Our governing body comprises experienced professionals, Paralympic champions, and dedicated advocates working together to advance Paralympic sport and empower athletes with disabilities.",

    // Committee members data with proper typing
    members: [
        // Executive Committee
        {
            id: 1,
            name: "Devendra Jhajharia",
            position: "President",
            description: "2 times Paralympic Gold Medalist, Padma Bhushan Awardee",
            image: "/assets/committee/devendra-jhajharia.png",
            category: "executive" as const
        },
        {
            id: 2,
            name: "Chandrasekar Rajan",
            position: "Vice President",
            description: "Social Worker, President of Tamil Nadu Paralympic Sports Association",
            image: "/assets/committee/chandrasekar-rajan.png",
            category: "executive" as const
        },
        {
            id: 3,
            name: "Satya Parkash Sangwan",
            position: "Vice President",
            description: "International Mother Teresa Awardee",
            image: "/assets/committee/satya-parkash-sangwan.png",
            category: "executive" as const
        },
        {
            id: 4,
            name: "Jayawant Gundu Hamanawar",
            position: "Secretary General",
            description: "International Technical official",
            image: "/assets/committee/jayawant-gundu.png",
            category: "executive" as const
        },

        // Management Team
        {
            id: 5,
            name: "Lalit",
            position: "Joint Secretary",
            description: "Qualified National Athletics Coach, Secretary of Himachal Pradesh Parasports Association",
            image: "/assets/committee/lalit.png",
            category: "management" as const
        },
        {
            id: 6,
            name: "Diwakara Thimmegowda",
            position: "Joint Secretary",
            description: "IPC Qualified Athletics Coach",
            image: "/assets/committee/diwakara-thimmegowda.png",
            category: "management" as const
        },
        {
            id: 7,
            name: "Sunil Pradhan",
            position: "Treasurer",
            description: "International Para Badminton Player",
            image: "/assets/committee/sunil-pradhan.png",
            category: "management" as const
        },
        {
            id: 8,
            name: "Dr Sutapa Chakraborty",
            position: "Executive Committee Member",
            description: "Government Service",
            image: "/assets/committee/dr-sutapa-chakraborty.png",
            category: "management" as const
        },

        // Committee Members
        {
            id: 9,
            name: "Bhati Chandulal Tarachandji",
            position: "Executive Committee Member",
            description: "Former International Para Athlete",
            image: "/assets/committee/bhati-chandulal.png",
            category: "committee" as const
        },
        {
            id: 10,
            name: "Sandeep Kumar",
            position: "Executive Committee Member",
            description: "International Para Athlete, Secretary of Bihar Para Sports Association",
            image: "/assets/committee/sandeep-kumar.png",
            category: "committee" as const
        },
        {
            id: 11,
            name: "Shaminder Singh Dhillon",
            position: "Executive Committee Member",
            description: "Social Worker",
            image: "/assets/committee/shaminder-singh.png",
            category: "committee" as const
        },
        {
            id: 12,
            name: "Singarapu Babu",
            position: "Executive Committee Member",
            description: "International Para Volleyball Player",
            image: "/assets/committee/singarapu-babu.png",
            category: "committee" as const
        }
    ] as CommitteeMember[]
};

// Hero Section Component
const CommitteeHero: React.FC = () => {
    return (
        <section className="relative bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/30 rounded-full animate-pulse-slow"></div>
                <div className="absolute top-40 right-32 w-24 h-24 border-2 border-paralympic-yellow/40 rounded-full animate-float"></div>
                <div className="absolute bottom-32 left-40 w-16 h-16 bg-paralympic-red/20 rounded-full animate-bounce-slow"></div>
                <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-paralympic-green/30 rounded-full animate-pulse-slow"></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center mb-6">
                        <Users className="w-16 h-16 text-paralympic-yellow mr-4" />
                        <Shield className="w-12 h-12 text-paralympic-green" />
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
                        {COMMITTEE_CONSTANTS.pageTitle}
                    </h1>

                    <div className="w-24 h-1 bg-paralympic-yellow mx-auto mb-8"></div>

                    <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 animate-fade-in-up">
                        {COMMITTEE_CONSTANTS.pageSubtitle}
                    </p>
                </div>
            </div>
        </section>
    );
};

// Committee Stats Component
const CommitteeStats: React.FC = () => {
    const stats: StatItem[] = [
        {
            icon: Award,
            value: "12",
            label: "Committee Members",
            color: "text-paralympic-blue"
        },
        {
            icon: Target,
            value: "4",
            label: "Years Term",
            color: "text-paralympic-green"
        },
        {
            icon: Globe,
            value: "28",
            label: "States Represented",
            color: "text-paralympic-red"
        },
        {
            icon: Heart,
            value: "100%",
            label: "Dedicated to Athletes",
            color: "text-paralympic-yellow"
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                                <div className="text-3xl md:text-4xl font-bold text-paralympic-navy mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Member Card Component
const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-paralympic-blue/20">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="aspect-[4/5] flex items-center justify-center">
                    {/* <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                        <Users className="w-16 h-16 text-gray-500" />
                       
                    </div> */}
                     <Image
                            src={member.image}
                            width="300"
                            height="400"
                            alt={member.name}
                            className="w-auto h-full object-cover rounded-t-lg"
                        />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-paralympic-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white w-full">
                        <div className="text-sm font-medium opacity-90">Click for more details</div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-paralympic-navy mb-2 group-hover:text-paralympic-blue transition-colors">
                    {member.name}
                </h3>

                <div className="inline-block bg-gradient-to-r from-paralympic-blue to-paralympic-green text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                    {member.position}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                </p>
            </div>
        </div>
    );
};

// Committee Section Component
const CommitteeSection: React.FC = () => {
    const { members } = COMMITTEE_CONSTANTS;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-paralympic-navy mb-6">
                        {COMMITTEE_CONSTANTS.sectionTitle}
                    </h2>
                    <div className="w-24 h-1 bg-paralympic-yellow mx-auto mb-8"></div>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        {COMMITTEE_CONSTANTS.sectionDescription}
                    </p>
                </div>

                {/* Executive Committee */}
                <div className="mb-16">
                    {/* <h3 className="text-2xl md:text-3xl font-bold text-paralympic-navy mb-8 text-center">
            Executive Leadership
          </h3> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {COMMITTEE_CONSTANTS.members.map((member: CommitteeMember) => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Mission Statement Component
const MissionStatement: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-paralympic-blue via-paralympic-navy to-slate-900 text-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                        Our Commitment
                    </h2>
                    <div className="w-24 h-1 bg-paralympic-yellow mx-auto mb-8"></div>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-8">
                        Together, we are dedicated to creating an inclusive sporting environment where every Paralympic athlete can achieve excellence, inspire communities, and break barriers. Our governing body works tirelessly to ensure equal opportunities, world-class support systems, and recognition for all Paralympic sports.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="text-center">
                            <Target className="w-12 h-12 text-paralympic-yellow mx-auto mb-4" />
                            <h4 className="text-xl font-bold mb-2">Excellence</h4>
                            <p className="text-gray-300">Striving for the highest standards in Paralympic sport</p>
                        </div>
                        <div className="text-center">
                            <Heart className="w-12 h-12 text-paralympic-red mx-auto mb-4" />
                            <h4 className="text-xl font-bold mb-2">Inclusion</h4>
                            <p className="text-gray-300">Creating opportunities for all athletes to participate and thrive</p>
                        </div>
                        <div className="text-center">
                            <Globe className="w-12 h-12 text-paralympic-green mx-auto mb-4" />
                            <h4 className="text-xl font-bold mb-2">Impact</h4>
                            <p className="text-gray-300">Transforming communities through the power of Paralympic sport</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Main Committee Members Page Component
const CommitteeMembersPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar/>
            {/* Hero Section */}
            <CommitteeHero />

            {/* Stats Section */}
            <CommitteeStats />

            {/* Committee Members Section */}
            <CommitteeSection />

            {/* Mission Statement */}
            <MissionStatement />
            <Footer/>
        </div>
    );
};

export default CommitteeMembersPage;