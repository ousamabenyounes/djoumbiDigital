export async function generateStaticParams() {
    return [
      { lang: 'fr' },
      { lang: 'en' }
    ];
  }
  
  export const dynamic = 'force-static';
  export const dynamicParams = false;
  
  export const locales = ['fr', 'en'] as const;
  export type Locale = typeof locales[number];
  
  export const routes = {
    fr: {
      contact: 'contact',
      services: 'services',
      coaching: 'coaching-ia',
      achievements: 'realisations',
      acquisitions: 'acquisitions',
      about: 'qui-sommes-nous'
    },
    en: {
      contact: 'contact',
      services: 'services',
      coaching: 'coaching-ia',
      achievements: 'achievements',
      acquisitions: 'acquisitions',
      about: 'about'
    }
  } as const; 