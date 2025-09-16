import {
    type BannerSlide,
    type NewsItem,
    type Athlete,
    type Event,
    type GalleryEvent,
    type Sponsor,
    type MenuItem,
    FooterSection
} from './types';

// Banner Slides
export const BANNER_SLIDES: BannerSlide[] = [
    {
        id: 6,
        imageUrl: '/assets/home/pci-hero-slider6.png',
        title: '',
        subtitle: "",
        buttonText: '',
        buttonLink: '',
    },
    {
        id: 5,
        imageUrl: '/assets/home/pci-hero-slider5.png',
        title: '',
        subtitle: "",
        buttonText: '',
        buttonLink: '',
    },
    {
        id: 4,
        imageUrl: '/assets/home/pci-hero-slider4.png',
        title: '',
        subtitle: "",
        buttonText: '',
        buttonLink: '',
    },
    {
        id: 1,
        imageUrl: '/assets/home/pci-hero-slider3.png',
        title: 'Champions',
        subtitle: "Celebrating the courage and spirit of India's finest para-athletes.",
        buttonText: 'Explore',
        buttonLink: '/sports',
    },
    {
        id: 2,
        imageUrl: '/assets/home/pci-hero-slider2.png',
        title: 'Beyond Limits',
        subtitle: 'Inspiring stories of determination, resilience, and sporting excellence.',
        buttonText: 'See Gallery',
        buttonLink: '/gallery',
    },
    {
        id: 3,
        imageUrl: '/assets/home/pci-hero-slider1.png',
        title: 'Glory',
        subtitle: "Honoring the passion that drives India's Paralympic achievements forward.",
        buttonText: 'Our Impact',
        buttonLink: '/about',
    },
];

// About Section Content
export const ABOUT_CONTENT = {
    heading: 'Empowering Para-Athletes Across India',
    subheading: 'About the Paralympic Movement',
    description: 'The Paralympic Committee of India (PCI) is the apex governing body dedicated to promoting and developing Para Sport in the country. PCI is affiliated with the International Paralympic Committee (IPC) and recognised by the Ministry of Youth Affairs and Sports (MYAS), Government of India, as a National Sports Federation. Our mission is to identify, train and support athletes across the country, nurturing a dynamic Paralympic movement and ensuring strong representation in both national and international sports events.',
    stats: [
        { value: '26', label: 'State Associations' },
        { value: '6', label: 'National Sports Federations' },
        { value: '8', label: 'Individual Para Sports Federations' },
    ],
    buttonText: 'Learn More About Us',
    buttonLink: '/about',
    imageUrl: '/assets/home/about.png',
};

// Upcoming Events
export const UPCOMING_EVENTS = [
    {
        id: 1,
        title: 'World Para Athletics Championships',
        location: 'New Delhi, India',
        date: '2025-09-26',
        type: 'Para-Sports Event',
        color: 'from-pink-500 to-rose-600',
        link: "wpa-new-delhi-2025"
    },
    // {
    //     id: 2,
    //     title: 'Event Name - Paralympic Games',
    //     location: 'Place, Country',
    //     date: '2028-01-01',
    //     type: 'Type of Event',
    //     color: 'from-blue-500 to-cyan-600',
    // },
    // {
    //     id: 3,
    //     title: 'Event Name - Paralympic Games',
    //     location: 'Place, Country',
    //     date: '2030-01-01',
    //     type: 'Type of Event',
    //     color: 'from-green-500 to-emerald-600',
    // },
];

// News Items
export const NEWS_ITEMS: NewsItem[] = [
    {
        id: 1,
        title: 'Title of event goes here - Paralympic Games',
        excerpt: 'A small description of the event goes here. It should be concise and engaging to attract readers.',
        date: '2025-02-15',
        category: 'Events',
        imageUrl: '/assets/home/news1.png',
        slug: 'paris-2024-tickets-on-sale',
    },
    {
        id: 2,
        title: 'Title of event goes here - Paralympic Games',
        excerpt: 'A small description of the event goes here. It should be concise and engaging to attract readers.',
        date: '2025-03-22',
        category: 'Rules',
        imageUrl: '/assets/home/news2.png',
        slug: 'new-swimming-classification-rules',
    },
    {
        id: 3,
        title: 'Title of event goes here - Paralympic Games',
        excerpt: 'A small description of the event goes here. It should be concise and engaging to attract readers.',
        date: '2025-04-05',
        category: 'Athletes',
        imageUrl: '/assets/home/news3.png',
        slug: 'record-number-athletes-expected',
    },
    // {
    //     id: 4,
    //     title: 'Paralympic Champions Honored at Annual Awards Ceremony',
    //     excerpt: 'Top Paralympic athletes from around the world were recognized for their outstanding achievements at the annual honors ceremony.',
    //     date: '2025-03-18',
    //     category: 'Awards',
    //     imageUrl: '/assets/home/news4.png',
    //     slug: 'paralympic-champions-honored',
    // },
    // {
    //     id: 5,
    //     title: 'New Para Badminton Training Center Opens in Singapore',
    //     excerpt: 'Singapore has launched a state-of-the-art training facility dedicated to developing para badminton talent across Asia Pacific.',
    //     date: '2025-02-28',
    //     category: 'Facilities',
    //     imageUrl: '/assets/home/news5.png',
    //     slug: 'para-badminton-center-singapore',
    // },
    // {
    //     id: 6,
    //     title: 'Documentary on Paralympic Movement Wins International Award',
    //     excerpt: 'A groundbreaking documentary showcasing the history and impact of the Paralympic Movement has received global recognition.',
    //     date: '2025-04-12',
    //     category: 'Media',
    //     imageUrl: '/assets/home/news6.png',
    //     slug: 'paralympic-documentary-award',
    // },
];

// Featured Athletes
export const FEATURED_ATHLETES: Athlete[] =[
  {
    id: 1,
    name: 'Murlikanth Petkar',
    sport: 'Swimmer',
    achievements: [
      'Gold medal in 50m freestyle at the 1972 Heidelberg Paralympics',
      'Set a world record of 37.33 seconds in the event',
      'Honored with the Padma Shri award'
    ],
    quote: "War-injured soldier turned record-breaking swimmer, Petkar opened India’s Paralympic story with gold in 1972 and a world record that stood as a beacon for generations.",
    imageUrl: '/assets/champions/Murlikanth-Petkar.png',
    medals: { gold: 1, silver: 0, bronze: 0 },
    slug: 'murlikanth-petkar'
  },
  {
    id: 2,
    name: 'Devendra Jhajharia',
    sport: 'Men’s Javelin Throw (F46)',
    achievements: [
      'Paralympic gold medal at Athens 2004',
      'Paralympic gold medal at Rio 2016',
      'Paralympic silver medal at Tokyo 2020',
      'Recipient of the Padma Bhushan award'
    ],
    quote: "From a village in Rajasthan to a two-time Paralympic champion, Jhajharia kept raising his own bar—then came back for silver in Tokyo to become India’s most decorated Paralympian in javelin.",
    imageUrl: '/assets/champions/Devendra.jpg',
    medals: { gold: 2, silver: 1, bronze: 0 },
    slug: 'devendra-jhajharia'
  },
  {
    id: 3,
    name: 'Bhagyashri Jadhav',
    sport: 'F34 Shot Put',
    achievements: [
      'Silver medal at the 2022 Asian Para Games',
      'Represented India at the Tokyo 2020 Paralympics (7th place finish)'
    ],
    quote: "Wheelchair athlete from Maharashtra who turned a life-altering accident into podium finishes, Bhagyashri is building momentum toward LA 2028 with steely consistency.",
    imageUrl: '/assets/champions/Rectangle-1-1.png',
    medals: { gold: 0, silver: 1, bronze: 0 },
    slug: 'bhagyashri-jadhav'
  },
  {
    id: 4,
    name: 'Sumit',
    sport: 'Javelin Throw (F64)',
    achievements: [
      'Paralympic gold medal at Tokyo 2020',
      'Paralympic gold medal at Paris 2024',
      'Multiple world records in the F64 javelin category',
      'Honored with Padma Shri and Khel Ratna awards'
    ],
    quote: "Electric speed on the runway and fearless intent—Sumit keeps rewriting the record books, defending his Paralympic crown in 2024 to underline India’s javelin era.",
    imageUrl: '/assets/champions/sumit-1.png',
    medals: { gold: 2, silver: 0, bronze: 0 },
    slug: 'sumit'
  },
  {
    id: 5,
    name: 'Mariyappan Thangavelu',
    sport: 'High Jump (T63)',
    achievements: [
      'Paralympic gold medal at Rio 2016',
      'Paralympic silver medal at Tokyo 2020',
      'Paralympic bronze medal at Paris 2024'
    ],
    quote: "From Salem’s sand pits to triple Paralympic medals, Mariyappan’s spring-loaded belief has made India’s high jump a story of grit and grace.",
    imageUrl: '/assets/champions/Mariyappan-Thangavelu-1.png',
    medals: { gold: 1, silver: 1, bronze: 1 },
    slug: 'mariyappan-thangavelu'
  },
  {
    id: 6,
    name: 'Avani Lekhara',
    sport: 'Shooting (SH1)',
    achievements: [
      'First Indian woman to win Paralympic gold (10m Air Rifle SH1, Tokyo 2020)',
      'Paralympic bronze medal in 50m Rifle 3 Positions SH1 (Tokyo 2020)',
      'Paralympic gold medal in 10m Air Rifle SH1 (Paris 2024)',
      'Recipient of the Padma Shri award'
    ],
    quote: "Calm, clinical, historic—Avani turned recovery into mastery, becoming India’s first woman Paralympic champion and then defending her crown with even finer precision.",
    imageUrl: '/assets/champions/Avani-Lekhara-1.png',
    medals: { gold: 2, silver: 0, bronze: 1 },
    slug: 'avani-lekhara'
  },
  {
    id: 7,
    name: 'Krishna Nagar',
    sport: 'Badminton (SH6)',
    achievements: [
      'Paralympic gold medal at Tokyo 2020',
      'Recipient of the Khel Ratna award'
    ],
    quote: "Lightning-quick footwork and fearless attacking play took Krishna from Jaipur courts to Paralympic gold—proof that speed and heart can tower over height classes.",
    imageUrl: '/assets/champions/Krishna-Nagar-1.jpg',
    medals: { gold: 1, silver: 0, bronze: 0 },
    slug: 'krishna-nagar'
  },
  {
    id: 8,
    name: 'Manish Narwal',
    sport: 'Shooting (SH1)',
    achievements: [
      'Paralympic gold medal in Mixed 50m Pistol SH1 (Tokyo 2020)',
      'Set a Paralympic record in the same event',
      'Recipient of the Khel Ratna award'
    ],
    quote: "The football-mad kid who found his calling on the firing line, Manish rose fast—peaking in Tokyo with a Paralympic record under the brightest pressure.",
    imageUrl: '/assets/champions/Manish-Narwal.png',
    medals: { gold: 1, silver: 0, bronze: 0 },
    slug: 'manish-narwal'
  },
  {
    id: 9,
    name: 'Sheetal Devi',
    sport: 'Archery (Compound)',
    achievements: [
      'Gold medal at the 2022 Asian Para Games (Individual Compound Open)',
      'Gold medal at the 2022 Asian Para Games (Mixed Team Compound)',
      'Silver medal at the 2022 Asian Para Games (Team event)',
      'Bronze medal at the Paris 2024 Paralympics (Mixed Team Compound)',
      'Recipient of the Arjuna award'
    ],
    quote: "The world’s first elite archer to shoot without arms, Sheetal learned to draw with her feet—and then climbed straight to the Asian Para Games podiums and a Paralympic medal as a teenager.",
    imageUrl: '/assets/champions/Sheetal-Devi.jpg',
    medals: { gold: 2, silver: 1, bronze: 1 },
    slug: 'sheetal-devi'
  }
]


// Top Sports
export const TOP_SPORTS = [
    {
        id: 1,
        sport: 'Name of Sport',
        imageUrl: '/assets/dummy-sports.png',
        rank: 1,
        achievement: 'Gold - 1, Silver - 1, Bronze - 1',
    },
    {
        id: 2,
        sport: 'Name of Sport',
        imageUrl: '/assets/dummy-sports.png',
        rank: 2,
        achievement: 'Gold - 1, Silver - 1, Bronze - 1',
    },
    {
        id: 3,
        sport: 'Name of Sport',
        imageUrl: '/assets/dummy-sports.png',
        rank: 3,
        achievement: 'Gold - 1, Silver - 1, Bronze - 1',
    },
    {
        id: 4,
        sport: 'Name of Sport',
        imageUrl: '/assets/dummy-sports.png',
        rank: 4,
        achievement: 'Gold - 1, Silver - 1, Bronze - 1',
    },
];

// Latest Improvements
export const LATEST_IMPROVEMENTS = [
    { name: 'Player Name', event: 'Sport Category Name', achievement: 'Event Name' },
    { name: 'Player Name', event: 'Sport Category Name', achievement: 'Event Name' },
    { name: 'Player Name', event: 'Sport Category Name', achievement: 'Event Name' },
];

// Featured Events
export const FEATURED_EVENTS: Event[] = [
    {
        id: 1,
        title: 'Title of the event goes here - Paralympic Games',
        type: 'upcoming',
        location: 'Location',
        dateStart: '2024-08-28',
        dateEnd: '2024-09-08',
        description: 'Write a brief description of the event here, highlighting its significance and what to expect and how it contributes to the Paralympic Movement.',
        imageUrl: '/assets/home/event1.png',
        categories: ['Games', 'International', 'Summer'],
        slug: 'paris-2024-paralympic-games',
    },
    {
        id: 2,
        title: 'Title of the event goes here - Paralympic Games',
        type: 'upcoming',
        location: 'Location',
        dateStart: '2025-07-15',
        dateEnd: '2025-07-21',
        description: 'Write a brief description of the event here, highlighting its significance and what to expect and how it contributes to the Paralympic Movement.',
        imageUrl: '/assets/home/event2.png',
        categories: ['Championships', 'Swimming', 'World'],
        slug: 'world-para-swimming-championships-2025',
    },
    {
        id: 3,
        title: 'Title of the event goes here - Paralympic Games',
        type: 'upcoming',
        location: 'Location',
        dateStart: '2025-05-10',
        dateEnd: '2025-05-12',
        description: 'Write a brief description of the event here, highlighting its significance and what to expect and how it contributes to the Paralympic Movement.',
        imageUrl: '/assets/home/event3.png',
        categories: ['Athletics', 'Grand Prix', 'International'],
        slug: 'para-athletics-grand-prix-dubai-2025',
    },
    {
        id: 4,
        title: 'Title of the event goes here - Paralympic Games',
        type: 'past',
        location: 'Location',
        dateStart: '2025-01-15',
        dateEnd: '2025-01-23',
        description: 'Write a brief description of the event here, highlighting its significance and what to expect and how it contributes to the Paralympic Movement.',
        imageUrl: '/assets/home/event4.png',
        categories: ['Championships', 'Ice Hockey', 'Winter'],
        slug: 'world-para-ice-hockey-championships-2025',
    },
];

// Video Highlights
export const HIGHLIGHT_VIDEOS = [
    {
        id: 1,
        title: 'Title of the video goes here',
        description: 'A short description of the video goes here.',
        thumbnail: '/assets/home/higlights2.png',
        duration: '3:45',
        category: 'Category Name',
        videoUrl: '/videos/swimming-highlights',
    },
    {
        id: 2,
        title: 'Title of the video goes here',
        description: 'A short description of the video goes here.',
        thumbnail: '/assets/home/higlights2.png',
        duration: '4:12',
        category: 'Category Name',
        videoUrl: '/videos/athletics-highlights',
    },
    {
        id: 3,
        title: 'Title of the video goes here',
        description: 'A short description of the video goes here.',
        thumbnail: '/assets/home/higlights2.png',
        duration: '2:58',
        category: 'Category Name',
        videoUrl: '/videos/basketball-highlights',
    },
];

// Gallery Events
export const GALLERY_EVENTS: GalleryEvent[] = [
    {
        id: 1,
        title: 'Title of the event-1 goes here',
        date: '2021-08-24',
        location: 'Location, Country',
        description: 'A brief description of the event, highlighting key moments and achievements. This should capture the essence of the event and its significance in the Paralympic Movement.',
        coverImage: '/assets/home/glry-tokyo-1.png',
        imageCount: 85,
        slug: 'tokyo-2020-paralympic-games',
        featured: [
            {
                id: 101,
                imageUrl: '/assets/home/glry-tokyo-2.png',
                alt: 'Tokyo 2020 Opening Ceremony',
                width: 1200,
                height: 800,
            },
            {
                id: 102,
                imageUrl: '/assets/home/glry-tokyo-3.png',
                alt: 'Swimming competition at Tokyo 2020',
                width: 1200,
                height: 800,
            },
            {
                id: 103,
                imageUrl: '/assets/home/glry-tokyo-4.png',
                alt: 'Para athletics track event at Tokyo 2020',
                width: 800,
                height: 1200,
            },
            {
                id: 104,
                imageUrl: '/assets/home/glry-tokyo-5.png',
                alt: 'Wheelchair basketball action at Tokyo 2020',
                width: 1200,
                height: 800,
            },
        ],
    },
    {
        id: 2,
        title: 'Title of the event-2 goes here',
        date: '2023-07-31',
        location: 'Location, Country',
        description: 'A brief description of the event, highlighting key moments and achievements. This should capture the essence of the event and its significance in the Paralympic Movement.',
        coverImage: '/assets/home/glry-swim-1.png',
        imageCount: 42,
        slug: 'world-para-swimming-championships-2023',
        featured: [
            {
                id: 201,
                imageUrl: '/assets/home/glry-swim-2.png',
                alt: '/assets/home/glry-swim-2.png',
                width: 1200,
                height: 800,
            },
            {
                id: 202,
                imageUrl: '/assets/home/glry-swim-3.png',
                alt: '/assets/home/glry-swim-3.png',
                width: 800,
                height: 1200,
            },
            {
                id: 203,
                imageUrl: '/assets/home/glry-swim-4.png',
                alt: '/assets/home/glry-swim-4.png',
                width: 1200,
                height: 800,
            },
        ],
    },
    {
        id: 3,
        title: 'Title of the event-3 goes here',
        date: '2022-03-04',
        location: 'Location, Country',
        description: 'A brief description of the event, highlighting key moments and achievements. This should capture the essence of the event and its significance in the Paralympic Movement.',
        coverImage: '/assets/home/glry-beji-1.png',
        imageCount: 64,
        slug: 'paralympic-winter-games-beijing-2022',
        featured: [
            {
                id: 301,
                imageUrl: '/assets/home/glry-beji-2.png',
                alt: '/assets/home/glry-beji-2.png',
                width: 1200,
                height: 800,
            },
            {
                id: 302,
                imageUrl: '/assets/home/glry-beji-3.png',
                alt: '/assets/home/glry-beji-3.png',
                width: 1200,
                height: 800,
            },
            {
                id: 303,
                imageUrl: '/assets/home/glry-beji-4.png',
                alt: '/assets/home/glry-beji-4.png',
                width: 800,
                height: 1200,
            },
            {
                id: 304,
                imageUrl: '/assets/home/glry-beji-5.png',
                alt: '/assets/home/glry-beji-5.png',
                width: 1200,
                height: 800,
            },
        ],
    },
    {
        id: 4,
        title: 'Title of the event-4 goes here',
        date: '2023-07-08',
        location: 'Location, Country',
        description: 'A brief description of the event, highlighting key moments and achievements. This should capture the essence of the event and its significance in the Paralympic Movement.',
        coverImage: '/assets/home/glry-athle-1.png',
        imageCount: 57,
        slug: 'world-para-athletics-championships-2023',
        featured: [
            {
                id: 401,
                imageUrl: '/assets/home/glry-athle-2.png',
                alt: '/assets/home/glry-athle-2.png',
                width: 1200,
                height: 800,
            },
            {
                id: 402,
                imageUrl: '/assets/home/glry-athle-3.png',
                alt: '/assets/home/glry-athle-3.png',
                width: 1200,
                height: 800,
            },
            {
                id: 403,
                imageUrl: '/assets/home/glry-athle-4.png',
                alt: '/assets/home/glry-athle-4.png',
                width: 800,
                height: 1200,
            },
        ],
    },
];

// Sponsors
export const SPONSORS: Sponsor[] = [
    {
        id: 1,
        name: 'Indian Oil',
        tier: '',
        logoUrl: '/assets/partners/Indian Oil Logo.png',
        websiteUrl: '/',
        description: ''
    },
    {
        id: 2,
        name: 'AMFI',
        tier: '',
        logoUrl: '/assets/partners/AMFI Logo.png',
        websiteUrl: '/',
        description: ''
    },
    {
        id: 3,
        name: 'Thums Up',
        tier: '',
        logoUrl: '/assets/partners/Thums Up Logo.png',
        websiteUrl: '/',
        description: ''
    },
    {
        id: 4,
        name: 'Ottobock',
        tier: '',
        logoUrl: '/assets/partners/Ottobock Logo.png',
        websiteUrl: '/',
        description: ''
    },
    {
        id: 5,
        name: 'Hero We-Care',
        tier: '',
        logoUrl: '/assets/partners/Hero We-Care Logo.png',
        websiteUrl: '/',
        description: ''
    },
    {
        id: 6,
        name: 'IFFCO TOKIO',
        tier: '',
        logoUrl: '/assets/partners/IFFCO TOKIO Logo.png',
        websiteUrl: '/',
        description: ''
    },
    {
        id: 7,
        name: 'ICRC',
        tier: '',
        logoUrl: '/assets/partners/ICRC Logo.png',
        websiteUrl: '/',
        description: ''
    },
    {
        id: 8,
        name: 'India Shelter',
        tier: '',
        logoUrl: '/assets/partners/India Shelter Logo.png',
        websiteUrl: '/',
        description: ''
    }
];


// Journey Timeline Data
export const JOURNEY_MILESTONES = [
    {
        year: '1968',
        title: '[PLACEHOLDER] The Beginning Title',
        description: '[PLACEHOLDER] Brief description of India\'s first Paralympic participation and early foundation years',
        achievement: '[PLACEHOLDER] Key achievement text here',
        icon: '🌱',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        year: '1984',
        title: '[PLACEHOLDER] First Major Milestone',
        description: '[PLACEHOLDER] Description of significant breakthrough moment in Paralympic history',
        achievement: '[PLACEHOLDER] Specific medal/achievement details',
        icon: '🥈',
        color: 'from-gray-400 to-gray-600'
    },
    {
        year: '2004',
        title: '[PLACEHOLDER] Golden Era Begins',
        description: '[PLACEHOLDER] Details about breakthrough gold medal performance and impact',
        achievement: '[PLACEHOLDER] Record/achievement specifics',
        icon: '🥇',
        color: 'from-yellow-400 to-yellow-600'
    },
    {
        year: '2016',
        title: '[PLACEHOLDER] Historic Performance',
        description: '[PLACEHOLDER] Description of best Paralympic performance and multiple medal wins',
        achievement: '[PLACEHOLDER] Medal count breakdown',
        icon: '🚀',
        color: 'from-green-500 to-emerald-600'
    },
    {
        year: '2021',
        title: '[PLACEHOLDER] Record Breaking Achievement',
        description: '[PLACEHOLDER] Details about record-breaking Paralympic performance',
        achievement: '[PLACEHOLDER] Specific medal tally',
        icon: '🌟',
        color: 'from-purple-500 to-pink-600'
    },
    {
        year: '2024',
        title: '[PLACEHOLDER] Future Aspirations',
        description: '[PLACEHOLDER] Vision for upcoming Paralympic games and expectations',
        achievement: '[PLACEHOLDER] Target/goal numbers',
        icon: '🎯',
        color: 'from-red-500 to-orange-600'
    }
];

// Navigation Menu Items
export const MENU_ITEMS: MenuItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'News', href: '/news' },
    { name: 'Athletes', href: '/athletes' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
];

// Footer Links
export const FOOTER_LINKS: Record<string, any> = {
    about: [
        { name: 'Our Mission', href: '/about#mission' },
        { name: 'History', href: '/about#history' },
        { name: 'Leadership', href: '/about#leadership' },
        { name: 'Governance', href: '/about#governance' },
    ],
    resources: [
        { name: 'Athletes', href: '/athletes' },
        { name: 'Sports', href: '/sports' },
        { name: 'Classification', href: '/classification' },
        { name: 'Anti-Doping', href: '/anti-doping' },
    ],
    connect: [
        { name: 'News', href: '/news' },
        { name: 'Events', href: '/events' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact Us', href: '/contact' },
    ],
    social: [
        { name: 'Twitter', href: 'https://twitter.com/', icon: 'twitter' },
        { name: 'Facebook', href: 'https://facebook.com/', icon: 'facebook' },
        { name: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
        { name: 'YouTube', href: 'https://youtube.com/', icon: 'youtube' },
    ],
};