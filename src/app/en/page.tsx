'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaRocket, FaLightbulb, FaBrain, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { usePageLoader } from '@/hooks/usePageLoader';
import { useTranslation } from '@/hooks/useTranslation';

const services = [
  {
    icon: FaLightbulb,
    title: "IT Innovation",
    description: "Innovative technological solutions tailored to your needs",
  },
  {
    icon: FaBrain,
    title: "AI Coaching",
    description: "Support in your digital transformation with AI",
  },
  {
    icon: FaChartLine,
    title: "Technical Excellence",
    description: "High-quality IT services and personalized technical support",
  },
];

export default function EnHome() {
  const { t } = useTranslation();
  usePageLoader();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero background"
            fill
            priority={true}
            quality={100}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-black/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              {t('home.hero.subtitle')}
            </p>
            <Link
              href="/en/contact"
              className="group inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/30"
            >
              {t('home.hero.cta')}
              <FaRocket className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t('home.services.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-primary-50 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/pattern-bg.png"
            alt="Pattern background"
            fill
            className="object-cover"
            quality={100}
            sizes="100vw"
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
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              {t('home.cta.description')}
            </p>
            <Link
              href="/en/contact"
              className="group inline-flex items-center px-8 py-4 text-lg font-medium bg-white text-primary-900 rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              {t('home.cta.button')}
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 