import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { NewsProvider } from '~/contexts/NewsContext';
import { NavigationHandler } from '~/components/NavigationHandler';

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
        {/* Optimized font loading - direct stylesheet with font-display: swap */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap"
          rel="stylesheet"
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