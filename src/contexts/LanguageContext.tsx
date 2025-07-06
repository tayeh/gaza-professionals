import React, { createContext, useContext, ReactNode } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};