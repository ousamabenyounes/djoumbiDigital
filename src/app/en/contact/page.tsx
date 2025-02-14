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
import { enUS } from 'date-fns/locale';

// Types identiques à la version française
type ContactTranslations = {
  title: string;
  subtitle: string;
  form: {
    title: string;
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
  const [contact, setContact] = useState<ContactTranslations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  useEffect(() => {
    try {
      const translations = t('contact') as ContactTranslations;
      //console.log('Full contact translations:', translations);
      setContact(translations);
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  if (isLoading || !contact) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
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
    setSelectedSlot(slot);
    const calendlyDate = format(slot.datetime, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    window.location.href = `https://calendly.com/djoumbi/30min?date=${calendlyDate}`;
  };

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
              {contact.title}
            </h1>
            <p className="text-xl text-gray-300">
              {contact.subtitle}
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
              <h2 className="text-3xl font-bold mb-6">{contact.form.title}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {contact.form.name.label}
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder={contact.form.name.placeholder}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {contact.form.email.label}
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder={contact.form.email.placeholder}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {contact.form.subject.label}
                  </label>
                  <input
                    type="text"
                    placeholder={contact.form.subject.placeholder}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {contact.form.message.label}
                  </label>
                  <textarea
                    placeholder={contact.form.message.placeholder}
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
                    contact.form.submit
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
                <h2 className="text-3xl font-bold mb-4">{contact.info.title}</h2>
                <p className="text-gray-600 mb-8">{contact.info.description}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaEnvelope className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">{contact.info.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaPhone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">{contact.info.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaMapMarkerAlt className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">{contact.info.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaClock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Availability</p>
                    <p className="text-gray-600">{contact.info.availability}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={openCalendly}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors mt-8"
              >
                Schedule a Meeting
              </button>
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
                {contact.booking.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {contact.booking.description}
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
                <h3 className="text-xl font-semibold mb-4">Select a date</h3>
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
                        {format(date, 'EEEE', { locale: enUS })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {format(date, 'MMMM d', { locale: enUS })}
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
                  <h3 className="text-xl font-semibold mb-4">Select a time</h3>
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

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p className="font-semibold">{contact.success.title}</p>
          <p>{contact.success.description}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p className="font-semibold">{contact.error.title}</p>
          <p>{contact.error.description}</p>
        </div>
      )}

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </main>
  );
} 