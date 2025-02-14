'use client';

import { usePathname, useRouter } from 'next/navigation';
import fr from '@/i18n/locales/fr';
import en from '@/i18n/locales/en';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

const translations = { fr, en } as const;
type Translations = typeof translations;

// Définition stricte du mapping des chemins
type PathMapping = {
  fr: {
    'achievements': 'realisations';
    'about': 'qui-sommes-nous';
  };
  en: {
    'realisations': 'achievements';
    'qui-sommes-nous': 'about';
  };
};

const pathNameMapping: PathMapping = {
  fr: {
    'achievements': 'realisations',
    'about': 'qui-sommes-nous'
  },
  en: {
    'realisations': 'achievements',
    'qui-sommes-nous': 'about'
  }
} as const;

export function useTranslation() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname?.split('/')[1] || 'fr';
  
  // Ajout de logs pour déboguer
  //console.log('Current translations:', translations);
  //console.log('Current locale:', locale);
  
  function t<K extends NestedKeyOf<typeof fr>>(key: K) {
    try {
      const keys = key.split('.');
      let value: any = translations[locale as keyof typeof translations];
      
     // console.log('Translation object:', value);
     // console.log('Looking for key:', key);
      
      if (!value) {
        console.error(`No translations found for locale: ${locale}`);
        console.error('Available translations:', Object.keys(translations));
        return key;
      }
      
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) {
          console.error(`Translation not found for key: ${key}, at part: ${k}`);
          console.error('Available keys:', Object.keys(value || {}));
          return key;
        }
      }
      
      return value;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  }

  const changeLocale = (newLocale: keyof typeof translations) => {
    if (pathname === '/') {
      router.push(`/${newLocale}`);
    } else {
      const segments = pathname.split('/');
      const currentPath = segments[2];
      
      // Traduire le chemin si nécessaire
      let newPath = currentPath;
      const mapping = pathNameMapping[newLocale];
      if (mapping && currentPath in mapping) {
        newPath = mapping[currentPath as keyof typeof mapping];
      }
      
      segments[1] = newLocale;
      segments[2] = newPath;
      router.push(segments.join('/'));
    }
  };

  return { t, locale, changeLocale };
} 