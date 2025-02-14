'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

// Définir les locales supportées comme un tuple constant
const SUPPORTED_LOCALES = ['fr', 'en'] as const;
type Locale = typeof SUPPORTED_LOCALES[number];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, changeLocale } = useTranslation();

  const handleLanguageChange = (newLocale: Locale) => {
    changeLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        <span>{locale === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
        <span>{locale.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg"
          >
            {SUPPORTED_LOCALES.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLanguageChange(loc)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <span>{loc === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 