// src\app\(global)\join\page.tsx
"use client"

import React, { useState } from 'react';
import { Heart, Users, Gift, DollarSign, CreditCard, Building, Globe, QrCode, Star, Trophy, Target, UserPlus, HandHeart, Shield, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';

// Constants for easy management
const DONATION_CONTENT = {
    hero: {
        title: "Join The Journey",
        subtitle: "Empowering Dreams Through Paralympic Sports",
        description: "Encouraging diverse participation in the para sport movement in India is a noble and impactful initiative. Offer your services to help organize state, national, and international para sports events."
    },
    callToActionText: "Your contribution creates champions and changes lives. Every donation brings us closer to building an inclusive sports ecosystem.",
    bankDetails: {
        foreign: {
            beneficiaryName: "Paralympic Committee of India",
            accountNumber: "40081366360",
            swift: "SBININBB104",
            bankName: "State Bank of India",
            bankAddress: "FCRA Cell, 4th Floor, State Bank of India, New Delhi Branch, 11, Sansad Marg, New Delhi – 110001",
            beneficiaryAddress: "Jaisalmer House, 26, Mansingh Road, New Delhi – 110011"
        },
        domestic: {
            beneficiaryName: "Paralympic Committee of India",
            accountNumber: "66270100867",
            ifsc: "ICIC0006627",
            bankName: "ICICI Bank Ltd.",
            bankAddress: "Kailash Colony, New Delhi"
        }
    }
};

// Hero Section Component
const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-paralympic-green overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 bg-paralympic-yellow rounded-full animate-float"></div>
                <div className="absolute top-1/2 right-20 w-24 h-24 bg-paralympic-red rounded-full animate-bounce-slow"></div>
                <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-paralympic-green rounded-full animate-pulse-slow"></div>
            </div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Icon */}
                    <div className="mb-8 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                            <Heart className="w-12 h-12 text-white animate-pulse" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
                        {DONATION_CONTENT.hero.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-paralympic-yellow mb-8 font-semibold animate-fade-in-up">
                        {DONATION_CONTENT.hero.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
                        {DONATION_CONTENT.hero.description}
                    </p>

                    {/* CTA Buttons */}
                    {/* <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up">
                        <button className="group bg-paralympic-red hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                            <span className="flex items-center justify-center gap-3">
                                <Gift className="w-6 h-6 group-hover:animate-bounce" />
                                Donate Now
                            </span>
                        </button>
                        <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
                            <span className="flex items-center justify-center gap-3">
                                <Users className="w-6 h-6" />
                                Learn More
                            </span>
                        </button>
                    </div> */}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-ping"></div>
                </div>
            </div>
        </section>
    );
};

// Ways to Join Section Component
const WaysToJoinSection = () => {
    const ways = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Provide Medical Aid",
            description: "Partner with healthcare providers to offer medical check-ups, physiotherapy, and other necessary medical assistance along with providing necessary information on the whole process of Classification, which is the cornerstone of Para sport.",
            color: "from-paralympic-red to-red-500",
            bgColor: "bg-paralympic-red/10"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Connect With Para-Athletes",
            description: "Attend events, visit training centres, and engage with para-athletes to understand their needs and aspirations.",
            color: "from-paralympic-blue to-blue-500",
            bgColor: "bg-paralympic-blue/10"
        },
        {
            icon: <Gift className="w-8 h-8" />,
            title: "Donate",
            description: "Provide support to our Para-Athletes achieve their dreams.",
            color: "from-paralympic-green to-green-500",
            bgColor: "bg-paralympic-green/10"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-paralympic-navy mb-6">
                        Ways To Join
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-paralympic-blue to-paralympic-green mx-auto mb-8"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ways.map((way, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                        >
                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${way.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <div className={`bg-gradient-to-r ${way.color} bg-clip-text text-transparent`}>
                                    {way.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-paralympic-navy mb-4 group-hover:text-paralympic-blue transition-colors">
                                {way.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {way.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Join The Journey Section Component
const JoinTheJourneySection = () => {
    const journeyPoints = [
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Event Organization",
            description: "Help organize state, national, and international para sports events with roles in logistics, coordination, marketing, and on-ground support."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Volunteer Network",
            description: "Join the Paralympic Committee of India (PCI) which regularly conducts events and requires dedicated volunteers."
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Talent Development",
            description: "Work with local sports clubs, schools, and NGOs to scout and identify potential para-athletes across India."
        },
        {
            icon: <HandHeart className="w-8 h-8" />,
            title: "Mentorship Programs",
            description: "Establish programs where experienced athletes, coaches, and professionals educate, guide and train new talent."
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-paralympic-gray/30 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-32 h-32 bg-paralympic-blue rounded-full animate-float"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-paralympic-green rounded-full animate-pulse-slow"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-paralympic-yellow rounded-full animate-bounce-slow"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block">
                        <h2 className="text-5xl md:text-6xl font-bold text-paralympic-navy mb-4">
                            Join The Journey
                        </h2>
                        <div className="w-32 h-1 bg-gradient-to-r from-paralympic-blue via-paralympic-green to-paralympic-red mx-auto mb-8"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    {/* Description */}
                    <div className="text-center mb-16">
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
                            Encouraging diverse participation in the para sport movement in India is a noble and impactful initiative.
                            Offer your services to help organize state, national, and international para sports events. Roles can include
                            logistics, coordination, marketing, and on-ground support.
                        </p>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                            Join the likes of the Paralympic Committee of India (PCI), which regularly conducts events and requires volunteers.
                            Organize sessions to educate people about the challenges and triumphs of para-athletes. We encourage businesses to
                            sponsor events, provide job opportunities, and offer internships to para-athletes.
                        </p>
                    </div>

                    {/* Journey Points Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {journeyPoints.map((point, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-paralympic-blue/20"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 bg-gradient-to-br from-paralympic-blue/10 to-paralympic-green/10 rounded-2xl flex items-center justify-center mb-6 group-hover:from-paralympic-blue/20 group-hover:to-paralympic-green/20 group-hover:scale-110 transition-all duration-300">
                                    <div className="text-paralympic-blue group-hover:text-paralympic-green transition-colors duration-300">
                                        {point.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-paralympic-navy mb-4 group-hover:text-paralympic-blue transition-colors">
                                    {point.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {point.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-paralympic-navy to-paralympic-blue rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-4 right-4 w-16 h-16 bg-paralympic-yellow rounded-full"></div>
                                <div className="absolute bottom-4 left-4 w-12 h-12 bg-paralympic-green rounded-full"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-paralympic-red rounded-full"></div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                                    Ready to Make a Difference?
                                </h3>
                                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                                    We work with local sports clubs, schools, and NGOs to scout and identify potential para-athletes.
                                    Establishing mentorship programs where experienced athletes and coaches educate, guide and train new talent.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                    <button className="group bg-paralympic-yellow hover:bg-yellow-400 text-paralympic-navy px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        <span className="flex items-center justify-center gap-3">
                                            <UserPlus className="w-6 h-6 group-hover:animate-bounce" />
                                            Join as Volunteer
                                        </span>
                                    </button>
                                    <button className="group border-2 border-white hover:bg-white hover:text-paralympic-navy text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
                                        <span className="flex items-center justify-center gap-3">
                                            <Heart className="w-6 h-6" />
                                            Support the Cause
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Payment Options Component  
const PaymentOptionsSection = () => {
    const [selectedOption, setSelectedOption] = useState('domestic');

    return (
        <section className="py-20 bg-gradient-to-br from-white to-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-paralympic-navy mb-6">
                        Secure Payment Options
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-paralympic-blue to-paralympic-green mx-auto mb-8"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose your preferred method to make a secure donation
                    </p>
                </div>

                {/* Payment Method Selector */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                        <button
                            onClick={() => setSelectedOption('domestic')}
                            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedOption === 'domestic'
                                ? 'bg-paralympic-blue text-white shadow-lg'
                                : 'text-gray-600 hover:text-paralympic-blue'
                                }`}
                        >
                            Domestic Donations
                        </button>
                        <button
                            onClick={() => setSelectedOption('foreign')}
                            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedOption === 'foreign'
                                ? 'bg-paralympic-blue text-white shadow-lg'
                                : 'text-gray-600 hover:text-paralympic-blue'
                                }`}
                        >
                            Foreign Donations
                        </button>
                        <button
                            onClick={() => setSelectedOption('upi')}
                            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedOption === 'upi'
                                ? 'bg-paralympic-blue text-white shadow-lg'
                                : 'text-gray-600 hover:text-paralympic-blue'
                                }`}
                        >
                            UPI Payment
                        </button>
                    </div>
                </div>

                {/* Payment Options */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Domestic Donations */}
                        {selectedOption === 'domestic' && (
                            <div className="md:col-span-2 lg:col-span-3">
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-paralympic-green/10 rounded-2xl flex items-center justify-center">
                                            <Building className="w-8 h-8 text-paralympic-green" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-paralympic-navy">For Domestic Donations</h3>
                                            <p className="text-gray-600">Bank transfer within India</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Beneficiary Name</label>
                                                <p className="text-lg font-bold text-paralympic-navy mt-1">{DONATION_CONTENT.bankDetails.domestic.beneficiaryName}</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Account Number</label>
                                                <p className="text-lg font-bold text-paralympic-navy mt-1">{DONATION_CONTENT.bankDetails.domestic.accountNumber}</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">IFSC Code</label>
                                                <p className="text-lg font-bold text-paralympic-navy mt-1">{DONATION_CONTENT.bankDetails.domestic.ifsc}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Bank Name</label>
                                                <p className="text-lg font-bold text-paralympic-navy mt-1">{DONATION_CONTENT.bankDetails.domestic.bankName}</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Bank Address</label>
                                                <p className="text-lg font-bold text-paralympic-navy mt-1">{DONATION_CONTENT.bankDetails.domestic.bankAddress}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Foreign Donations */}
                        {selectedOption === 'foreign' && (
                            <div className="md:col-span-2 lg:col-span-3">
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-paralympic-blue/10 rounded-2xl flex items-center justify-center">
                                            <Globe className="w-8 h-8 text-paralympic-blue" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-paralympic-navy">For Foreign Donations Only</h3>
                                            <p className="text-gray-600">International bank transfer</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Beneficiary Name</label>
                                                <p className="text-lg font-bold text-paralympic-navy mt-1">{DONATION_CONTENT.bankDetails.foreign.beneficiaryName}</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Account Number</label>
                                                <p className="text-lg font-bold text-paralympic-navy mt-1">{DONATION_CONTENT.bankDetails.foreign.accountNumber}</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">SWIFT Code</label>
                                                <p className="text-lg font-bold text-paralympic-navy mt-1">{DONATION_CONTENT.bankDetails.foreign.swift}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Bank Name</label>
                                                <p className="text-lg font-bold text-paralympic-navy mt-1">{DONATION_CONTENT.bankDetails.foreign.bankName}</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Bank Address</label>
                                                <p className="text-lg font-bold text-paralympic-navy mt-1">{DONATION_CONTENT.bankDetails.foreign.bankAddress}</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-xl">
                                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Beneficiary Address</label>
                                                <p className="text-lg font-bold text-paralympic-navy mt-1">{DONATION_CONTENT.bankDetails.foreign.beneficiaryAddress}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* UPI Payment */}
                        {selectedOption === 'upi' && (
                            <div className="md:col-span-2 lg:col-span-3">
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
                                    <div className="flex items-center justify-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                                            <QrCode className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-paralympic-navy">Scan and Pay with any UPI app</h3>
                                            <p className="text-gray-600">Quick and secure payment</p>
                                        </div>
                                    </div>

                                    {/* QR Code Placeholder */}
                                    <div className="max-w-md mx-auto">
                                        <div className="bg-gray-100 p-8 rounded-2xl mb-6">
                                            <div className="w-64 h-64 mx-auto bg-white rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                                                {/* <div className="text-center">
                                                    <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                                    <p className="text-gray-500 font-medium">QR Code</p>
                                                    <p className="text-sm text-gray-400">M/S. PARALYMPIC COMMITTEE OF INDIA</p>
                                                </div> */}
                                                <Image
                                                    src="/assets/PCI QR Code.png"
                                                    alt="UPI QR Code"
                                                    width="300"
                                                    height="300"
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            </div>
                                        </div>

                                        {/* UPI Details */}
                                        <div className="bg-gray-50 rounded-2xl p-3 mb-6">
                                            <div className="space-y-4">
                                                <div className="text-left">
                                                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">UPI ID</label>
                                                    <p className="text-lg font-bold text-paralympic-navy mt-1 font-mono break-all">
                                                        msparalympiccommitteeofindia.eazypay@icici
                                                    </p>
                                                </div>
                                                <div className="text-left">
                                                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Beneficiary Name</label>
                                                    <p className="text-lg font-bold text-paralympic-navy mt-1">
                                                        M/S. PARALYMPIC COMMITTEE OF INDIA
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-4">
                                            <span>GPay</span>
                                            <span>•</span>
                                            <span>PhonePe</span>
                                            <span>•</span>
                                            <span>Paytm</span>
                                            <span>•</span>
                                            <span>BHIM</span>
                                        </div>

                                        <p className="text-xs text-gray-500 mt-4">
                                            You can also manually enter the UPI ID in your preferred UPI app
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-12 max-w-2xl mx-auto">
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="w-6 h-6 text-green-600" />
                            <h4 className="font-bold text-green-800">Secure & Verified</h4>
                        </div>
                        <p className="text-green-700">
                            All transactions are secured and processed through verified banking channels.
                            Your donation directly supports Paralympic sports development in India.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Additional Programs Section
const ProgramsSection = () => {
    const programs = [
        {
            icon: <UserPlus className="w-8 h-8" />,
            title: "Talent Identification",
            description: "Work with local sports clubs, schools, and NGOs to scout and identify potential para-athletes across the country."
        },
        {
            icon: <HandHeart className="w-8 h-8" />,
            title: "Mentorship Programs",
            description: "Establish programs where experienced athletes and coaches educate, guide and train new talent."
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Event Organization",
            description: "Support in organizing state, national, and international para sports events with logistics, coordination, and marketing."
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Awareness Campaigns",
            description: "Organize sessions to educate people about the challenges and triumphs of para-athletes."
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-paralympic-navy to-paralympic-blue relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-paralympic-yellow rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-paralympic-green rounded-full animate-float"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        How We Make a Difference
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-paralympic-yellow to-paralympic-green mx-auto mb-8"></div>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Discover the various ways we&apos;re building an inclusive sports ecosystem and empowering para-athletes across India
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {programs.map((program, index) => (
                        <div
                            key={index}
                            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                                <div className="text-paralympic-yellow">
                                    {program.icon}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-paralympic-yellow transition-colors">
                                {program.title}
                            </h3>
                            <p className="text-white/80 leading-relaxed">
                                {program.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Call to Action Section
const CallToActionSection = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-paralympic-green to-paralympic-blue relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                        Ready to Make an Impact?
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
                        Join thousands of supporters who believe in the power of inclusive sports.
                        Every contribution, no matter the size, creates opportunities and changes lives.
                    </p>

                    {/* <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                        <button className="group bg-white hover:bg-gray-100 text-paralympic-navy px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
                            <span className="flex items-center justify-center gap-3">
                                <Heart className="w-7 h-7 group-hover:animate-pulse text-paralympic-red" />
                                Start Donating Today
                            </span>
                        </button>
                        <button className="group border-2 border-white hover:bg-white hover:text-paralympic-navy text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105">
                            <span className="flex items-center justify-center gap-3">
                                <Users className="w-7 h-7" />
                                Get Involved
                            </span>
                        </button>
                    </div> */}

                    <div className="flex items-center justify-center gap-8 text-white/80">
                        <div className="flex items-center justify-center gap-3">
                            <CheckCircle className="w-6 h-6 text-paralympic-yellow" />
                            <span>100% Secure Payments</span>
                        </div>
                        {/* <div className="flex items-center justify-center gap-3">
                            <CheckCircle className="w-6 h-6 text-paralympic-yellow" />
                            <span>Transparent Usage</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <CheckCircle className="w-6 h-6 text-paralympic-yellow" />
                            <span>Direct Impact Tracking</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Main Component
const DonationPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroSection />
            <WaysToJoinSection />
            <JoinTheJourneySection />
            <ProgramsSection />
            <PaymentOptionsSection />
            <CallToActionSection />
            <Footer />
        </div>
    );
};

export default DonationPage;