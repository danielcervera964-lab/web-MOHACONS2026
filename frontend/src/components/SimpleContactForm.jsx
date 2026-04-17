import React, { useState } from 'react';
import { Send, Mail, Phone, User, Wrench } from 'lucide-react';
import { mockData } from '../data/mock';
import { toast } from 'sonner';

const SimpleContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicios = mockData.services.map(s => s.category);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tipo: 'contacto'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("¡Mensaje Enviado! Te contactaremos pronto.");
        
        // Resetear formulario
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          servicio: ''
        });
      } else {
        throw new Error(data.error || 'Error al enviar');
      }
    } catch (error) {
      console.error('Error al enviar contacto:', error);
      toast.error("Error al enviar el mensaje. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="section bg-gradient-to-b from-black to-gray-900">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="section-heading">Contáctanos</h2>
            <p className="section-subheading">
              Déjanos tus datos y te contactaremos lo antes posible
            </p>
          </div>

          {/* Contact Form Card */}
          <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label className="flex items-center text-white font-bold mb-2 uppercase text-sm">
                  <User className="w-4 h-4 mr-2 text-yellow-500" />
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-white font-bold mb-2 uppercase text-sm">
                  <Mail className="w-4 h-4 mr-2 text-yellow-500" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="flex items-center text-white font-bold mb-2 uppercase text-sm">
                  <Phone className="w-4 h-4 mr-2 text-yellow-500" />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="600 00 00 00"
                />
              </div>

              {/* Servicio */}
              <div>
                <label className="flex items-center text-white font-bold mb-2 uppercase text-sm">
                  <Wrench className="w-4 h-4 mr-2 text-yellow-500" />
                  Servicio de Interés *
                </label>
                <select
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((servicio) => (
                    <option key={servicio} value={servicio}>{servicio}</option>
                  ))}
                  <option value="Consulta General">Consulta General</option>
                  <option value="Otro">Otro servicio</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold text-lg py-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Consulta
                  </>
                )}
              </button>

              <p className="text-gray-400 text-sm text-center">
                * Campos obligatorios. Te contactaremos en menos de 24 horas
              </p>
            </form>
          </div>

          {/* Contact Info Below */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <a 
              href={`tel:${mockData.company.phone}`}
              className="bg-gray-800 border-2 border-gray-700 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors"
            >
              <Phone className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-bold">{mockData.company.phoneFormatted}</p>
              <p className="text-gray-400 text-sm mt-1">Llámanos</p>
            </a>

            <a 
              href={`mailto:${mockData.company.email}`}
              className="bg-gray-800 border-2 border-gray-700 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors"
            >
              <Mail className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-bold break-all text-sm">{mockData.company.email}</p>
              <p className="text-gray-400 text-sm mt-1">Escríbenos</p>
            </a>

            <a 
              href={`https://wa.me/${mockData.company.whatsapp}?text=Hola, me gustaría información sobre sus servicios`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 border-2 border-green-500 rounded-lg p-6 text-center hover:bg-green-700 transition-colors"
            >
              <Phone className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white font-bold">WhatsApp</p>
              <p className="text-green-100 text-sm mt-1">Contacto directo</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleContactForm;
