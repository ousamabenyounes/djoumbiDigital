import Link from 'next/link';
import { FaLinkedin, FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  // Encoder le numéro pour éviter les bots
  const phoneNumber = () => {
    const encoded = "MDYyMTQ2Mzg3NQ=="; // Base64 de "0621463875"
    return atob(encoded);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              DjoumBI Digital
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Expertise en services IT, coaching IA et solutions digitales innovantes 
              pour accompagner votre transformation numérique.
            </p>
            <div className="flex space-x-4">
              <a
                href={`https://wa.me/33${phoneNumber().slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="Contactez-nous sur WhatsApp"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="mailto:contact@djoumbi-digital.fr"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services IT
                </Link>
              </li>
              <li>
                <Link href="/coaching-ia" className="hover:text-white transition-colors">
                  Coaching IA
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Légal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/mentions-legales" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/qui-sommes-nous" className="hover:text-white transition-colors">
                  Qui sommes-nous ?
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} DjoumBI Digital. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
} 