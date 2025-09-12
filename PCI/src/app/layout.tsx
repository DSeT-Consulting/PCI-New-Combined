import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
// Supports weights 100-800
import '@fontsource-variable/sora';
import { NewsProvider } from '~/contexts/NewsContext';

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
      <body>
        <NewsProvider>
          {children}
        </NewsProvider>

        {/* <body>
          {children}
        </body> */}
      </body>
    </html>
  );
}