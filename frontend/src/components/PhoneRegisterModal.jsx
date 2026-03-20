import React, { useState } from 'react';
import { X, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { mockData } from '../data/mock';
import axios from 'axios';

const PhoneRegisterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${BACKEND_URL}/api/registros-llamada`, {
        nombre,
        email
      });
      
      if (response.status === 201) {
        toast.success("¡Registro Completado! Ahora puedes llamarnos directamente.");
        
        // Cerrar modal y hacer la llamada
        onClose();
        window.location.href = `tel:${mockData.company.phone}`;
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      toast.error("Error al registrar. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
      <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg max-w-md w-full p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Phone className="w-8 h-8 text-black" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-black text-center text-white mb-2 uppercase">
          Registro Rápido
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Para llamarnos, necesitamos tu email para poder enviarte información sobre tu consulta
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-bold mb-2 uppercase text-sm">
              Nombre *
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-white font-bold mb-2 uppercase text-sm">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
              placeholder="tu@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-gold py-4"
          >
            {isSubmitting ? (
              <>
                <div className="spinner mr-2"></div>
                Registrando...
              </>
            ) : (
              <>
                <Phone className="w-5 h-5" />
                Registrarme y Llamar
              </>
            )}
          </button>
        </form>

        <p className="text-gray-400 text-xs text-center mt-4">
          Tu email solo se usará para enviarte información sobre tu consulta
        </p>
      </div>
    </div>
  );
};

export default PhoneRegisterModal;
