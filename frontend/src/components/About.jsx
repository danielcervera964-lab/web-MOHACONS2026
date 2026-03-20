import React from 'react';
import { Award, CheckCircle2, Clock, Users, Shield, ThumbsUp } from 'lucide-react';
import { mockData } from '../data/mock';

const iconMap = {
  Award,
  CheckCircle2,
  Clock,
  Users,
  Shield,
  ThumbsUp
};

const About = () => {
  return (
    <section id="nosotros" className="section bg-gradient-to-b from-gray-900 to-black">
      <div className="container">
        {/* About Us Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div>
            <h2 className="section-heading mb-6">Sobre Nosotros</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                En <span className="text-yellow-500 font-bold">MOHACONS</span>, somos especialistas en construcción, reformas y trabajos de albañilería con años de experiencia en el sector.
              </p>
              <p>
                Nuestro compromiso es ofrecer servicios de la más alta calidad, cumpliendo con los plazos establecidos y superando las expectativas de nuestros clientes.
              </p>
              <p>
                Trabajamos con profesionalidad, seriedad y un trato cercano que nos distingue. Cada proyecto, por pequeño o grande que sea, recibe nuestra máxima dedicación y atención al detalle.
              </p>
              <p className="text-yellow-500 font-bold text-xl uppercase">
                {mockData.company.slogan}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/36511379/pexels-photo-36511379.jpeg?w=800&q=80"
              alt="Trabajos MOHACONS"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-yellow-500 rounded-lg -z-10"></div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <h3 className="section-heading text-center mb-12">¿Por Qué Elegirnos?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockData.whyChooseUs.map((reason, index) => {
              const IconComponent = iconMap[reason.icon];
              return (
                <div 
                  key={index}
                  className="bg-gray-800 border-2 border-gray-700 rounded-lg p-6 card-hover text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-xl font-black text-yellow-500 mb-3 uppercase">
                    {reason.title}
                  </h4>
                  <p className="text-gray-300">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Methodology */}
        <div>
          <h3 className="section-heading text-center mb-12">Nuestra Metodología</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockData.methodology.map((step, index) => (
              <div 
                key={step.step}
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500 rounded-lg p-6 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center font-black text-2xl">
                  {step.step}
                </div>
                
                <div className="mt-4">
                  <h4 className="text-lg font-black text-white mb-3 uppercase">
                    {step.title}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
