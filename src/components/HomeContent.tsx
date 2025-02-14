'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaRocket, FaLightbulb, FaBrain, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';

export default function HomeContent() {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('home.hero.subtitle')}
            </p>
            <Link
              href="/fr/contact"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t('home.hero.cta')}
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('home.services.title')}</h2>
            <p className="text-xl text-gray-600">{t('home.services.subtitle')}</p>
          </div>
          {/* Services grid */}
        </div>
      </section>
    </>
  );
} 