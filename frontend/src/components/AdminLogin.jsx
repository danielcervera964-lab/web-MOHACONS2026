import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    usuario: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${BACKEND_URL}/api/admin/login`, credentials);
      
      if (response.data.access_token) {
        localStorage.setItem('admin_token', response.data.access_token);
        toast.success("¡Bienvenido al Panel de Administración!");
        onLogin(response.data.access_token);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast.error("Usuario o contraseña incorrectos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-yellow-500 mb-2 uppercase">MOHACONS</h1>
          <p className="text-gray-400">Panel de Administración</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-8">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-8 h-8 text-black" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-bold mb-2 uppercase text-sm">
                Usuario
              </label>
              <input
                type="text"
                value={credentials.usuario}
                onChange={(e) => setCredentials({ ...credentials, usuario: e.target.value })}
                required
                className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                placeholder="Ingresa tu usuario"
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2 uppercase text-sm">
                Contraseña
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-gold py-4 text-lg"
            >
              {isLoading ? (
                <>
                  <div className="spinner mr-2"></div>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Sistema protegido - Solo personal autorizado
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
