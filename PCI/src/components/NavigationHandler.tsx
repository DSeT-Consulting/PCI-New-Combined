'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Define valid routes to prevent navigation to broken links
const validRoutes = [
  '/',
  '/login',
  '/dashboard',
  '/about',
  '/athletes',
  '/classification',
  '/join',
  '/committee-members',
  '/contact',
  '/events',
  '/sports',
  '/gallery',
  '/latest-updates',
  '/news',
  '/partners',
  '/wpa-new-delhi-2025',
  '/wpa-new-delhi-2025/timeline',
  '/wpa-new-delhi-2025/classification',
  '/wpa-new-delhi-2025/documents',
  '/wpa-new-delhi-2025/support',
  '/wpa-new-delhi-2025/competition-info',
  '/wpa-new-delhi-2025/schedule',
];

function isValidRoute(href: string): boolean {
  // Check if exact match
  if (validRoutes.includes(href)) return true;

  // Check for dynamic routes
  if (href.startsWith('/athletes/') && href.split('/').length === 3) return true;
  if (href.startsWith('/news/') && href.split('/').length === 3) return true;
  if (href.startsWith('/wpa-new-delhi-2025/')) return true;
  if (href.match(/^\/\w+\/home-controls$/)) return true;
  if (href.match(/^\/\w+\/tags-management$/)) return true;
  if (href.match(/^\/\w+\/news-management$/)) return true;

  return false;
}

export function NavigationHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Set up link click tracking and validation
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]')!;

      if (link) {
        const href = link.getAttribute('href');

        if (href && !isValidRoute(href)) {
          // Prevent navigation to invalid routes
          e.preventDefault();
          e.stopPropagation();

          // Stay on current page silently - no action needed
          console.log(`Blocked navigation to invalid route: ${href}`);
          return false;
        }

        // For valid routes, allow normal navigation
        sessionStorage.setItem('navigationType', 'link');
        sessionStorage.setItem('previousPath', pathname);
      }
    };

    document.addEventListener('click', handleLinkClick, true); // Use capture phase

    return () => {
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, [pathname]);

  return null;
}