'use client';

// Déclaration du type global pour Calendly
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string;
        text?: string;
        color?: string;
        textColor?: string;
        branding?: boolean;
      }) => void;
    };
  }
}

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { usePageLoader } from '@/hooks/usePageLoader';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Script from 'next/script';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { fr } from 'date-fns/locale';

type ContactTranslations = {
  title: string;
  subtitle: string;
  form: {
    name: { label: string; placeholder: string; };
    email: { label: string; placeholder: string; };
    phone: { label: string; placeholder: string; };
    company: { label: string; placeholder: string; };
    subject: { label: string; placeholder: string; };
    message: { label: string; placeholder: string; };
    submit: string;
  };
  info: {
    title: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    availability: string;
  };
  success: { title: string; description: string; };
  error: { title: string; description: string; };
  booking: {
    title: string;
    description: string;
  };
};

type TimeSlot = {
  time: string;
  datetime: Date;
};

const AVAILABLE_HOURS = [
  { hour: 9, minute: 0 },
  { hour: 11, minute: 0 },
  { hour: 14, minute: 0 },
  { hour: 15, minute: 30 },
  { hour: 17, minute: 0 }
];

export default function Contact() {
  const { t } = useTranslation();
  usePageLoader();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contactData, setContactData] = useState<ContactTranslations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  useEffect(() => {
    try {
      console.log('Loading translations...');
      const translations = t('contact') as ContactTranslations;
      console.log('Raw translations:', translations);
      
      if (!translations || typeof translations !== 'object') {
        throw new Error('Invalid translations format');
      }

      if (!translations.title || !translations.form || !translations.info) {
        console.error('Missing required translation fields:', translations);
        throw new Error('Missing required translation fields');
      }
      
      setContactData(translations);
      setError(null);
    } catch (err) {
      console.error('Error loading translations:', err);
      setError(err instanceof Error ? err.message : 'Failed to load translations');
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !contactData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Error Loading Contact Page
        </h1>
        <p className="text-gray-600">
          {error || 'Failed to load translations'}
        </p>
        <pre className="mt-4 p-4 bg-gray-100 rounded">
          {JSON.stringify({ error, translations: contactData }, null, 2)}
        </pre>
      </div>
    );
  }

  // Générer les 14 prochains jours disponibles (sauf weekends)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    const day = date.getDay();
    return day !== 0 && day !== 6 ? date : null;
  }).filter(Boolean) as Date[];

  // Générer les créneaux pour un jour donné
  const getTimeSlots = (date: Date): TimeSlot[] => {
    return AVAILABLE_HOURS.map(({ hour, minute }) => {
      const datetime = setMinutes(setHours(date, hour), minute);
      return {
        time: format(datetime, 'HH:mm'),
        datetime
      };
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/djoumbi/30min'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un envoi de formulaire
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    }, 1500);
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
              {contactData.title}
            </h1>
            <p className="text-xl text-gray-300">
              {contactData.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    {contactData.form.name.label}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    placeholder={contactData.form.name.placeholder}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    {contactData.form.email.label}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    placeholder={contactData.form.email.placeholder}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    {contactData.form.phone.label}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    placeholder={contactData.form.phone.placeholder}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="company">
                    {contactData.form.company.label}
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    placeholder={contactData.form.company.placeholder}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="subject">
                    {contactData.form.subject.label}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    placeholder={contactData.form.subject.placeholder}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="message">
                    {contactData.form.message.label}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    placeholder={contactData.form.message.placeholder}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 text-lg font-medium text-white rounded-lg transition-all duration-300
                    ${isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-primary-600 hover:bg-primary-700'}`}
                >
                  {isSubmitting ? contactData.form.submit + '...' : contactData.form.submit}
                </button>
                {submitStatus === 'success' && (
                  <div className="text-green-600 text-center mt-4">
                    <p className="font-semibold">{contactData.success.title}</p>
                    <p>{contactData.success.description}</p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-600 text-center mt-4">
                    <p className="font-semibold">{contactData.error.title}</p>
                    <p>{contactData.error.description}</p>
                  </div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6">{contactData.info.title}</h2>
              <p className="text-gray-600 mb-8">{contactData.info.description}</p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaEnvelope className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Email</p>
                    <a href={`mailto:${contactData.info.email}`} className="text-gray-600 hover:text-primary-600">
                      {contactData.info.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaPhone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Téléphone</p>
                    <a href={`tel:${contactData.info.phone}`} className="text-gray-600 hover:text-primary-600">
                      {contactData.info.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaMapMarkerAlt className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Adresse</p>
                    <p className="text-gray-600">{contactData.info.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaClock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Disponibilité</p>
                    <p className="text-gray-600">{contactData.info.availability}</p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="mt-8 h-[300px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.95410694685!2d2.2646349749545986!3d48.85893843540058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1709655774890!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                {contactData.booking.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {contactData.booking.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Choisissez une date</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {availableDates.map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedDate?.toDateString() === date.toDateString()
                          ? 'bg-primary-50 border-primary-500 text-primary-700'
                          : 'border-gray-200 hover:border-primary-500'
                      }`}
                    >
                      <div className="font-medium">
                        {format(date, 'EEEE', { locale: fr })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {format(date, 'd MMMM', { locale: fr })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <h3 className="text-xl font-semibold mb-4">Choisissez un horaire</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {getTimeSlots(selectedDate).map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => handleSlotSelect(slot)}
                        className="p-4 rounded-lg border border-gray-200 hover:border-primary-500 transition-all"
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </main>
  );
} 