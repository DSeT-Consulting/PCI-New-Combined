'use client';

import { useEffect } from 'react';

export default function LazyCSS() {
  useEffect(() => {
    // Dynamically load the full CSS after the critical path is rendered
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/styles/globals.css';
    document.head.appendChild(link);
  }, []);

  return null;
}