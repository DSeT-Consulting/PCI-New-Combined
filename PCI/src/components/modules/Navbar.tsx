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
      // { name: 'Athletes', href: '/athletes' },
    ]
  },
  {
    name: 'News & Updates',
    children: [
      { name: 'Latest News', href: '/news' },
      { name: 'Latest Updates', href: '/latest-updates' },
    ]
  },
  // {
  //   name: 'Events',
  //   href: '/events',
  //   children: [
  //     { name: 'All Events', href: '/events' },
  //     { name: 'Gallery', href: '/gallery' },
  //   ]
  // },
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
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Target date for the countdown (WPA Championship) - IST timezone
  const targetDate = new Date('2025-09-26T00:00:00+05:30').getTime();

  useEffect(() => {
    const handleScroll = () => {
      // Responsive scroll threshold based on screen size
      const getScrollThreshold = () => {
        if (window.innerWidth < 640) { // Mobile (sm breakpoint)
          return 10;
        } else if (window.innerWidth < 1024) { // Tablet (lg breakpoint)
          return 30;
        } else {
          return 50; // Desktop
        }
      };

      if (window.scrollY > getScrollThreshold()) {
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

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Clear all open submenus when closing the mobile menu
      setOpenMobileSubmenus(new Set());
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Countdown timer effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      // Get current time in UTC and calculate difference
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Event has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

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

  const toggleMobileSubmenu = (groupName: string) => {
    setOpenMobileSubmenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Enhanced News Strip - Gradient Bar with animated elements */}
      <div className="fixed top-0 w-full bg-gradient-to-r from-paralympic-blue via-paralympic-navy to-paralympic-green text-white z-50 h-8 sm:h-12 flex items-center">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-full">
            {/* Animated Live Indicator */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium">LIVE</span>
              </div>
              <div className="h-3 sm:h-4 w-px bg-white/30"></div>
              <div className="text-xs sm:text-sm animate-pulse truncate">
                <span className="text-paralympic-yellow font-medium">
                  <span className="hidden sm:inline">WPA Championship, New Delhi - 2025</span>
                  <span className="sm:hidden">WPA 2025</span>
                </span>
              </div>
            </div>

            {/* Countdown Timer - Desktop */}
            <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
              <span className="text-sm font-medium">Countdown:</span>
              <div className="flex items-center space-x-1.5 xl:space-x-2 bg-black/20 rounded-full px-3 xl:px-4 py-1 backdrop-blur-sm">
                <div className="flex items-center space-x-0.5">
                  <span className="font-bold text-paralympic-yellow text-base xl:text-lg">{timeLeft.days}</span>
                  <span className="text-xs">d</span>
                </div>
                <span className="text-paralympic-gray text-xs">:</span>
                <div className="flex items-center space-x-0.5">
                  <span className="font-bold text-white text-sm xl:text-base">{timeLeft.hours}</span>
                  <span className="text-xs">h</span>
                </div>
                <span className="text-paralympic-gray text-xs">:</span>
                <div className="flex items-center space-x-0.5">
                  <span className="font-bold text-white text-sm xl:text-base">{timeLeft.minutes}</span>
                  <span className="text-xs">m</span>
                </div>
                <span className="text-paralympic-gray text-xs">:</span>
                <div className="flex items-center space-x-0.5">
                  <span className="font-bold text-paralympic-yellow text-sm xl:text-base">{timeLeft.seconds}</span>
                  <span className="text-xs">s</span>
                </div>
              </div>
            </div>

            {/* Countdown Timer - Mobile/Tablet */}
            <div className="lg:hidden flex items-center text-xs sm:text-sm flex-shrink-0">
              <div className="bg-black/20 rounded-full px-1.5 sm:px-2.5 md:px-3 py-0.5 sm:py-1 backdrop-blur-sm">
                <div className="flex items-center space-x-0.5 sm:space-x-1">
                  <div className="flex items-center">
                    <span className="font-bold text-paralympic-yellow text-xs sm:text-sm">{timeLeft.days}</span>
                    <span className="text-xs opacity-75">d</span>
                  </div>
                  <span className="text-white/60 text-xs">:</span>
                  <div className="flex items-center">
                    <span className="font-bold text-white text-xs sm:text-sm">{timeLeft.hours}</span>
                    <span className="text-xs opacity-75">h</span>
                  </div>
                  <span className="text-white/60 text-xs">:</span>
                  <div className="flex items-center">
                    <span className="font-bold text-white text-xs sm:text-sm">{timeLeft.minutes}</span>
                    <span className="text-xs opacity-75">m</span>
                  </div>
                  <span className="text-white/60 text-xs">:</span>
                  <div className="flex items-center">
                    <span className="font-bold text-paralympic-yellow text-xs sm:text-sm">{timeLeft.seconds}</span>
                    <span className="text-xs opacity-75">s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Navigation */}
      <nav className={`fixed top-8 sm:top-12 w-full z-40 transition-all duration-300 ${isScrolled
          ? 'bg-white backdrop-blur-md shadow-lg border-b border-paralympic-blue/10'
          : 'bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-50'
        } h-[72px] sm:h-20 lg:h-24 flex items-center`}>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative">
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
                  className="h-16 lg:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
                />
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-paralympic-blue/10 to-paralympic-green/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation with Dropdowns */}
            <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 relative">
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
                      className="relative px-2 lg:px-3 xl:px-4 py-2 font-medium text-sm lg:text-base text-paralympic-navy hover:text-paralympic-blue transition-all duration-300 group flex items-center"
                    >
                      <span className="relative z-10">{group.name}</span>
                      {group.children && (
                        <ChevronDown className="ml-1 h-3 w-3 lg:h-4 lg:w-4 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-paralympic-blue/8 to-paralympic-green/8 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"></div>
                      {/* Active indicator */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-paralympic-blue to-paralympic-green group-hover:w-6 transition-all duration-300 rounded-full"></div>
                    </Link>
                  ) : (
                    <button className="relative px-2 lg:px-3 xl:px-4 py-2 font-medium text-sm lg:text-base text-paralympic-navy hover:text-paralympic-blue transition-all duration-300 group flex items-center">
                      <span className="relative z-10">{group.name}</span>
                      {group.children && (
                        <ChevronDown className="ml-1 h-3 w-3 lg:h-4 lg:w-4 transition-transform duration-200 group-hover:rotate-180" />
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
              <div className="ml-3 xl:ml-6 pl-3 xl:pl-6 border-l border-gray-200/60">
                <Link
                  href="/join"
                  className="bg-gradient-to-r from-paralympic-blue to-paralympic-green text-white font-bold px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 rounded-full hover:shadow-lg hover:shadow-paralympic-blue/25 hover:scale-105 transition-all duration-300 flex items-center space-x-1 lg:space-x-2 text-sm lg:text-base"
                >
                  <span>Join</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 lg:h-4 lg:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="lg:hidden relative p-2 sm:p-3 md:p-4 text-paralympic-navy hover:text-paralympic-blue active:text-paralympic-green transition-colors duration-300 touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
                <span className={`absolute block w-full h-0.5 sm:h-[3px] md:h-1 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 top-2 sm:top-2.5 md:top-3.5' : 'top-0.5 sm:top-1 md:top-2'
                  }`}></span>
                <span className={`absolute block w-full h-0.5 sm:h-[3px] md:h-1 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'} top-2 sm:top-2.5 md:top-4`}></span>
                <span className={`absolute block w-full h-0.5 sm:h-[3px] md:h-1 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 top-2 sm:top-2.5 md:top-3.5' : 'top-3.5 sm:top-4 md:top-6'
                  }`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Backdrop */}
          {mobileMenuOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                top: 'calc(var(--news-strip-height, 32px) + var(--navbar-height, 72px))'
              }}
            />
          )}

          {/* Enhanced Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute left-0 right-0 top-full mt-1 sm:mt-2 animate-fade-in z-50 max-h-[75vh] sm:max-h-[70vh] md:max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <div className="bg-white backdrop-blur-md rounded-xl shadow-2xl border border-gray-100/80 p-2 sm:p-3 md:p-5 mx-2 sm:mx-4 md:mx-8 lg:mx-12 mb-4 min-h-fit">
                <div className="flex flex-col space-y-0.5 sm:space-y-1 md:space-y-1.5">
                  {MENU_GROUPS.map((group) => (
                    <div key={group.name}>
                      {/* Main Group Item */}
                      {group.children ? (
                        /* Items with children - show as expandable button */
                        <button
                          className="w-full text-left text-paralympic-navy font-medium hover:text-paralympic-blue active:text-paralympic-green hover:bg-gradient-to-r hover:from-paralympic-blue/8 hover:to-paralympic-green/8 active:bg-gradient-to-r active:from-paralympic-green/10 active:to-paralympic-blue/10 px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-300 flex items-center justify-between touch-manipulation text-sm sm:text-base md:text-lg min-h-[44px]"
                          onClick={() => toggleMobileSubmenu(group.name)}
                        >
                          {group.name}
                          <ChevronDown
                            className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0 transition-transform duration-200 ${
                              openMobileSubmenus.has(group.name) ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      ) : (
                        /* Items without children - show as direct link */
                        <Link
                          href={group.href ?? '/'}
                          className="text-paralympic-navy font-medium hover:text-paralympic-blue active:text-paralympic-green hover:bg-gradient-to-r hover:from-paralympic-blue/8 hover:to-paralympic-green/8 active:bg-gradient-to-r active:from-paralympic-green/10 active:to-paralympic-blue/10 px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-300 flex items-center justify-between touch-manipulation text-sm sm:text-base md:text-lg min-h-[44px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {group.name}
                        </Link>
                      )}

                      {/* Mobile Dropdown Items */}
                      {group.children && openMobileSubmenus.has(group.name) && (
                        <div className="ml-2 sm:ml-3 md:ml-4 space-y-0.5 sm:space-y-1 mt-1 animate-fade-in">
                          {/* Main page link if group has both href and children */}
                          {group.href && (
                            <Link
                              href={group.href}
                              className="block text-xs sm:text-sm md:text-base text-paralympic-blue font-medium hover:text-paralympic-green active:text-paralympic-green hover:bg-gradient-to-r hover:from-paralympic-blue/8 hover:to-paralympic-green/8 active:bg-gradient-to-r active:from-paralympic-green/10 active:to-paralympic-blue/10 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg transition-all duration-300 touch-manipulation min-h-[40px] flex items-center border border-paralympic-blue/20"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              View {group.name}
                            </Link>
                          )}
                          {/* Submenu items */}
                          {group.children.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block text-xs sm:text-sm md:text-base text-paralympic-navy/80 hover:text-paralympic-blue active:text-paralympic-green hover:bg-gradient-to-r hover:from-paralympic-blue/5 hover:to-paralympic-green/5 active:bg-gradient-to-r active:from-paralympic-green/8 active:to-paralympic-blue/8 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg transition-all duration-300 touch-manipulation min-h-[40px] flex items-center"
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
                  <div className="pt-3 sm:pt-4 md:pt-5 mt-3 sm:mt-4 md:mt-5 border-t border-gray-200/60">
                    <Link
                      href="/join"
                      className="bg-gradient-to-r from-paralympic-blue to-paralympic-green text-white font-bold px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-full hover:shadow-lg active:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center space-x-1.5 sm:space-x-2 w-full text-sm sm:text-base md:text-lg touch-manipulation min-h-[48px] mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>Join</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <div className="h-[104px] sm:h-32 lg:h-36"></div>
    </>
  );
}