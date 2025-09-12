// src\app\(global)\partners\page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Heart, Users, Target, TrendingUp, Shield } from 'lucide-react';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';

// Components
const PartnersHero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-paralympic-green py-10">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-64 h-64 bg-paralympic-yellow/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-paralympic-green/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-paralympic-blue/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-20 container mx-auto px-4 text-center">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Badge */}
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/20">
                        <Award className="w-5 h-5 text-paralympic-yellow mr-2" />
                        <span className="text-white font-semibold">Join Our Winning Team</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
                        Our
                        <span className="block bg-gradient-to-r from-paralympic-yellow via-white to-paralympic-green bg-clip-text text-transparent">
                            Partners
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                        Together, we&apos;re building a future where every athlete can achieve their Paralympic dreams.
                        Join us in empowering champions and creating lasting impact.
                    </p>

                    {/* Call to Action */}
                    {/* <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="#become-partner" className="bg-paralympic-yellow text-paralympic-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 min-w-[200px]">
                            Become a Partner
                        </Link>
                        <Link href="#our-partners" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-paralympic-navy transition-all duration-300 transform hover:scale-105 min-w-[200px]">
                            View Partners
                        </Link>
                    </div> */}

                    {/* Stats */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="text-3xl font-bold text-paralympic-yellow mb-2">50+</div>
                            <div className="text-white font-medium">Active Partners</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="text-3xl font-bold text-paralympic-green mb-2">₹100Cr+</div>
                            <div className="text-white font-medium">Total Investment</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="text-3xl font-bold text-paralympic-yellow mb-2">500+</div>
                            <div className="text-white font-medium">Athletes Supported</div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

const PrinciplePartners = () => {
    const partners = [
        {
            name: "Indian Oil",
            logo: "/assets/partners/Indian Oil Logo.png",
            description: "Leading the way in Paralympic excellence with comprehensive support and innovation.",
            website: "/",
            partnership: "",
            contribution: ""
        }
    ];

    return (
        <section id="principle-partners" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-5">
                    <div className="inline-flex items-center bg-gradient-to-r from-paralympic-blue/10 to-paralympic-green/10 px-6 py-3 rounded-full mb-6">
                        <Shield className="w-5 h-5 text-paralympic-blue mr-2" />
                        <span className="text-paralympic-navy font-semibold">Principle Partners</span>
                    </div>
                    {/* <h2 className="text-4xl md:text-6xl font-bold text-paralympic-navy mb-6">
                        Our Foundation
                        <span className="block text-transparent bg-gradient-to-r from-paralympic-blue to-paralympic-green bg-clip-text">
                            Partners
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        These visionary organizations form the backbone of Indian Paralympic movement,
                        providing comprehensive support that enables our athletes to compete at the highest level.
                    </p> */}
                </div>

                {/* Partners Grid */}
                <div className="w-full flex justify-center">
                    <div
                        className={`grid gap-8 ${partners.length === 1
                            ? 'grid-cols-1'
                            : partners.length === 2
                                ? 'grid-cols-2'
                                : 'grid-cols-1 lg:grid-cols-3'
                            }`}
                    >
                        {partners.map((partner, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-border-paralympic-blue/10 hover:border-paralympic-blue/20 transform hover:scale-105 w-full min-w-[30vw] max-w-[350px]"
                            >
                                {/* Logo */}
                                <div className="bg-gray-50 rounded-2xl p-4 mb-6 group-hover:bg-gradient-to-br group-hover:from-paralympic-blue/5 group-hover:to-paralympic-green/5 transition-all duration-300">
                                    <div className="relative h-40 flex items-center justify-center">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            width={500}
                                            height={500}
                                            className="w-auto h-full max-w-[150px] object-contain filter transition-all duration-300 rounded-lg"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-paralympic-navy group-hover:text-paralympic-blue transition-colors">
                                    {partner.name}
                                </h3>
                                {/* <p className="text-gray-600 mb-6 leading-relaxed">
                                {partner.description}
                            </p> */}

                                {/* Stats */}
                                {/* <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <div className="text-sm text-gray-500">Partnership</div>
                                    <div className="font-semibold text-paralympic-navy">{partner.partnership}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">Contribution</div>
                                    <div className="font-bold text-paralympic-green">{partner.contribution}</div>
                                </div>
                            </div> */}

                                {/* CTA */}
                                {/* <Link
                                href={partner.website}
                                className="inline-flex items-center text-paralympic-blue font-semibold hover:text-paralympic-green transition-colors group-hover:underline"
                            >
                                Learn More
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const IndustryExclusivePartners = () => {
    const categories = [
        {
            title: "Support",
            icon: <TrendingUp className="w-8 h-8" />,
            color: "from-blue-500 to-cyan-500",
            partners: [
                { name: "Thums Up", logo: "/assets/partners/Thums Up Logo.png", specialty: "Beverage Marketing & Brand Endorsement" },
            ]
        },
        // {
        //     title: "Healthcare & Wellness",
        //     icon: <Heart className="w-8 h-8" />,
        //     color: "from-green-500 to-emerald-500",
        //     partners: [
        //         { name: "Health Systems", logo: "/assets/dummy-logo.png", specialty: "Medical Support" },
        //         { name: "Wellness Co", logo: "/assets/dummy-logo.png", specialty: "Nutrition & Recovery" },
        //         { name: "Rehab Center", logo: "/assets/dummy-logo.png", specialty: "Physiotherapy" }
        //     ]
        // },
        // {
        //     title: "Equipment & Gear",
        //     icon: <Target className="w-8 h-8" />,
        //     color: "from-purple-500 to-pink-500",
        //     partners: [
        //         { name: "Sports Gear Pro", logo: "/assets/dummy-logo.png", specialty: "Adaptive Equipment" },
        //         { name: "Performance Wear", logo: "/assets/dummy-logo.png", specialty: "Athletic Clothing" },
        //         { name: "Safety First", logo: "/assets/dummy-logo.png", specialty: "Protective Gear" }
        //     ]
        // }
    ];

    const partners = [
        {
            name: "Thums Up",
            logo: "/assets/partners/Thums Up Logo.png",
            description: ""
        },
        {
            name: "AMFI",
            logo: "/assets/partners/AMFI Logo.png",
            description: ""
        },
        {
            name: "AMFI",
            logo: "/assets/partners/Ottobock Logo.png",
            description: ""
        }
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-5">
                    <div className="inline-flex items-center bg-gradient-to-r from-paralympic-green/10 to-paralympic-blue/10 px-6 py-3 rounded-full mb-6">
                        <Users className="w-5 h-5 text-paralympic-green mr-2" />
                        <span className="text-paralympic-navy font-semibold">Industry Exclusive Partners</span>
                    </div>
                    {/* <h2 className="text-4xl md:text-6xl font-bold text-paralympic-navy mb-6">
                        Specialized
                        <span className="block text-transparent bg-gradient-to-r from-paralympic-green to-paralympic-blue bg-clip-text">
                            Expertise
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Industry leaders providing specialized solutions and expertise to enhance every aspect
                        of our athletes' journey to Paralympic excellence.
                    </p> */}
                </div>

                {/* Categories */}
                <div className="space-y-16">
                    {categories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="relative">
                            {/* Category Header */}
                            {/* <div className="flex items-center justify-center mb-12">
                                <div className={`bg-gradient-to-r ${category.color} rounded-2xl p-6 text-white shadow-xl`}>
                                    {category.icon}
                                </div>
                                <h3 className="text-3xl font-bold text-paralympic-navy ml-6">
                                    {category.title}
                                </h3>
                            </div> */}

                            {/* Partners Grid */}
                            {false && (<div className="w-full flex justify-center">
                                <div
                                    className={`grid gap-8 ${category.partners.length === 1
                                        ? 'grid-cols-1'
                                        : category.partners.length === 2
                                            ? 'grid-cols-2'
                                            : 'grid-cols-1 md:grid-cols-3'
                                        }`}
                                >
                                    {category.partners.map((partner, partnerIndex) => (
                                        <div
                                            key={partnerIndex}
                                            className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border-paralympic-green/10 hover:border-paralympic-green/20 w-full min-w-[30vw] max-w-[350px]"
                                        >
                                            <div className="bg-gray-50 rounded-xl p-4 mb-6 group-hover:bg-gradient-to-br group-hover:from-paralympic-green/5 group-hover:to-paralympic-navy/5 transition-all duration-300">
                                                <div className="relative h-40 flex items-center justify-center">
                                                    <Image
                                                        src={partner.logo}
                                                        alt={partner.name}
                                                        width={500}
                                                        height={500}
                                                        className="w-auto h-full max-w-[150px] object-contain filter transition-all duration-300 rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-bold text-paralympic-navy mb-2">
                                                {partner.name}
                                            </h4>
                                            {/* <p className="text-gray-600 font-medium"> {partner.specialty} </p> */}
                                        </div>
                                    ))}
                                </div>
                            </div>)}
                        </div>
                    ))}
                </div>

                <div className="w-full flex justify-center">
                    <div
                        className={`grid gap-8 ${partners.length === 1
                            ? 'grid-cols-1'
                            : partners.length === 2
                                ? 'grid-cols-2'
                                : 'grid-cols-1 md:grid-cols-3'
                            }`}
                    >
                        {partners.map((partner, partnerIndex) => (
                            <div
                                key={partnerIndex}
                                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border-paralympic-green/10 hover:border-paralympic-green/20 w-full min-w-[30vw] max-w-[350px]"
                            >
                                <div className="bg-gray-50 rounded-xl p-4 mb-6 group-hover:bg-gradient-to-br group-hover:from-paralympic-green/5 group-hover:to-paralympic-navy/5 transition-all duration-300">
                                    <div className="relative h-40 flex items-center justify-center">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            width={500}
                                            height={500}
                                            className="w-auto h-full max-w-[150px] object-contain filter transition-all duration-300 rounded-lg"
                                        />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-paralympic-navy mb-2">
                                    {partner.name}
                                </h4>
                                {/* <p className="text-gray-600 font-medium"> {partner.description} </p> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CSRPartners = () => {
    const csrPartners = [
        {
            name: "Hero We Care",
            logo: "/assets/partners/Hero We-Care Logo.png",
            focus: "",
            impact: "",
            description: ""
        },
        {
            name: "IFFCO TOKIO",
            logo: "/assets/partners/IFFCO TOKIO Logo.png",
            focus: "",
            impact: "",
            description: ""
        },
        {
            name: "ICRC",
            logo: "/assets/partners/ICRC Logo.png",
            focus: "",
            impact: "",
            description: ""
        },
        {
            name: "India Shelter",
            logo: "/assets/partners/India Shelter Logo.png",
            focus: "",
            impact: "",
            description: ""
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-paralympic-green">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                        <Heart className="w-5 h-5 text-paralympic-yellow mr-2" />
                        <span className="text-white font-semibold">CSR Partners</span>
                    </div>
                    {/* <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Social Impact
                        <span className="block text-transparent bg-gradient-to-r from-paralympic-yellow to-white bg-clip-text">
                            Champions
                        </span>
                    </h2>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                        Organizations driving meaningful social change through Paralympic sports,
                        creating lasting impact in communities across India.
                    </p> */}
                </div>

                {/* Partners Grid */}
                <div className="w-full flex justify-center">
                    <div
                        className={`grid gap-8 ${csrPartners.length === 1
                            ? 'grid-cols-1'
                            : 'grid-cols-1 md:grid-cols-2'
                            }`}
                    >
                        {csrPartners.map((partner, index) => (
                            <div
                                key={index}
                                className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:transform hover:scale-105 w-full min-w-[40vw] max-w-[500px]"
                            >
                                {/* Logo */}
                                <div className="bg-white/10 rounded-2xl p-4 mb-6 group-hover:bg-white/20 transition-all duration-300">
                                    <div className="relative h-44 flex items-center justify-center">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            width={120}
                                            height={60}
                                            className="w-auto h-full max-w-[200px] object-contain transition-all duration-300 rounded-lg"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white text-center">
                                    {partner.name}
                                </h3>
                                {/* <div className="flex items-center justify-between mb-4">
                                <span className="bg-paralympic-yellow/20 text-paralympic-yellow px-3 py-1 rounded-full text-sm font-semibold">
                                    {partner.focus}
                                </span>
                                <span className="text-paralympic-green font-bold">
                                    {partner.impact}
                                </span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                {partner.description}
                            </p> */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Impact Stats */}
                {/* <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                    <h3 className="text-3xl font-bold text-white text-center mb-8">Collective CSR Impact</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-paralympic-yellow mb-2">₹25Cr+</div>
                            <div className="text-white">Total CSR Investment</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-paralympic-green mb-2">5000+</div>
                            <div className="text-white">Lives Impacted</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-paralympic-yellow mb-2">200+</div>
                            <div className="text-white">Programs Launched</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-paralympic-green mb-2">15+</div>
                            <div className="text-white">States Covered</div>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

const BecomePartnerSection = () => {
    const benefits = [
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Brand Visibility",
            description: "Gain exposure across multiple Paralympic events and digital platforms reaching millions."
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Social Impact",
            description: "Make a meaningful difference in the lives of athletes and communities across India."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Network Access",
            description: "Connect with other industry leaders and influencers in the Paralympic ecosystem."
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Recognition",
            description: "Receive official recognition and awards for your contribution to Paralympic sports."
        }
    ];

    return (
        <section id="become-partner" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold text-paralympic-navy mb-6">
                            Join Our Mission
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Partner with us to create opportunities, break barriers, and build a more inclusive sporting future for India.
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-gradient-to-br from-paralympic-blue to-paralympic-green rounded-2xl p-6 text-white mb-6 mx-auto w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-paralympic-navy mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-paralympic-blue to-paralympic-green rounded-3xl p-12 text-center text-white">
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Make a Difference?
                        </h3>
                        <p className="text-xl mb-8 opacity-90">
                            Let&apos;s discuss how your organization can contribute to India&apos;s Paralympic success story.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/contact" className="bg-white text-paralympic-navy px-8 py-2 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                                Contact Us
                            </Link>
                            {/* <Link href="#partnership-tiers" className="border-2 border-white text-white px-8 py-2 rounded-full font-bold text-lg hover:bg-white hover:text-paralympic-navy transition-all duration-300 transform hover:scale-105">
                                View Packages
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Main Partners Page Component
const PartnersPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <PartnersHero />
            <PrinciplePartners />
            <IndustryExclusivePartners />
            <CSRPartners />
            <BecomePartnerSection />
            <Footer />
        </div>
    );
};

export default PartnersPage;