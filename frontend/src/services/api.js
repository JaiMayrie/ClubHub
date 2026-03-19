import axios from 'axios';

// Base URL for your backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Clubs API calls
export const clubsAPI = {
  getAll: async (params) => {
    const response = await api.get('/clubs', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/clubs/${id}`);
    return response.data;
  },
  
  getMyClubs: async () => {
    const response = await api.get('/clubs/my-clubs');
    return response.data;
  },
  
  create: async (clubData) => {
    const response = await api.post('/clubs', clubData);
    return response.data;
  },
};

export default api;