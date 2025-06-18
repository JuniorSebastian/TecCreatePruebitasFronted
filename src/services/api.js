// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/presentaciones';

export const obtenerPresentaciones = () => axios.get(API_BASE_URL);
export const crearPresentacion = (data) => axios.post(API_BASE_URL, data);
export const eliminarPresentacion = (id) => axios.delete(`${API_BASE_URL}/${id}`);
export const actualizarPresentacion = (id, data) => axios.put(`${API_BASE_URL}/${id}`, data);
