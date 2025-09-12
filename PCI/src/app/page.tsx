import HeroBanner from '~/app/_home/HeroBanner';
import AboutSection from '~/app/_home/AboutSection';
import NewsSection from '~/app/_home/NewsSection';
import AthletesSection from '~/app/_home/AthletesSection';
import EventsSection from '~/app/_home/EventsSection';
import GallerySection from '~/app/_home/GallerySection';
import SponsorsSection from '~/app/_home/SponsorsSection';
import Navbar from '~/components/modules/Navbar';
import Footer from '~/components/modules/Footer';
import TicketPromoBanner from './_home/TicketPromoBanner';
import UpcomingEventsBanner from './_home/UpcomingEventsBanner';
import WorldRankingsSection from './_home/WorldRankingsSection';
import HighlightReelSection from './_home/HighlightReelSection';
import SocialMediaFeed from './_home/SocialMediaFeed';

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
        <WorldRankingsSection />

        {/* Events Section */}
        <EventsSection />

        {/* Highlight Reel Section - Video highlights with gradient background */}
        <HighlightReelSection />

        {/* Gallery Section */}
        <GallerySection />

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