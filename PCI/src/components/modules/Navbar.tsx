// src/components/modules/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

// Navigation Menu Items with Grouped Structure
interface MenuGroup {
  name: string;
  href?: string;
  children?: MenuItem[];
}

interface MenuItem {
  name: string;
  href: string;
}

// Updated navigation structure with grouped items
const MENU_GROUPS: MenuGroup[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'WPA 2025',
    href: '/wpa-new-delhi-2025',
  },
  {
    name: 'About',
    href: '/about',
    children: [
      { name: 'About Us', href: '/about' },
      { name: 'Committee Members', href: '/committee-members' },
      { name: 'Partners', href: '/partners' },
    ]
  },
  {
    name: 'Sports',
    children: [
      { name: 'All Sports', href: '/sports' },
      { name: 'Classification', href: '/classification' },
      { name: 'Athletes', href: '/athletes' },
    ]
  },
  {
    name: 'News & Updates',
    children: [
      { name: 'Latest News', href: '/news' },
      { name: 'Latest Updates', href: '/latest-updates' },
    ]
  },
  {
    name: 'Events',
    href: '/events',
    children: [
      { name: 'All Events', href: '/events' },
      { name: 'Gallery', href: '/gallery' },
    ]
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 114,
    hours: 19,
    minutes: 44,
    seconds: 54
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle dropdown hover with delay
  const handleMouseEnter = (groupName: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(groupName);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay before closing
    setDropdownTimeout(timeout);
  };

  const clearDropdownTimeout = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  return (
    <>
      {/* Enhanced News Strip - Gradient Bar with animated elements */}
      <div className="fixed top-0 w-full bg-gradient-to-r from-paralympic-blue via-paralympic-navy to-paralympic-green text-white z-50 h-12 flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-full">
            {/* Animated Live Indicator */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">LIVE</span>
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <div className="text-sm animate-pulse">
                <span className="text-paralympic-yellow font-medium">[Placeholder]</span> write the event name | Month 01 - Month 01, Year
              </div>
            </div>
            
            {/* Countdown Timer */}
            <div className="hidden lg:flex items-center space-x-2">
              <span className="text-sm font-medium">Countdown:</span>
              <div className="flex items-center space-x-2 bg-black/20 rounded-full px-4 py-1 backdrop-blur-sm">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-paralympic-yellow text-lg">{timeLeft.days}</span>
                  <span className="text-xs">d</span>
                </div>
                <span className="text-paralympic-gray">:</span>
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-white">{timeLeft.hours}</span>
                  <span className="text-xs">h</span>
                </div>
                <span className="text-paralympic-gray">:</span>
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-white">{timeLeft.minutes}</span>
                  <span className="text-xs">m</span>
                </div>
                <span className="text-paralympic-gray">:</span>
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-paralympic-yellow">{timeLeft.seconds}</span>
                  <span className="text-xs">s</span>
                </div>
              </div>
            </div>
            
            {/* Mobile countdown */}
            <div className="lg:hidden flex items-center text-xs">
              <span className="font-bold text-paralympic-yellow">{timeLeft.days}d {timeLeft.hours}h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Navigation */}
      <nav className={`fixed top-12 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-paralympic-blue/10' 
          : 'bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-50'
      } h-24 flex items-center`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src="/assets/logo-lightbg.png"
                  alt="Paralympics Logo"
                  width={150}
                  height={50}
                  priority
                  className="h-20 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                />
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-paralympic-blue/10 to-paralympic-green/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation with Dropdowns */}
            <div className="hidden md:flex items-center space-x-1 relative">
              {MENU_GROUPS.map((group, index) => (
                <div 
                  key={group.name} 
                  className="relative group"
                  onMouseEnter={() => group.children && handleMouseEnter(group.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Main Menu Item */}
                  {group.href ? (
                    <Link
                      href={group.href}
                      className="relative px-4 py-2 font-medium text-paralympic-navy hover:text-paralympic-blue transition-all duration-300 group flex items-center"
                    >
                      <span className="relative z-10">{group.name}</span>
                      {group.children && (
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-paralympic-blue/8 to-paralympic-green/8 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"></div>
                      {/* Active indicator */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-paralympic-blue to-paralympic-green group-hover:w-6 transition-all duration-300 rounded-full"></div>
                    </Link>
                  ) : (
                    <button className="relative px-4 py-2 font-medium text-paralympic-navy hover:text-paralympic-blue transition-all duration-300 group flex items-center">
                      <span className="relative z-10">{group.name}</span>
                      {group.children && (
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-paralympic-blue/8 to-paralympic-green/8 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"></div>
                      {/* Active indicator */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-paralympic-blue to-paralympic-green group-hover:w-6 transition-all duration-300 rounded-full"></div>
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  {group.children && activeDropdown === group.name && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100/80 backdrop-blur-md z-50 overflow-hidden animate-fade-in"
                      onMouseEnter={clearDropdownTimeout}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="py-2">
                        {group.children.map((item, itemIndex) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-3 text-sm font-medium text-paralympic-navy hover:text-paralympic-blue hover:bg-gradient-to-r hover:from-paralympic-blue/8 hover:to-paralympic-green/8 transition-all duration-200"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      {/* Dropdown arrow */}
                      <div className="absolute -top-1 left-6 w-2 h-2 bg-white border-l border-t border-gray-100/80 transform rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* CTA Button */}
              <div className="ml-6 pl-6 border-l border-gray-200/60">
                <Link
                  href="/join"
                  className="bg-gradient-to-r from-paralympic-blue to-paralympic-green text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-paralympic-blue/25 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Join</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="md:hidden relative p-2 text-paralympic-navy hover:text-paralympic-blue transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 top-3 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}></span>
              </div>
            </button>
          </div>

          {/* Enhanced Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-6 animate-fade-in">
              <div className="bg-white/98 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/80 p-4">
                <div className="flex flex-col space-y-1">
                  {MENU_GROUPS.map((group) => (
                    <div key={group.name}>
                      {/* Main Group Item */}
                      {group.href ? (
                        <Link
                          href={group.href}
                          className="text-paralympic-navy font-medium hover:text-paralympic-blue hover:bg-gradient-to-r hover:from-paralympic-blue/8 hover:to-paralympic-green/8 px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {group.name}
                          {group.children && <ChevronDown className="h-4 w-4" />}
                        </Link>
                      ) : (
                        <div className="text-paralympic-navy font-medium px-4 py-3 flex items-center justify-between">
                          {group.name}
                          {group.children && <ChevronDown className="h-4 w-4" />}
                        </div>
                      )}

                      {/* Mobile Dropdown Items */}
                      {group.children && (
                        <div className="ml-4 space-y-1">
                          {group.children.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block text-sm text-paralympic-navy/80 hover:text-paralympic-blue hover:bg-gradient-to-r hover:from-paralympic-blue/5 hover:to-paralympic-green/5 px-4 py-2 rounded-lg transition-all duration-300"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Mobile CTA */}
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <Link
                      href="/join"
                      className="bg-gradient-to-r from-paralympic-blue to-paralympic-green text-white font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>Join</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer to push content below fixed navbar and news strip */}
      <div className="h-36"></div>
    </>
  );
}