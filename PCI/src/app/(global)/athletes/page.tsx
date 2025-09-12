// src/app/athletes/page.tsx

import { Metadata } from 'next';
import AthletesPage from './athletesPage';

// SEO Metadata for the events page
// export const metadata: Metadata = {
//     title: "Paralympic Events | Official Paralympic Movement Website",
//     description: "Discover upcoming Paralympic events, championships, and competitions. Get tickets, view schedules, and follow your favorite Paralympic sports from around the world.",
//     keywords: "Paralympic events, Paralympic games, Paralympic championships, Paralympic tickets, Paralympic schedule, para sports events",
//     // openGraph: {
//     //     title: "Paralympic Events | Official Paralympic Movement Website",
//     //     description: "Discover upcoming Paralympic events, championships, and competitions. Get tickets, view schedules, and follow your favorite Paralympic sports from around the world.",
//     //     type: "website",
//     //     url: "/events",
//     //     images: [
//     //         {
//     //             url: "/assets/events/events-og-image.jpg", // You can add this image later
//     //             width: 1200,
//     //             height: 630,
//     //             alt: "Paralympic Events",
//     //         },
//     //     ],
//     // },
//     // twitter: {
//     //     card: "summary_large_image",
//     //     title: "Paralympic Events | Official Paralympic Movement Website",
//     //     description: "Discover upcoming Paralympic events, championships, and competitions worldwide.",
//     //     images: ["/assets/events/events-twitter-image.jpg"], // You can add this image later
//     // },
//     // alternates: {
//     //     canonical: "/events",
//     // },
// };

// Main page component that renders the AthletesPage
export default function Page() {
  return <AthletesPage />;
}