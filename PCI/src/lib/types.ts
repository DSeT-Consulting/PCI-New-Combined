// Common data types for the Paralympics website

import { type ReactNode } from "react";

// Banner
export interface BannerSlide {
    id: number;
    imageUrl: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
}

// News
export interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    imageUrl: string;
    slug: string;
}

export interface NewsItemComplete {
    id: number | string;
    title: string;
    slug: string;
    date: string;
    category: string;
    author: string;
    authorImage: string;
    tags: string[];
    imageUrl: string;
    excerpt: string;
    content: string | ReactNode; // Rich HTML content
    isBreaking: boolean;
    isFeatured: boolean;
}

// Athletes
export interface Athlete {
    id: number;
    name: string;
    sport: string;
    achievements: string[];
    quote: string;
    imageUrl: string;
    medals: {
        gold: number;
        silver: number;
        bronze: number;
    };
    slug: string;
}

// Events
export interface Event {
    id: number;
    title: string;
    type: 'upcoming' | 'ongoing' | 'past';
    location: string;
    dateStart: string;
    dateEnd: string;
    description: string;
    imageUrl: string;
    categories: string[];
    slug: string;
}

// Gallery
export interface GalleryImage {
    id: number;
    imageUrl: string;
    alt: string;
    width: number;
    height: number;
}

export interface GalleryEvent {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    coverImage: string;
    imageCount: number;
    slug: string;
    featured: GalleryImage[];
}

// Sponsors
export interface Sponsor {
    id: number;
    name: string;
    tier: string;
    logoUrl: string;
    websiteUrl: string;
    description?: string;
}

// Navigation
export interface MenuItem {
    name: string;
    href: string;
}

export interface FooterLink {
    name: string;
    href: string;
    icon?: string;
}

export interface FooterSection {
    title: string;
    links: FooterLink[];
}