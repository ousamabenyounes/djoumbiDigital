'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { usePageLoader } from '@/hooks/usePageLoader';
import { FaBrain, FaChartLine, FaUsers } from 'react-icons/fa';

type AICoachingTranslations = {
  title: string;
  subtitle: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  why: {
    title: string;
    subtitle: string;
    reasons: Array<{
      title: string;
      description: string;
    }>;
  };
  faq: {
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
};

const features = [
  {
    icon: FaBrain,
    title: 'Stratégie IA',
    description: 'Définissez votre feuille de route pour l\'intégration de l\'IA'
  },
  {
    icon: FaUsers,
    title: 'Formation',
    description: 'Formez vos équipes aux technologies de l\'IA'
  },
  {
    icon: FaChartLine,
    title: 'Accompagnement',
    description: 'Bénéficiez d\'un suivi personnalisé dans vos projets IA'
  }
];

export default function CoachingIA() {
  const { t } = useTranslation();
  usePageLoader();

  const coaching = t('coaching') as AICoachingTranslations;

  return (
    <main>
      <section className="relative h-[400px] flex items-center">
        <Image
          src="/images/ai-coaching.jpg"
          alt="Coaching IA"
          fill
          priority={true}
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
              {coaching.title}
            </h1>
            <p className="text-xl text-gray-300">
              {coaching.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-primary-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{coaching.why.title}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coaching.why.reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-semibold mb-4">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{coaching.faq.title}</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-6">
            {coaching.faq.questions.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
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
              {coaching.cta.title}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              {coaching.cta.description}
            </p>
            <Link
              href="/fr/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-medium bg-white text-primary-900 rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              {coaching.cta.button}
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 