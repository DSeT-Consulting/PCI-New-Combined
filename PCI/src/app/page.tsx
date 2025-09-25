import dynamic from 'next/dynamic';
import HeroBanner from '~/app/_home/HeroBanner';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';

// Dynamically import components that aren't immediately visible
const AboutSection = dynamic(() => import('~/app/_home/AboutSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200"></div>
});

const NewsSection = dynamic(() => import('~/app/_home/NewsSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>
});

const AthletesSection = dynamic(() => import('~/app/_home/AthletesSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200"></div>
});

const SponsorsSection = dynamic(() => import('~/app/_home/SponsorsSection'), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100"></div>
});

const SocialMediaFeed = dynamic(() => import('./_home/SocialMediaFeed'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200"></div>
});

const UpcomingEventsBanner = dynamic(() => import('./_home/UpcomingEventsBanner'), {
  loading: () => <div className="h-32 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300"></div>
});

// Keep these commented components as dynamic imports in case they're re-enabled
// const EventsSection = dynamic(() => import('~/app/_home/EventsSection'));
// const GallerySection = dynamic(() => import('~/app/_home/GallerySection'));
// const TicketPromoBanner = dynamic(() => import('./_home/TicketPromoBanner'));
// const WorldRankingsSection = dynamic(() => import('./_home/WorldRankingsSection'));
// const HighlightReelSection = dynamic(() => import('./_home/HighlightReelSection'));

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      <main>
        {/* Hero Banner Slider - Pushed down below navbar */}
        <HeroBanner />

        {/* About Section */}
        <AboutSection />

        {/* Ticket Promo Banner - Colorful top banner */}
        {/* <TicketPromoBanner /> */}

        {/* Upcoming Events Banner - Dynamic colorful banner */}
        <UpcomingEventsBanner />

        {/* News Section */}
        <NewsSection />

        {/* Athletes Section */}
        <AthletesSection />

        {/* World Rankings Section - Colorful teal/cyan section */}
        {/* <WorldRankingsSection /> */}

        {/* Events Section */}
        {/* <EventsSection /> */}

        {/* Highlight Reel Section - Video highlights with gradient background */}
        {/* <HighlightReelSection /> */}

        {/* Gallery Section */}
        {/* <GallerySection /> */}

        {/* Sponsors Section */}
        <SponsorsSection />

        {/* Social Media Feed - Interactive social content */}
        <SocialMediaFeed />


      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}