// src\app\about\page.tsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';

// Journey Timeline Data - PLACEHOLDER DATA
const JOURNEY_MILESTONES = [
    {
        year: '1968',
        title: 'The Debut in Tel Aviv',
        description: "India made its Summer Paralympic debut in Tel Aviv (Nov 4-13). Ten athletes—eight men and two women—competed, laying the foundation for a national para-sport movement.",
        achievement: "First-ever Paralympic participation by India with a 10-member contingent.",
        icon: '🌱',
        color: 'from-emerald-600 to-teal-500',
        image: '/assets/about/journey/1968.jpeg'
    },
    {
        year: '1972',
        title: 'First Gold in Heidelberg',
        description: "At the 1972 Summer Paralympics in Heidelberg, West Germany, Murlikant Petkar won India's first Paralympic gold in 50m freestyle with a world-record swim.",
        achievement: "Murlikant Petkar wins India's first Paralympic gold (50m freestyle, WR 37.33s).",
        icon: '🥇',
        color: 'from-amber-600 to-yellow-500',
        image: '/assets/about/journey/1972.webp'
    },
    {
        year: '1984',
        title: 'Stoke Mandeville & New York Breakthrough',
        description: "India's five-member contingent competed in Stoke Mandeville (GBR) and New York (USA), returning with four medals—two silver and two bronze—marking a landmark multi-medal Games.",
        achievement: "4 medals: Bhimrao Kesarkar (silver) and Joginder Singh Bedi (1 silver, 2 bronze).",
        icon: '🏅',
        color: 'from-sky-600 to-cyan-500',
        image: '/assets/about/journey/1984.jpg'
    },
    {
        year: '1992',
        title: 'Institutional Foundations',
        description: "A pivotal phase for governance: groundwork culminating in the registration of the Paralympic Committee of India in Bengaluru and the national federation push led by Shri M. Mahadeva and colleagues.",
        achievement: "PCI formally registered; national structures strengthened for para-sport growth.",
        icon: '🏛️',
        color: 'from-slate-700 to-gray-500',
        image: '/assets/about/journey/1992.jpg'
    },
    {
        year: '2004',
        title: 'Athens Podium',
        description: "At the Athens Summer Paralympics, Devendra Jhajharia struck gold in javelin and Rajinder Singh earned bronze in powerlifting (56 kg). India placed 53rd among 136 nations.",
        achievement: "Gold—Devendra Jhajharia (javelin); Bronze—Rajinder Singh (powerlifting 56 kg).",
        icon: '🎖️',
        color: 'from-indigo-700 to-blue-500',
        image: '/assets/about/journey/2004.jpg'
    },
    {
        year: '2009',
        title: 'Hosting the IWAS World Games',
        description: "PCI hosted the IWAS World Games with 43 nations participating. India finished 2nd in the medals tally, showcasing organizational capacity and athlete depth.",
        achievement: "India hosts IWAS World Games; strong home performance with 2nd place overall.",
        icon: '🌐',
        color: 'from-purple-700 to-indigo-500',
        image: '/assets/about/journey/2009.jpeg'
    },
    {
        year: '2012',
        title: 'London Silver',
        description: "India competed at the London 2012 Paralympics (Aug 29–Sep 9). H.N. Girisha won silver in Men's High Jump F42—an inspirational leap for the nation.",
        achievement: "H.N. Girisha wins Paralympic silver in High Jump F42.",
        icon: '🥈',
        color: 'from-blue-700 to-sky-500',
        image: '/assets/about/journey/2012.jpeg'
    },
    {
        year: '2016',
        title: 'Rio Record Haul',
        description: "India's largest-ever Paralympic contingent delivered its best performance: 4 medals—2 gold, 1 silver, 1 bronze. Highlights included Jhajharia's javelin world record and Thangavelu's historic T42 gold.",
        achievement: "2 gold (Jhajharia WR, Thangavelu), 1 silver (Deepa Malik), 1 bronze (Varun Bhati).",
        icon: '🌟',
        color: 'from-teal-700 to-emerald-500',
        image: '/assets/about/journey/2016.jpg'
    }
]

// Mission Vision Data
const MISSION_VISION = {
    mission: {
        title: 'Mission',
        content: 'The mission of the Paralympic Committee of India (PCI) is to promote and support para sports across the nation. This involves educating the public and professionals about para sports, providing guidance to differently-abled individuals and their families on how to become para-athletes, fostering pride and emphasising the importance of sports in their lives. Collectively, these efforts contribute to the growth and development of para sports and empower differently-abled individuals through sports.',
        icon: '🎯',
        stats: '500+ Athletes'
    },
    vision: {
        title: 'Vision',
        content: 'Inclusivity and Equality: Ensure that differently-abled athletes have equal access to sports facilities, training, and competitive opportunities. To create a sporting culture where differently-abled athletes are respected, supported, and celebrated for their achievements. Empowerment Through Sports: To identify, nurture, and develop the potential of differently-abled athletes from grassroots to elite levels and support the overall well-being of athletes. Excellence in Para-Sports: Enhance the performance of Indian para-athletes in national and international competitions, including the Paralympic Games. Thus, establishing India as a leading nation in the para-sports movement globally. Awareness and Advocacy: Increase public awareness about para-sports and the capabilities of differently-abled athletes and advocate for the rights and recognition of differently-abled athletes within the broader sporting community and society.',
        icon: '💡',
        stats: 'Top Paralympic Nation'
    },
    values: {
        title: 'Our Core Values',
        content: 'Excellence: Striving for the highest standards in all aspects of para-sport development and athlete performance. Inclusion: Creating opportunities for all differently-abled individuals regardless of their background or disability type. Integrity: Conducting all activities with honesty, transparency, and ethical principles. Empowerment: Building confidence and self-belief in para-athletes to achieve their full potential. Innovation: Embracing new technologies, methodologies, and approaches to enhance para-sport development. Respect: Valuing the dignity and worth of every individual within the para-sport community.',
        icon: '💎',
        stats: '22 Paralympic Sports'
    }
};

// Numeric Stats Data
const NUMERIC_STATS = [
    {
        caption: "State Associations",
        value: "26",
    },
    {
        caption: "Individual Para Sports Federations",
        value: "8",
    },
    {
        caption: "National Sports Federations",
        value: "6",
    }
]

// Future Goals Data
const FUTURE_GOALS = [
    {
        title: 'Paralympic Excellence by 2032',
        description: 'Establishing India as a top-10 Paralympic nation through comprehensive athlete development, world-class training facilities, and strategic partnerships with international coaching experts.',
        target: 'Top 10 Global Ranking',
        icon: '🏆',
        progress: 70,
        color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    },
    {
        title: 'Grassroots Development Program',
        description: 'Creating a nationwide talent identification and development network that reaches every district, ensuring no potential para-athlete is left behind regardless of location or background.',
        target: '1000+ New Athletes Annually',
        icon: '🌱',
        progress: 45,
        color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
        title: 'Technology & Innovation Hub',
        description: 'Revolutionizing para-sports through cutting-edge assistive technology, data analytics for performance optimization, and virtual reality training systems.',
        target: 'AI-Powered Training Centers',
        icon: '🚀',
        progress: 60,
        color: 'bg-gradient-to-r from-purple-500 to-indigo-500'
    },
    {
        title: 'Inclusive Society Initiative',
        description: 'Building widespread awareness and acceptance of para-sports through media campaigns, school programs, and community engagement to change societal perceptions.',
        target: '100 Million Reach',
        icon: '🤝',
        progress: 55,
        color: 'bg-gradient-to-r from-pink-500 to-red-500'
    }
];

// Team Members Data - PLACEHOLDER CONTENT
const LEADERSHIP_TEAM = [
    {
        name: 'Member Name 1',
        position: 'Their Position',
        image: '/assets/dummy-profile.png',
        quote: '[PLACEHOLDER] Inspirational quote from team member about the importance of teamwork and dedication in achieving Paralympic success.'
    },
    {
        name: 'Member Name 2',
        position: 'Their Position',
        image: '/assets/dummy-profile.png',
        quote: '[PLACEHOLDER] Inspirational quote from team member about the importance of teamwork and dedication in achieving Paralympic success.'
    },
    {
        name: 'Member Name 3',
        position: 'Their Position',
        image: '/assets/dummy-profile.png',
        quote: '[PLACEHOLDER] Inspirational quote from team member about the importance of teamwork and dedication in achieving Paralympic success.'
    }
];

const AboutUsPage = () => {
    const [journeyVisible, setJourneyVisible] = useState(false);
    const [missionVisible, setMissionVisible] = useState(false);
    const [goalsVisible, setGoalsVisible] = useState(false);
    const [journeyProgress, setJourneyProgress] = useState(0);

    const journeyRef = useRef<HTMLElement>(null);
    const missionRef = useRef<HTMLElement>(null);
    const goalsRef = useRef<HTMLElement>(null);

    // Simple intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        if (target.id === 'journey') {
                            setJourneyVisible(true);
                        } else if (target.id === 'mission') {
                            setMissionVisible(true);
                        } else if (target.id === 'goals') {
                            setGoalsVisible(true);
                        }
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (journeyRef.current) observer.observe(journeyRef.current);
        if (missionRef.current) observer.observe(missionRef.current);
        if (goalsRef.current) observer.observe(goalsRef.current);

        return () => observer.disconnect();
    }, []);

    // Journey progress animation
    useEffect(() => {
        const handleScroll = () => {
            if (journeyRef.current) {
                const rect = journeyRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const progress = Math.max(0, Math.min(100,
                    ((windowHeight - rect.top) / (windowHeight + rect.height)) * 100
                ));
                setJourneyProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-paralympic-green">
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-20 w-64 h-64 bg-paralympic-yellow/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-20 w-80 h-80 bg-paralympic-red/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-bounce-slow"></div>
                    </div>

                    <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
                        <div className="mb-8">
                            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                                <span className="text-paralympic-yellow font-bold text-lg">PARALYMPIC COMMITTEE OF INDIA</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            About the
                            <span className="block bg-gradient-to-r from-paralympic-yellow to-paralympic-green bg-clip-text text-transparent pb-2">
                                Paralympic Committee of India
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-paralympic-gray max-w-3xl mx-auto">
                            Empowering India&apos;s para-athletes, fostering inclusivity, and driving excellence to place the nation at the forefront of the global Paralympic movement.
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/committee-members">
                                <button className="bg-paralympic-yellow text-paralympic-navy px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 transform hover:scale-105">
                                    Committe Members
                                </button>
                            </Link>
                            <Link href="/partners">
                                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-paralympic-navy transition-all duration-300 transform hover:scale-105">
                                    Explore Our Partners
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div> */}
                </section>

                {/* Journey Timeline Section */}
                <section
                    ref={journeyRef}
                    id="journey"
                    className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
                >
                    <div className="absolute inset-0">
                        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-block bg-gradient-to-r from-paralympic-blue to-paralympic-green px-6 py-2 rounded-full mb-6">
                                <span className="text-white font-bold">OUR JOURNEY</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-paralympic-navy mb-6">
                                Decades of
                                <span className="block bg-gradient-to-r from-paralympic-blue to-paralympic-green bg-clip-text text-transparent">
                                    Paralympic Excellence
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                From humble beginnings to Paralympic glory - witness the incredible transformation and growth of India&apos;s Paralympic movement through decades of dedication and achievements.
                            </p>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Progress line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 rounded-full">
                                <div
                                    className="bg-gradient-to-b from-paralympic-blue to-paralympic-green w-full rounded-full transition-all duration-1000 ease-out"
                                    style={{ height: `${Math.min(journeyProgress, 85)}%` }}
                                ></div>
                            </div>

                            {/* Milestones */}
                            <div className="space-y-24">
                                {JOURNEY_MILESTONES.map((milestone, index) => (
                                    <div
                                        key={milestone.year}
                                        className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} group`}
                                    >
                                        {/* Content Card */}
                                        <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                                            <div
                                                className={`transform transition-all duration-1000 ease-out ${journeyVisible
                                                    ? 'translate-y-0 opacity-100'
                                                    : 'translate-y-16 opacity-0'
                                                    }`}
                                                style={{ transitionDelay: `${index * 300}ms` }}
                                            >
                                                <div className={`bg-gradient-to-r ${milestone.color} p-8 rounded-2xl text-white shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105`}>
                                                    <div className="text-6xl mb-4">{milestone.icon}</div>
                                                    <div className="text-3xl font-bold mb-3">{milestone.year}</div>
                                                    <h3 className="text-2xl font-bold mb-4">{milestone.title}</h3>
                                                    <p className="text-lg mb-6 opacity-90 leading-relaxed">{milestone.description}</p>
                                                    <div className="text-sm font-semibold bg-white/20 px-4 py-2 rounded-full inline-block">
                                                        {milestone.achievement}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Center point */}
                                        <div className="relative z-10 flex-shrink-0 mx-4">
                                            <div className={`w-6 h-6 bg-gradient-to-r ${milestone.color} rounded-full transform transition-all duration-500 group-hover:scale-150 shadow-lg`}></div>
                                        </div>

                                        {/* Image */}
                                        <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                                            <div
                                                className={`transform transition-all duration-1000 ease-out ${journeyVisible
                                                    ? 'translate-y-0 opacity-100'
                                                    : 'translate-y-16 opacity-0'
                                                    }`}
                                                style={{ transitionDelay: `${index * 300 + 150}ms` }}
                                            >
                                                <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                                                    <Image
                                                        src={milestone.image}
                                                        alt={`${milestone.year} - ${milestone.title}`}
                                                        fill
                                                        className="object-cover object-center"
                                                    />
                                                    <div className={`absolute inset-0 bg-gradient-to-t ${milestone.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Vision Section */}
                <section
                    ref={missionRef}
                    id="mission"
                    className="py-24 bg-white relative overflow-hidden"
                >
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-paralympic-blue/5 to-transparent rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-paralympic-green/5 to-transparent rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-block bg-gradient-to-r from-paralympic-green to-paralympic-blue px-6 py-2 rounded-full mb-6">
                                <span className="text-white font-bold">OUR PURPOSE</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-paralympic-navy mb-6">
                                Driven by
                                <span className="block bg-gradient-to-r from-paralympic-green to-paralympic-blue bg-clip-text text-transparent">
                                    Purpose & Passion
                                </span>
                            </h2>
                        </div>

                        {/* Enhanced Cards Layout */}
                        <div className="space-y-16">
                            {Object.entries(MISSION_VISION).map(([key, item], index) => (
                                <div
                                    key={key}
                                    className={`transform transition-all duration-1000 ease-out ${missionVisible
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-16 opacity-0'
                                        }`}
                                    style={{ transitionDelay: `${index * 300}ms` }}
                                >
                                    {/* Alternating Layout */}
                                    <div className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                        {/* Icon & Title Section */}
                                        <div className="lg:w-1/3 text-center lg:text-left">
                                            <div className="relative inline-block mb-6">
                                                <div className="absolute inset-0 bg-gradient-to-r from-paralympic-blue/20 to-paralympic-green/20 rounded-full blur-2xl scale-150"></div>
                                                <div className="relative text-8xl lg:text-9xl filter drop-shadow-lg">
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <h3 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-paralympic-navy to-paralympic-blue bg-clip-text text-transparent mb-4">
                                                {item.title}
                                            </h3>
                                            <div className="inline-flex items-center bg-gradient-to-r from-paralympic-blue to-paralympic-green text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                                <span>{item.stats}</span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="lg:w-2/3">
                                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                                                {/* Background Pattern */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-paralympic-blue/5 to-paralympic-green/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-paralympic-yellow/5 to-paralympic-red/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700"></div>

                                                {/* Content */}
                                                <div className="relative z-10">
                                                    <div className="w-12 h-1 bg-gradient-to-r from-paralympic-blue to-paralympic-green rounded-full mb-6"></div>
                                                    <p className="text-gray-700 text-lg lg:text-xl leading-relaxed font-medium">
                                                        {item.content}
                                                    </p>

                                                    {/* Key Points for Vision */}
                                                    {key === 'vision' && (
                                                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            {[
                                                                "Inclusivity & Equality",
                                                                "Empowerment Through Sports",
                                                                "Excellence in Para-Sports",
                                                                "Awareness & Advocacy"
                                                            ].map((point, i) => (
                                                                <div key={i} className="flex items-center space-x-2 text-sm bg-white/70 rounded-lg px-3 py-2">
                                                                    <div className="w-2 h-2 bg-gradient-to-r from-paralympic-blue to-paralympic-green rounded-full"></div>
                                                                    <span className="text-paralympic-navy font-semibold">{point}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Key Values for Values section */}
                                                    {key === 'values' && (
                                                        <div className="mt-6 flex flex-wrap gap-2">
                                                            {["Excellence", "Inclusion", "Integrity", "Empowerment", "Innovation", "Respect"].map((value, i) => (
                                                                <span key={i} className="bg-gradient-to-r from-paralympic-blue/10 to-paralympic-green/10 text-paralympic-navy px-4 py-2 rounded-full text-sm font-semibold border border-paralympic-blue/20">
                                                                    {value}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* India Representation */}
                        <div className="mt-20 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-3xl p-12 text-center">
                            <div className="max-w-5xl mx-auto">
                                <h3 className="text-4xl font-bold text-paralympic-navy mb-6">
                                    United in the Spirit of Paralympic Excellence
                                </h3>
                                <p className="text-xl text-gray-700 mb-8">
                                    Representing the tricolor with pride and determination, PCI stands as the beacon of hope for millions of differently-abled athletes across India. From grassroots development to Paralympic podiums, we foster a nationwide network that transforms dreams into golden realities, proving that excellence knows no boundaries.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {
                                        NUMERIC_STATS.map((stat) => (
                                            <div key={stat.caption} className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-6">
                                                <div className="text-3xl font-bold text-paralympic-navy">{stat.value}</div>
                                                <div className="text-gray-700">{stat.caption}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Excellence Heritage Section */}
                <section
                    ref={goalsRef}
                    id="goals"
                    className="py-16 md:py-24 bg-gradient-to-br from-paralympic-navy via-paralympic-blue to-paralympic-green relative overflow-hidden"
                >
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            {Array.from({ length: 50 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 3}s`,
                                        animationDuration: `${2 + Math.random() * 2}s`
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Complete Creative Block */}
                        <div
                            className={`transform transition-all duration-1500 ease-out ${goalsVisible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-16 opacity-0'
                                }`}
                        >
                            {/* Unified Content Block */}
                            <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                                {/* Header Section */}
                                <div className="text-center pt-8 md:pt-12 pb-6 md:pb-8 px-6 md:px-12">
                                    <div className="inline-block bg-gradient-to-r from-paralympic-yellow to-paralympic-red px-6 md:px-8 py-2 md:py-3 rounded-full mb-6 md:mb-8">
                                        <span className="text-white font-bold text-sm md:text-lg">EXCELLENCE HERITAGE</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                                        Guiding Indian Para-athletes
                                        <span className="block bg-gradient-to-r from-paralympic-yellow via-paralympic-red to-paralympic-yellow bg-clip-text text-transparent mt-2">
                                            to Excellence since 1994
                                        </span>
                                    </h2>
                                </div>

                                {/* Main Content Area with Centered Image */}
                                <div className="px-6 md:px-12 pb-8 md:pb-12">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                                        {/* Left Content */}
                                        <div className="lg:col-span-1 order-2 lg:order-1">
                                            <div className="space-y-4 md:space-y-6">
                                                <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                                                    The Paralympic Committee of India (PCI) is the apex governing body dedicated to promoting and 
                                                    developing Para Sports across the nation. In consistent with the International Paralympic Committee (IPC) 
                                                    and recognised by the Ministry of Youth Affairs and Sports (MYAS), Government of India, as a National 
                                                    Sports Federation.
                                                </p>
                                                
                                                <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                                                    With affiliations spanning 26 State Associations, 8 Individual Para Sports Federations, and 6 National 
                                                    Sports Federations, PCI is committed to the holistic development of Para Sports.
                                                </p>

                                                <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                                                    Our mission is to identify, train and support athletes across the country, fostering a dynamic Paralympic 
                                                    movement and ensuring strong representation in both national and international sports events.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Center Image */}
                                        <div className="lg:col-span-1 order-1 lg:order-2 flex justify-center">
                                            <div className="relative group/image">
                                                <div className="absolute -inset-4 bg-gradient-to-r from-paralympic-yellow/30 to-paralympic-red/30 rounded-full blur-xl group-hover/image:blur-2xl transition-all duration-500"></div>
                                                <div className="relative">
                                                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 group-hover/image:border-white/40 transition-all duration-500">
                                                        <Image
                                                            src="/assets/about-us.jpg"
                                                            alt="PCI Leadership Team"
                                                            width={300}
                                                            height={300}
                                                            className="object-cover w-full h-full group-hover/image:scale-110 transition-transform duration-700"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-paralympic-navy/60 via-transparent to-transparent"></div>
                                                    </div>
                                                    
                                                    {/* Floating Achievement Badge */}
                                                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-paralympic-yellow to-paralympic-red p-3 md:p-4 rounded-full shadow-lg">
                                                        <div className="text-center">
                                                            <div className="text-lg md:text-xl font-bold text-white">30+</div>
                                                            <div className="text-xs text-white">Years</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Content */}
                                        <div className="lg:col-span-1 order-3">
                                            <div className="space-y-4 md:space-y-6">
                                                <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                                                    We play a crucial role in selecting and preparing Indian teams for the Paralympic Games and other 
                                                    prestigious international competitions, achieving remarkable success at the Tokyo Paralympic Games 2020.
                                                </p>

                                                <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                                                    In collaboration with esteemed partners like Indian Army and Indian Oil Corporation Limited, PCI is 
                                                    spearheading initiatives to further the growth of Para Sports.
                                                </p>

                                                {/* Partnership Highlights */}
                                                <div className="space-y-2 mt-6">
                                                    <h4 className="text-paralympic-yellow font-semibold text-sm md:text-base mb-3">Key Partners:</h4>
                                                    {[
                                                        "Indian Army",
                                                        "Indian Oil Corporation", 
                                                        "Sports Authority of India",
                                                        "MYAS, Government of India"
                                                    ].map((partner, i) => (
                                                        <div key={i} className="flex items-center space-x-2 text-xs md:text-sm">
                                                            <div className="w-2 h-2 bg-gradient-to-r from-paralympic-yellow to-paralympic-red rounded-full"></div>
                                                            <span className="text-gray-300">{partner}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Achievement Bar */}
                                    <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20">
                                        <div className="text-center mb-6">
                                            <p className="text-white font-medium text-base md:text-lg mb-4">
                                                🏆 Recently Hosted: New Delhi 2024 World Para Athletics Championships
                                            </p>
                                            <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto">
                                                With the unwavering support of the Sports Authority of India and the Ministry of Youth Affairs and Sports, 
                                                PCI is empowering athletes with disabilities to excel and make their mark on the global stage.
                                            </p>
                                        </div>

                                        {/* Call to Action */}
                                        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                            <Link href="/athletes">
                                                <button className="w-full sm:w-auto bg-gradient-to-r from-paralympic-yellow to-paralympic-red text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                                    Meet Our Champions
                                                </button>
                                            </Link>
                                            <Link href="/sports">
                                                <button className="w-full sm:w-auto border-2 border-white/50 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                                                    Explore Para Sports
                                                </button>
                                            </Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leadership Team Section */}
                <section className="py-24 bg-gradient-to-br from-paralympic-gray to-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <div className="inline-block bg-gradient-to-r from-paralympic-navy to-paralympic-blue px-6 py-2 rounded-full mb-6">
                                <span className="text-white font-bold">OUR LEADERS</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-paralympic-navy mb-6">
                                Visionary
                                <span className="block bg-gradient-to-r from-paralympic-navy to-paralympic-blue bg-clip-text text-transparent">
                                    Leadership
                                </span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {LEADERSHIP_TEAM.map((member, index) => (
                                <div key={member.name} className="group h-full">
                                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 h-full flex flex-col">
                                        <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <h3 className="text-2xl font-bold text-paralympic-navy text-center mb-2">{member.name}</h3>
                                        <p className="text-paralympic-blue text-center mb-6 font-semibold">{member.position}</p>
                                        <blockquote className="text-gray-600 text-center italic flex-grow">
                                            &quot;{member.quote}&quot;
                                        </blockquote>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact CTA Section */}
                <section className="py-24 bg-gradient-to-r from-paralympic-blue via-paralympic-green to-paralympic-yellow">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                            Ready to Make History?
                        </h2>
                        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                            Join us in our mission to empower para-athletes and build an inclusive sporting ecosystem that transforms lives and creates champions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
                            <Link href="/join" className="bg-white text-paralympic-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex-1 sm:flex-none sm:min-w-[200px] text-center">
                                Join Us
                            </Link>
                            <Link href="/contact" className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-paralympic-navy transition-all duration-300 transform hover:scale-105 flex-1 sm:flex-none sm:min-w-[200px] text-center">
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default AboutUsPage;