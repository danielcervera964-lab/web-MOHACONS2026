import React from 'react';
import { Hammer, PaintBucket, Grid3x3, Wrench, Building2, Settings } from 'lucide-react';
import { mockData } from '../data/mock';

const iconMap = {
  Hammer: Hammer,
  PaintBucket: PaintBucket,
  Grid3x3: Grid3x3,
  Wrench: Wrench,
  Building2: Building2,
  Tool: Settings
};

const Services = () => {
  return (
    <section id="servicios" className="section bg-gradient-to-b from-black to-gray-900">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">Nuestros Servicios</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios de construcción y albañilería con la máxima calidad y profesionalidad
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockData.services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div 
                key={service.id}
                className="bg-gray-800 border-2 border-gray-700 rounded-lg p-6 card-hover group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-black" />
                </div>

                {/* Category Title */}
                <h3 className="text-2xl font-black text-yellow-500 mb-4 uppercase">
                  {service.category}
                </h3>

                {/* Service Items */}
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <span className="text-yellow-500 mr-2 mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-xl text-gray-300 mb-6">
            ¿No encuentras lo que buscas? Contáctanos y te asesoramos
          </p>
          <a href="#contacto" className="btn-gold">
            Solicitar Información
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
