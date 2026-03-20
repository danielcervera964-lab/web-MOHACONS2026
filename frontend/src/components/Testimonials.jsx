import React from 'react';
import { Star, Quote } from 'lucide-react';
import { mockData } from '../data/mock';

const Testimonials = () => {
  return (
    <section className="section bg-gradient-to-b from-black to-gray-900">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">Opiniones de Clientes</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            Lo que dicen nuestros clientes sobre nuestro trabajo
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {mockData.testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-gray-800 border-2 border-gray-700 rounded-lg p-8 card-hover relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="w-16 h-16 text-yellow-500" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 text-lg mb-6 italic relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="border-t border-gray-700 pt-4">
                <p className="text-white font-bold text-lg">{testimonial.name}</p>
                <p className="text-yellow-500 text-sm uppercase">{testimonial.project}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 border-2 border-yellow-500">
          <h3 className="text-3xl font-black text-white mb-4 uppercase">
            ¿Quieres ser nuestro próximo cliente satisfecho?
          </h3>
          <p className="text-gray-300 text-lg mb-6">
            Solicita tu presupuesto sin compromiso y comienza tu proyecto hoy mismo
          </p>
          <a href="#contacto" className="btn-gold">
            Solicitar Presupuesto Gratuito
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
