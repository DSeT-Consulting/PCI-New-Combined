'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NewsItemComplete } from '~/lib/types';

interface NewsContextType {
  selectedNews: NewsItemComplete | null;
  setSelectedNews: (news: NewsItemComplete) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

interface NewsProviderProps {
  children: ReactNode;
}

export function NewsProvider({ children }: NewsProviderProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItemComplete | null>(null);

  return (
    <NewsContext.Provider value={{ selectedNews, setSelectedNews }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}