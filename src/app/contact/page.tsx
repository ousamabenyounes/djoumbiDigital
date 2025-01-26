'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaPaperPlane, FaCheck, FaExclamationTriangle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaMapPin } from 'react-icons/fa';
import Image from 'next/image';
import { usePageLoader } from '@/hooks/usePageLoader';

const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  sujet: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

type ContactForm = z.infer<typeof contactSchema>;

const availableTimeSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
];

export default function Contact() {
  usePageLoader();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.details || 'Erreur lors de l\'envoi');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Erreur détaillée:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center">
        <Image
          src="/images/pattern-bg.png"
          alt="Contact"
          fill
          className="object-cover brightness-50"
          priority
          sizes="100vw"
        />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-200 text-center max-w-2xl mx-auto">
            Discutons de vos projets et voyons comment nous pouvons vous aider à réussir votre transformation digitale
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Colonne gauche : Formulaire */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl font-bold mb-8">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="nom" className="block mb-2 font-medium">
                  Nom
                </label>
                <input
                  {...register('nom')}
                  type="text"
                  id="nom"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.nom ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.nom && (
                  <p className="mt-1 text-red-500 text-sm">{errors.nom.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="sujet" className="block mb-2 font-medium">
                  Sujet
                </label>
                <input
                  {...register('sujet')}
                  type="text"
                  id="sujet"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.sujet ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.sujet && (
                  <p className="mt-1 text-red-500 text-sm">{errors.sujet.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={6}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
                  isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Envoyer le message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                  <FaCheck className="w-5 h-5" />
                  Message envoyé avec succès !
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <FaExclamationTriangle className="w-5 h-5" />
                  Erreur lors de l'envoi du message. Veuillez réessayer.
                </div>
              )}
            </form>
          </motion.div>

          {/* Colonne droite : Infos de contact et carte */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            {/* Coordonnées en grid */}
            <h2 className="text-3xl font-bold mb-8">Nos coordonnées</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mb-8">
              {/* Téléphone */}
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FaPhone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Téléphone</h3>
                    <p className="text-gray-600">+33 6 33 33 33 33</p>
                    <p className="text-sm text-gray-500">Lun-Ven, 9h-18h</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FaEnvelope className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-600">contact@djoumbi-digital.fr</p>
                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map avec adresse */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaMapPin className="text-blue-600 w-5 h-5" />
                <h3 className="text-xl font-semibold">Notre localisation</h3>
              </div>
              <div className="rounded-lg overflow-hidden mb-3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.1843572959!2d2.3042147!3d48.8693786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc49b2e5339%3A0x6a6cfbe40f5b45b1!2s1%20Av.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1710234567890!5m2!1sfr!2sfr"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
              <p className="text-gray-600">
                1 Avenue des Champs-Élysées<br />
                75008 Paris City
              </p>
            </div>

            {/* Calendrier de rendez-vous */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <FaCalendarAlt className="text-blue-600 w-5 h-5" />
                <h3 className="text-xl font-semibold">Prendre rendez-vous</h3>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Horaire disponible</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg border transition-colors ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'hover:border-blue-600'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDate && selectedTime && (
                <button
                  className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    // Ici, vous pouvez intégrer avec votre système de réservation
                    window.open(`https://calendly.com/votre-lien/${selectedDate}T${selectedTime}`, '_blank');
                  }}
                >
                  <FaCalendarAlt />
                  Confirmer le rendez-vous
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 