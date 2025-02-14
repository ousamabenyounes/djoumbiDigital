'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { usePageLoader } from '@/hooks/usePageLoader';
import { FaUsers, FaChartLine, FaCode } from 'react-icons/fa';

type AcquisitionsTranslations = {
  title: string;
  subtitle: string;
  opportunities: Array<{
    title: string;
    description: string;
    criteria: string[];
  }>;
  cta: {
    title: string;
    description: string;
    button: string;
  };
};

const icons = [FaUsers, FaChartLine, FaCode];

export default function Acquisitions() {
  const { t } = useTranslation();
  usePageLoader();

  const acquisitions = t('acquisitions') as AcquisitionsTranslations;
  
  //console.log('acquisitions:', acquisitions); // Debug log
  
  //if (!acquisitions) {
  //  console.log('acquisitions is undefined'); // Debug log
  //  return null;
  //}

  const { opportunities } = acquisitions;
  console.log('opportunities:', opportunities); // Debug log

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <Image
          src="/images/acquisition-hero.jpg"
          alt="Acquisitions"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover brightness-[0.3]"
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {acquisitions.title}
            </h1>
            <p className="text-xl text-gray-300">
              {acquisitions.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => {
              const Icon = icons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-primary-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{opportunity.title}</h3>
                  <p className="text-gray-600 mb-6">{opportunity.description}</p>
                  <ul className="space-y-2">
                    {opportunity.criteria.map((criterion, i) => (
                      <li key={i} className="text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/pattern-bg.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-white">
              {acquisitions.cta.title}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              {acquisitions.cta.description}
            </p>
            <Link
              href="/fr/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-medium bg-white text-primary-900 rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              {acquisitions.cta.button}
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 