'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { usePageLoader } from '@/hooks/usePageLoader';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Script from 'next/script';

export default function ContactTemplate() {
  const { t } = useTranslation();
  usePageLoader();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/djoumbi/30min'
      });
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 bg-primary-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-6">{t('contact.form.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.form.name.label')}
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder={t('contact.form.name.placeholder')}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.form.email.label')}
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder={t('contact.form.email.placeholder')}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.form.subject.label')}
                  </label>
                  <input
                    name="subject"
                    type="text"
                    placeholder={t('contact.form.subject.placeholder')}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.form.message.label')}
                  </label>
                  <textarea
                    name="message"
                    placeholder={t('contact.form.message.placeholder')}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    t('contact.form.submit')
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('contact.info.title')}</h2>
                <p className="text-gray-600 mb-8">{t('contact.info.description')}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaEnvelope className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">{t('contact.info.email')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaPhone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">{t('contact.info.phone')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaMapMarkerAlt className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">{t('contact.info.address')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaClock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Availability</p>
                    <p className="text-gray-600">{t('contact.info.availability')}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={openCalendly}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors mt-8"
              >
                {t('contact.booking.title')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p className="font-semibold">{t('contact.success.title')}</p>
          <p>{t('contact.success.description')}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p className="font-semibold">{t('contact.error.title')}</p>
          <p>{t('contact.error.description')}</p>
        </div>
      )}

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </main>
  );
} 