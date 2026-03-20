import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { mockData } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t-4 border-yellow-500">
      {/* Warning Stripe */}
      <div className="warning-stripe"></div>

      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img 
              src={mockData.company.logo}
              alt={mockData.company.name}
              className="h-24 w-auto mb-4"
            />
            <p className="text-gray-400 mb-4">
              Especialistas en construcción, reformas y trabajos de albañilería de alta calidad
            </p>
            <div className="inline-block bg-yellow-500 text-black px-4 py-2 font-black text-sm uppercase">
              {mockData.company.slogan}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black text-yellow-500 mb-4 uppercase">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Trabajos Realizados
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-black text-yellow-500 mb-4 uppercase">
              Servicios
            </h3>
            <ul className="space-y-2">
              {mockData.services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a href="#servicios" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                    {service.category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-black text-yellow-500 mb-4 uppercase">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href={`tel:${mockData.company.phone}`}
                    className="text-gray-400 hover:text-yellow-500 transition-colors font-bold"
                  >
                    {mockData.company.phoneFormatted}
                  </a>
                  <p className="text-xs text-gray-500">Lunes a Viernes: 8:00 - 18:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                <a 
                  href={`mailto:${mockData.company.email}`}
                  className="text-gray-400 hover:text-yellow-500 transition-colors break-all"
                >
                  {mockData.company.email}
                </a>
              </li>
            </ul>

            {/* Social Media (Optional) */}
            <div className="mt-6">
              <p className="text-white font-bold mb-3 uppercase text-sm">Síguenos</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group">
                  <Facebook className="w-5 h-5 text-gray-400 group-hover:text-black" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group">
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-black" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group">
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-black" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} <span className="text-yellow-500 font-bold">{mockData.company.name}</span> - Todos los derechos reservados
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
