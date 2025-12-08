import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Instancia Axios con baseURL y JSON
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor para agregar token desde localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helper genérico similar a apiFetch
export async function request(path, { method = 'GET', data, token } = {}) {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const resp = await api.request({ url: path, method, data, headers });
  return resp.data;
}

// Endpoints específicos usados por la app
export const login = (username, password) => api.post('/auth/login', { username, password }).then(r => r.data);
export const register = (payload) => api.post('/auth/register', payload).then(r => r.data);
export const getMe = () => api.get('/auth/me').then(r => r.data);
export const getAllUsers = () => api.get('/users').then(r => r.data);
export const updateMe = (updates) => api.put('/users/me', updates).then(r => r.data);

export default api;
