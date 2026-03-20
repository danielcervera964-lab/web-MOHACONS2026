import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Phone, 
  LogOut, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const AdminDashboard = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [presupuestos, setPresupuestos] = useState([]);
  const [registrosLlamada, setRegistrosLlamada] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPresupuesto, setSelectedPresupuesto] = useState(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'dashboard') {
        const [statsRes, presRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/admin/estadisticas`, axiosConfig),
          axios.get(`${BACKEND_URL}/api/admin/presupuestos?limit=5`, axiosConfig)
        ]);
        setEstadisticas(statsRes.data);
        setPresupuestos(presRes.data);
      } else if (activeTab === 'presupuestos') {
        const res = await axios.get(`${BACKEND_URL}/api/admin/presupuestos`, axiosConfig);
        setPresupuestos(res.data);
      } else if (activeTab === 'llamadas') {
        const res = await axios.get(`${BACKEND_URL}/api/admin/registros-llamada`, axiosConfig);
        setRegistrosLlamada(res.data);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      if (error.response?.status === 401) {
        toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.");
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const marcarComoLeido = async (id) => {
    try {
      await axios.patch(
        `${BACKEND_URL}/api/admin/presupuestos/${id}`,
        { leido: true },
        axiosConfig
      );
      toast.success("Presupuesto marcado como leído");
      fetchData();
    } catch (error) {
      toast.error("Error al actualizar presupuesto");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUrgenciaColor = (urgencia) => {
    const colors = {
      'urgente': 'bg-red-500',
      'alta': 'bg-orange-500',
      'normal': 'bg-yellow-500',
      'baja': 'bg-green-500'
    };
    return colors[urgencia] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b-4 border-yellow-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-black text-yellow-500 uppercase">MOHACONS</h1>
              <span className="text-gray-400">Panel de Administración</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-white hover:text-yellow-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-4 border-2 border-gray-800">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-yellow-500 text-black'
                      : 'text-white hover:bg-gray-800'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="font-bold">Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('presupuestos')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'presupuestos'
                      ? 'bg-yellow-500 text-black'
                      : 'text-white hover:bg-gray-800'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-bold">Presupuestos</span>
                </button>
                <button
                  onClick={() => setActiveTab('llamadas')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'llamadas'
                      ? 'bg-yellow-500 text-black'
                      : 'text-white hover:bg-gray-800'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-bold">Llamadas</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && estadisticas && (
                  <div className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm uppercase">Total Presupuestos</p>
                            <p className="text-3xl font-black text-yellow-500 mt-2">
                              {estadisticas.total_presupuestos}
                            </p>
                          </div>
                          <FileText className="w-12 h-12 text-yellow-500 opacity-50" />
                        </div>
                      </div>

                      <div className="bg-gray-900 border-2 border-red-500 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm uppercase">Sin Leer</p>
                            <p className="text-3xl font-black text-red-500 mt-2">
                              {estadisticas.presupuestos_no_leidos}
                            </p>
                          </div>
                          <AlertCircle className="w-12 h-12 text-red-500 opacity-50" />
                        </div>
                      </div>

                      <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm uppercase">Llamadas</p>
                            <p className="text-3xl font-black text-green-500 mt-2">
                              {estadisticas.total_registros_llamada}
                            </p>
                          </div>
                          <Phone className="w-12 h-12 text-green-500 opacity-50" />
                        </div>
                      </div>

                      <div className="bg-gray-900 border-2 border-blue-500 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm uppercase">Tasa Conversión</p>
                            <p className="text-3xl font-black text-blue-500 mt-2">
                              {estadisticas.total_presupuestos > 0 
                                ? Math.round((estadisticas.total_presupuestos / (estadisticas.total_presupuestos + estadisticas.total_registros_llamada)) * 100)
                                : 0}%
                            </p>
                          </div>
                          <TrendingUp className="w-12 h-12 text-blue-500 opacity-50" />
                        </div>
                      </div>
                    </div>

                    {/* Recent Presupuestos */}
                    <div className="bg-gray-900 rounded-lg p-6 border-2 border-gray-800">
                      <h2 className="text-xl font-black text-white mb-4 uppercase">Últimos Presupuestos</h2>
                      <div className="space-y-3">
                        {presupuestos.slice(0, 5).map((p) => (
                          <div
                            key={p.id}
                            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition-colors cursor-pointer"
                            onClick={() => setSelectedPresupuesto(p)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <h3 className="font-bold text-white">{p.nombre}</h3>
                                  {!p.leido && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                      NUEVO
                                    </span>
                                  )}
                                  <span className={`${getUrgenciaColor(p.urgencia)} text-black text-xs px-2 py-1 rounded-full uppercase`}>
                                    {p.urgencia}
                                  </span>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">{p.tipoServicio}</p>
                                <p className="text-gray-500 text-xs mt-1">{formatDate(p.fecha)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Presupuestos Tab */}
                {activeTab === 'presupuestos' && (
                  <div className="bg-gray-900 rounded-lg p-6 border-2 border-gray-800">
                    <h2 className="text-xl font-black text-white mb-6 uppercase">Todos los Presupuestos</h2>
                    <div className="space-y-4">
                      {presupuestos.map((p) => (
                        <div
                          key={p.id}
                          className="bg-gray-800 p-6 rounded-lg border-2 border-gray-700 hover:border-yellow-500 transition-colors"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="flex items-center space-x-2 mb-3">
                                <h3 className="font-black text-yellow-500 text-lg">{p.nombre}</h3>
                                {!p.leido && (
                                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    NUEVO
                                  </span>
                                )}
                              </div>
                              <div className="space-y-2 text-sm">
                                <p className="text-gray-400"><span className="text-white font-bold">Email:</span> {p.email}</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Teléfono:</span> {p.telefono}</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Servicio:</span> {p.tipoServicio}</p>
                                <p className="text-gray-400"><span className="text-white font-bold">Dirección:</span> {p.direccion}</p>
                              </div>
                            </div>
                            <div>
                              <div className="space-y-2 text-sm mb-3">
                                <div className="flex items-center space-x-2">
                                  <span className="text-white font-bold">Urgencia:</span>
                                  <span className={`${getUrgenciaColor(p.urgencia)} text-black text-xs px-3 py-1 rounded-full uppercase font-bold`}>
                                    {p.urgencia}
                                  </span>
                                </div>
                                {p.presupuesto && (
                                  <p className="text-gray-400"><span className="text-white font-bold">Presupuesto:</span> {p.presupuesto}</p>
                                )}
                                <p className="text-gray-400"><span className="text-white font-bold">Fecha:</span> {formatDate(p.fecha)}</p>
                              </div>
                              <div className="bg-gray-900 p-3 rounded">
                                <p className="text-white font-bold text-xs mb-1 uppercase">Descripción:</p>
                                <p className="text-gray-400 text-sm">{p.descripcion}</p>
                              </div>
                            </div>
                          </div>
                          {!p.leido && (
                            <div className="mt-4 pt-4 border-t border-gray-700">
                              <button
                                onClick={() => marcarComoLeido(p.id)}
                                className="btn-gold text-sm px-4 py-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Marcar como Leído
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Llamadas Tab */}
                {activeTab === 'llamadas' && (
                  <div className="bg-gray-900 rounded-lg p-6 border-2 border-gray-800">
                    <h2 className="text-xl font-black text-white mb-6 uppercase">Registros de Llamadas</h2>
                    <div className="space-y-3">
                      {registrosLlamada.map((r) => (
                        <div key={r.id} className="bg-gray-800 p-4 rounded-lg border-2 border-gray-700">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-white">{r.nombre}</h3>
                              <p className="text-gray-400 text-sm">{r.email}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-500 text-xs">{formatDate(r.fecha)}</p>
                              <span className="inline-block mt-1 bg-green-500 text-black text-xs px-3 py-1 rounded-full uppercase font-bold">
                                <Phone className="w-3 h-3 inline mr-1" />
                                Registrado
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
