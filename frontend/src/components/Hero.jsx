import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { mockData } from '../data/mock';

const Hero = ({ onRequestQuote, onOpenPhoneRegister }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1744540728562-86db0f7439af?w=1920&q=80"
          alt="Construcción profesional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl">
          {/* Logo on hero */}
          <div className="mb-8 fade-in-up">
            <img 
              src={mockData.company.logo}
              alt={mockData.company.name}
              className="h-32 md:h-40 w-auto"
            />
          </div>

          {/* Main Heading */}
          <h1 className="brand-heading mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
            {mockData.company.fullName}
          </h1>

          {/* Slogan with warning stripe effect */}
          <div className="inline-block mb-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-yellow-500 text-black px-6 py-3 font-black text-xl md:text-2xl uppercase tracking-wider relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-yellow-600"></div>
              {mockData.company.slogan}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 to-yellow-300"></div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl fade-in-up" style={{ animationDelay: '0.3s' }}>
            Especialistas en construcción, reformas y trabajos de albañilería de alta calidad
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={onRequestQuote}
              className="btn-gold text-lg"
            >
              Solicitar Presupuesto
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onOpenPhoneRegister}
              className="btn-outline text-lg"
            >
              <Phone className="w-5 h-5" />
              Llamar Ahora
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-yellow-500 mb-2">+10</div>
              <div className="text-sm text-gray-400 uppercase">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-yellow-500 mb-2">+500</div>
              <div className="text-sm text-gray-400 uppercase">Proyectos Completados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-yellow-500 mb-2">100%</div>
              <div className="text-sm text-gray-400 uppercase">Satisfacción</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-yellow-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-500 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
