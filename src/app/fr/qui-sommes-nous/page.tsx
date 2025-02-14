'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { usePageLoader } from '@/hooks/usePageLoader';
import { FaLightbulb, FaStar, FaHandshake, FaLinkedin } from 'react-icons/fa';

type AboutTranslations = {
  title: string;
  subtitle: string;
  story: {
    title: string;
    description: string;
  };
  values: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  team: {
    title: string;
    description: string;
    members: Array<{
      name: string;
      role: string;
      description: string;
      image?: string;
      linkedin?: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
};

const valueIcons = [FaLightbulb, FaStar, FaHandshake];

export default function QuiSommesNous() {
  const { t } = useTranslation();
  usePageLoader();

  const about = t('about') as unknown as AboutTranslations;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
          alt="Notre équipe"
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
              {about.title}
            </h1>
            <p className="text-xl text-gray-300">
              {about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              {about.story.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {about.story.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {about.values.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.items.map((value, index) => {
              const Icon = valueIcons[index];
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
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {about.team.title}
            </h2>
            <p className="text-xl text-gray-600">
              {about.team.description}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {about.team.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="relative w-48 h-48 flex-shrink-0">
                  <Image
                    src={member.image || `/images/cedric.jpg`}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                  <Link
                    href={member.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </Link>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-semibold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 text-lg mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
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
              {about.cta.title}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              {about.cta.description}
            </p>
            <Link
              href="/fr/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-medium bg-white text-primary-900 rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              {about.cta.button}
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 