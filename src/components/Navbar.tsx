'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from './LanguageSelector';

const menuItems = {
  fr: [
    { href: '/fr/services', label: 'Services IT' },
    { href: '/fr/coaching-ia', label: 'Coaching IA' },
    { href: '/fr/realisations', label: 'Réalisations' },
    { href: '/fr/acquisitions', label: 'Rachats' },
    { href: '/fr/qui-sommes-nous', label: 'Qui sommes-nous' },
  ],
  en: [
    { href: '/en/services', label: 'IT Services' },
    { href: '/en/coaching-ia', label: 'AI Coaching' },
    { href: '/en/achievements', label: 'Projects' },
    { href: '/en/acquisitions', label: 'Acquisitions' },
    { href: '/en/about', label: 'About Us' },
  ]
} as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, t } = useTranslation();

  // Définir une valeur par défaut pour currentMenuItems
  const currentMenuItems = menuItems[locale as keyof typeof menuItems] || menuItems.fr;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed w-full z-50">
      <div className={`transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Logo />
            
            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {currentMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 group"
                >
                  <span className={`relative z-10 transition-colors duration-200 ${
                    isActive(item.href) 
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 group-hover:text-blue-600'
                  }`}>
                    {item.label}
                  </span>
                  <span className={`absolute inset-x-0 bottom-0 transition-all duration-200 bg-blue-50 rounded-lg -z-0 ${
                    isActive(item.href)
                      ? 'h-full'
                      : 'h-0 group-hover:h-full'
                  }`}></span>
                </Link>
              ))}
              <LanguageSelector />
              <Link 
                href={`/${locale}/contact`}
                className={`ml-4 px-6 py-2 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 ${
                  isActive(`/${locale}/contact`)
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <FaEnvelope className="w-4 h-4" />
                <span>{t('common.contact')}</span>
              </Link>
            </div>

            {/* Menu Mobile Trigger */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu Mobile */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'max-h-96 opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}>
            <div className="py-4 space-y-2">
              {currentMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <LanguageSelector />
              <Link
                href={`/${locale}/contact`}
                className="block w-full mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <FaEnvelope className="w-4 h-4" />
                <span>{t('common.contact')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}