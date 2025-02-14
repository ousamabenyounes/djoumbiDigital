'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoader } from '@/context/LoaderContext';

const CACHE_DURATION = 1000 * 60 * 60; // 1 heure en millisecondes

export function usePageLoader(minLoadTime = 800) {
  const { setIsLoading, pageLoaded } = useLoader();
  const pathname = usePathname();

  useEffect(() => {
    const now = Date.now();
    const cachedTimestamp = localStorage.getItem(`page_cache_${pathname}`);

    // Vérifier si la page est en cache et si le cache n'est pas expiré
    if (cachedTimestamp && (now - parseInt(cachedTimestamp)) < CACHE_DURATION) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem(`page_cache_${pathname}`, now.toString());
      pageLoaded.add(pathname);
    }, minLoadTime);

    return () => clearTimeout(timer);
  }, [pathname]);
} 