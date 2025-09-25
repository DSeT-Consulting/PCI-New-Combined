'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useNotFoundHandler() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check how the user arrived at the 404 page
    const navigationType = sessionStorage.getItem('navigationType');
    const referrer = document.referrer;
    const isFromSameSite = referrer?.includes(window.location.origin);

    if (navigationType === 'link' || isFromSameSite) {
      // User clicked a broken link, show modal
      setShowModal(true);
      sessionStorage.removeItem('navigationType');
    } else {
      // Manual URL entry or external referrer, redirect to home
      sessionStorage.removeItem('navigationType');
      router.replace('/');
    }
  }, [router]);

  const closeModal = () => {
    setShowModal(false);
    // Go back to previous page
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push('/');
    }
  };

  return { showModal, closeModal };
}