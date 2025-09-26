import "~/styles/globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { NewsProvider } from '~/contexts/NewsContext';
import { NavigationHandler } from '~/components/NavigationHandler';
import ServiceWorker from '~/components/ServiceWorker';

export const metadata: Metadata = {
  title: "Paralympic Movement | Official Website",
  description: "Celebrate Paralympic sport and the achievements of para athletes from around the world. Get the latest news, events, and stories from the Paralympic Movement.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} scroll-smooth`}>
      <head>
        {/* Self-hosted fonts for better performance */}
        <link
          rel="preload"
          href="/fonts/sora-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/sora-600-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/sora.css"
        />
        {/* Preload LCP image */}
        <link
          rel="preload"
          href="/assets/home/pci-hero-slider6.png"
          as="image"
          type="image/png"
        />
      </head>
      <body>
        <ServiceWorker />
        <NewsProvider>
          <NavigationHandler />
          {children}
        </NewsProvider>

        {/* <body>
          {children}
        </body> */}
      </body>
    </html>
  );
}