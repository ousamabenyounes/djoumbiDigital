'use client';

import Link from 'next/link';
import { FaDigitalTachograph, FaCode } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';

export default function Logo() {
  const { locale } = useTranslation();

  return (
    <Link href={`/${locale}`} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
      <div className="relative">
        <FaDigitalTachograph className="w-8 h-8" />
        <FaCode className="w-4 h-4 absolute -bottom-1 -right-1 text-blue-500" />
      </div>
      <span className="font-bold text-xl tracking-tight">
        Djoum<span className="text-blue-500">BI</span> Digital
      </span>
    </Link>
  );
} 