import Link from 'next/link';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Services',
      links: [
        { href: '/expertise', label: 'Notre expertise' },
        { href: '/services', label: 'Services' },
        { href: '/about', label: 'À propos' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { href: '/contact', label: 'Nous contacter' },
        { href: 'mailto:contact@evolutio-inspired.fr', label: 'Email' },
        { href: 'tel:+33100000000', label: 'Téléphone' },
      ],
    },
    {
      title: 'Légal',
      links: [
        { href: '/mentions-legales', label: 'Mentions légales' },
        { href: '/confidentialite', label: 'Politique de confidentialité' },
      ],
    },
  ];

  return (
    <footer className="bg-evolutio-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="font-display text-2xl">
              Evolutio
            </Link>
            <p className="mt-4 text-evolutio-300 max-w-sm">
              Innovation et conseil en transformation digitale. 
              Expertise en développement, cloud et intelligence artificielle.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-evolutio-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-evolutio-400 hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="font-display text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-evolutio-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-evolutio-800/30">
          <p className="text-center text-evolutio-400 text-sm">
            © {currentYear} Evolutio. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
} 