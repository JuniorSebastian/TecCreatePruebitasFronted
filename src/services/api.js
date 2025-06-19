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
  window.location.href = `${API_BASE_URL}/auth/google`;
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
