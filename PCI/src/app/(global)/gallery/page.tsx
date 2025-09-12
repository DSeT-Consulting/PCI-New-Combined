// src/app/gallery/page.tsx

import { Metadata } from 'next';
import GalleryPage from './galleryPage';

// SEO Metadata for the gallery page
export const metadata: Metadata = {
    title: "Paralympic Gallery | Visual Stories of Excellence",
    description: "Explore thousands of captivating images from Paralympic events worldwide. Discover visual stories of triumph, determination, and excellence from the Paralympic Movement.",
    keywords: "Paralympic gallery, Paralympic photos, Paralympic images, para sports photography, Paralympic moments, disability sports images, Paralympic history",
    // openGraph: {
    //     title: "Paralympic Gallery | Visual Stories of Excellence",
    //     description: "Explore thousands of captivating images from Paralympic events worldwide. Discover visual stories that inspire and celebrate Paralympic excellence.",
    //     type: "website",
    //     url: "/gallery",
    //     images: [
    //         {
    //             url: "/assets/gallery/gallery-og-image.jpg",
    //             width: 1200,
    //             height: 630,
    //             alt: "Paralympic Gallery",
    //         },
    //     ],
    // },
    // twitter: {
    //     card: "summary_large_image",
    //     title: "Paralympic Gallery | Visual Stories of Excellence",
    //     description: "Explore thousands of captivating images from Paralympic events worldwide.",
    //     images: ["/assets/gallery/gallery-twitter-image.jpg"],
    // },
    // alternates: {
    //     canonical: "/gallery",
    // },
};

// Main page component that renders the GalleryPage
export default function Page() {
    return <GalleryPage />;
}

// Additional component for individual gallery collection pages
// This would be used for /gallery/[slug]/page.tsx

/*
File: src/app/gallery/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GALLERY_EVENTS } from '~/lib/data';
import GalleryCollectionPage from './galleryCollectionPage';

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const event = GALLERY_EVENTS.find(e => e.slug === params.slug);
    
    if (!event) {
        return {
            title: 'Collection Not Found',
        };
    }

    return {
        title: `${event.title} | Paralympic Gallery`,
        description: event.description,
        keywords: `${event.title}, ${event.location}, Paralympic gallery, para sports photography`,
        openGraph: {
            title: `${event.title} | Paralympic Gallery`,
            description: event.description,
            type: "website",
            url: `/gallery/${params.slug}`,
            images: [
                {
                    url: event.coverImage,
                    width: 1200,
                    height: 630,
                    alt: event.title,
                },
            ],
        },
    };
}

export async function generateStaticParams() {
    return GALLERY_EVENTS.map((event) => ({
        slug: event.slug,
    }));
}

export default function Page({ params }: Props) {
    const event = GALLERY_EVENTS.find(e => e.slug === params.slug);
    
    if (!event) {
        notFound();
    }
    
    return <GalleryCollectionPage event={event} />;
}
*/