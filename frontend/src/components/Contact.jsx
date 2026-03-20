import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { mockData } from '../data/mock';
import { toast } from 'sonner';
import axios from 'axios';

const Contact = ({ onOpenPhoneRegister }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoServicio: '',
    direccion: '',
    descripcion: '',
    presupuesto: '',
    urgencia: 'normal'
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
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${BACKEND_URL}/api/presupuestos`, formData);
      
      if (response.status === 201) {
        toast.success("¡Solicitud Enviada! Nos pondremos en contacto contigo muy pronto.");
        
        // Resetear formulario
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          tipoServicio: '',
          direccion: '',
          descripcion: '',
          presupuesto: '',
          urgencia: 'normal'
        });
      }
    } catch (error) {
      console.error('Error al enviar presupuesto:', error);
      toast.error("Error al enviar la solicitud. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hola, me gustaría solicitar información sobre sus servicios de construcción.');
    window.open(`https://wa.me/${mockData.company.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section id="contacto" className="section bg-gradient-to-b from-gray-900 to-black">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">Solicita tu Presupuesto</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            Cuéntanos tu proyecto y te enviaremos un presupuesto detallado sin compromiso
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Phone Card */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-6 text-black">
              <Phone className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-black mb-2 uppercase">Llámanos</h3>
              <p className="mb-4">Atención personalizada</p>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPhoneRegister();
                }}
                className="text-3xl font-black hover:underline block"
              >
                {mockData.company.phoneFormatted}
              </a>
              <p className="text-sm mt-2 opacity-80">
                * Se requiere registro para llamar
              </p>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-gray-800 border-2 border-green-500 rounded-lg p-6 card-hover">
              <MessageSquare className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-black mb-2 uppercase text-white">WhatsApp</h3>
              <p className="text-gray-300 mb-4">Contacto directo e inmediato</p>
              <button 
                onClick={handleWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Abrir WhatsApp
              </button>
            </div>

            {/* Email Card */}
            <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-6">
              <Mail className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-black mb-2 uppercase text-white">Email</h3>
              <a 
                href={`mailto:${mockData.company.email}`}
                className="text-yellow-500 hover:text-yellow-400 transition-colors break-all"
              >
                {mockData.company.email}
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-gray-800 border-2 border-gray-700 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-bold mb-2 uppercase text-sm">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-white font-bold mb-2 uppercase text-sm">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Service Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-bold mb-2 uppercase text-sm">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    placeholder="600 00 00 00"
                  />
                </div>
                <div>
                  <label className="block text-white font-bold mb-2 uppercase text-sm">
                    Tipo de Servicio *
                  </label>
                  <select
                    name="tipoServicio"
                    value={formData.tipoServicio}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  >
                    <option value="">Selecciona un servicio</option>
                    {servicios.map((servicio) => (
                      <option key={servicio} value={servicio}>{servicio}</option>
                    ))}
                    <option value="Otro">Otro servicio</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Address */}
              <div>
                <label className="block text-white font-bold mb-2 uppercase text-sm">
                  Dirección del Proyecto *
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="Calle, número, ciudad"
                />
              </div>

              {/* Row 4: Description */}
              <div>
                <label className="block text-white font-bold mb-2 uppercase text-sm">
                  Descripción del Proyecto *
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors resize-none"
                  placeholder="Cuéntanos con detalle qué necesitas..."
                ></textarea>
              </div>

              {/* Row 5: Budget and Urgency */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-bold mb-2 uppercase text-sm">
                    Presupuesto Aproximado
                  </label>
                  <select
                    name="presupuesto"
                    value={formData.presupuesto}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  >
                    <option value="">Selecciona un rango</option>
                    <option value="menos-1000">Menos de 1.000€</option>
                    <option value="1000-3000">1.000€ - 3.000€</option>
                    <option value="3000-5000">3.000€ - 5.000€</option>
                    <option value="5000-10000">5.000€ - 10.000€</option>
                    <option value="mas-10000">Más de 10.000€</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-bold mb-2 uppercase text-sm">
                    Urgencia *
                  </label>
                  <select
                    name="urgencia"
                    value={formData.urgencia}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  >
                    <option value="baja">Baja - Puedo esperar</option>
                    <option value="normal">Normal - Próximos días</option>
                    <option value="alta">Alta - Lo antes posible</option>
                    <option value="urgente">Urgente - Inmediato</option>
                  </select>
                </div>
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
                    Enviar Solicitud de Presupuesto
                  </>
                )}
              </button>

              <p className="text-gray-400 text-sm text-center">
                * Campos obligatorios. Nos comprometemos a responder en menos de 24 horas
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
