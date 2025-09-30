import axios from 'axios';

// ✅ Usa variable de entorno para adaptarse a producción o desarrollo
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// ✅ Instancia de Axios con token JWT automático
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// 🔹 PRESENTACIONES
// =======================

/**
 * GET /presentaciones/mias - Lista de presentaciones del usuario
 */
export const obtenerMisPresentaciones = () =>
  axiosInstance.get('/presentaciones/mias');

/**
 * GET /presentaciones/:id - Obtener una presentación por ID
 * @param {String} id
 */
export const obtenerPresentacionPorId = (id) =>
  axiosInstance.get(`/presentaciones/${id}`).then(res => res.data);

/**
 * POST /presentaciones - Crear nueva presentación
 * @param {Object} data
 */
export const crearPresentacion = (data) =>
  axiosInstance.post('/presentaciones', data).then(res => res.data);

/**
 * PUT /presentaciones/:id - Actualizar presentación
 * @param {String} id
 * @param {Object} data
 */
export const actualizarPresentacion = (id, data) =>
  axiosInstance.put(`/presentaciones/${id}`, data);

/**
 * DELETE /presentaciones/:id - Eliminar presentación
 * @param {String} id
 */
export const eliminarPresentacion = (id) =>
  axiosInstance.delete(`/presentaciones/${id}`);

// =======================
// 🔹 ADMIN - Usuarios
// =======================

/**
 * GET /admin/usuarios - Obtener lista de usuarios (solo admin)
 */
export const obtenerUsuariosAdmin = () =>
  axiosInstance.get('/admin/usuarios');

// =======================
// 🔹 LOGIN con Google
// =======================

/**
 * Inicia flujo de autenticación con Google
 */
export const iniciarSesionConGoogle = () => {
  try {
    // 🔍 DEBUG: Verificar variables de entorno
    console.log('🔍 DEBUG process.env.REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
    console.log('🔍 DEBUG API_BASE_URL:', API_BASE_URL);
    
    // ✅ Detecta automáticamente si estás en local o producción
    const currentOrigin = window.location.origin;
    
    // ✅ Asegurar que no haya barras dobles en la URL de redirect
    const redirectUrl = `${currentOrigin}/oauth-success`;
    const cleanRedirectUrl = redirectUrl.replace(/([^:]\/)\/+/g, '$1'); // Eliminar barras dobles
    
    // ✅ Limpiar API_BASE_URL de barras finales
    const cleanApiUrl = API_BASE_URL.replace(/\/+$/, '');
    
    // 🔍 Construir URL paso a paso para debug
    const fullUrl = `${cleanApiUrl}/auth/google?redirect=${encodeURIComponent(cleanRedirectUrl)}`;
    
    console.log('🚀 Iniciando OAuth con redirect:', cleanRedirectUrl);
    console.log('🌐 Backend URL limpia:', cleanApiUrl);
    console.log('🔗 URL completa:', fullUrl);
    
    // ✅ Verificar que no haya doble slash
    if (fullUrl.includes('//auth/') || cleanRedirectUrl.includes('//oauth-success')) {
      console.error('❌ DETECTADO DOBLE SLASH! URL problemática:', fullUrl);
      console.error('❌ Redirect URL:', cleanRedirectUrl);
      alert('Error en configuración de URL. Revisa la consola.');
      return;
    }
    
    // ✅ Envía al backend la URL correcta de callback
    window.location.href = fullUrl;
  } catch (error) {
    console.error('❌ Error iniciando sesión con Google:', error);
    alert('Error al iniciar sesión. Por favor intenta de nuevo.');
  }
};

// =======================
// 🔹 PERFIL
// =======================

/**
 * GET /perfil - Obtener datos del perfil
 */
export const obtenerPerfil = () =>
  axiosInstance.get('/perfil');

// =======================
// 🔹 Cerrar sesión
// =======================

/**
 * Borra el token y redirige al inicio
 */
export const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = '/';
};
