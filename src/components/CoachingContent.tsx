'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function CoachingContent() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-6">
            {t('coaching.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            {t('coaching.subtitle')}
          </p>
          {/* Contenu du coaching */}
        </motion.div>
      </div>
    </section>
  );
} 