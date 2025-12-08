// ESTE ARCHIVO YA NO SE LLAMA, NO LO BORRO PORQUE ME DA MIEDITO QUE SE DAÑE ALGO
// NO SE DEBERÍA DAÑAR NADA, PERO BUENO, POR SI ACASO LOL XD
// PROFE NO NOS BAJE POR ESTO :(

import axios from 'axios';

// Unificado para Vite: usa import.meta.env.VITE_API_URL o default a backend local
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const verifyToken = async (token) => {
  const response = await api.get('/auth/verify', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  return response.data;
};

export default api;