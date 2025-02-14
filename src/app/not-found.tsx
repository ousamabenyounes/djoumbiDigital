'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
        <Link 
          href="/fr"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
} 