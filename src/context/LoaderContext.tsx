'use client';

import { createContext, useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/shared/Loader';

type LoaderContextType = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  pageLoaded: Set<string>;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoaded] = useState<Set<string>>(new Set());

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading, pageLoaded }}>
      {isLoading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
} 