import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add token to all requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('clubhub_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// AUTH API
// ============================================
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

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.patch('/auth/profile', data);
    return response.data;
  },
  
  changePassword: async (data) => {
    const response = await api.patch('/auth/password', data);
    return response.data;
  },
};

// ============================================
// CLUBS API
// ============================================
export const clubsAPI = {
  // Get all clubs with optional search/filter
  getAll: async (params = {}) => {
    const response = await api.get('/clubs', { params });
    return response.data;
  },

  // Get single club by ID
  getById: async (id) => {
    const response = await api.get(`/clubs/${id}`);
    return response.data;
  },

  // Get clubs managed by current user (admin)
  getMyClubs: async () => {
    const response = await api.get('/clubs/my-clubs');
    return response.data;
  },

  // Create new club (admin only)
  create: async (clubData) => {
    const response = await api.post('/clubs', clubData);
    return response.data;
  },

  // Update club (admin only)
  update: async (id, clubData) => {
    const response = await api.patch(`/clubs/${id}`, clubData);
    return response.data;
  },
};

// ============================================
// JOIN REQUESTS API
// ============================================
export const joinRequestsAPI = {
  // Submit a join request to a club
  submit: async (clubId, message = '') => {
    const response = await api.post('/join-requests', {
      club_id: clubId,
      message,
    });
    return response.data;
  },

  // Get join requests for a specific club (admin only)
  getForClub: async (clubId) => {
    const response = await api.get(`/clubs/${clubId}/join-requests`);
    return response.data;
  },

  // Get current user's join requests
  getMy: async () => {
    const response = await api.get('/join-requests/my-requests');
    return response.data;
  },

  // Approve or reject a join request (admin only)
  updateStatus: async (requestId, status) => {
    const response = await api.patch(`/join-requests/${requestId}`, {
      status,
    });
    return response.data;
  },
};

// ============================================
// MEMBERSHIPS API
// ============================================
export const membershipsAPI = {
  // Get current user's memberships
  getMy: async () => {
    const response = await api.get('/memberships/my-memberships');
    return response.data;
  },

  // Leave a club
  leave: async (clubId) => {
    const response = await api.delete(`/memberships/${clubId}`);
    return response.data;
  },
};

export const membersAPI = {
  getClubMembers: async (clubId) => {
    const response = await api.get(`/clubs/${clubId}/members`);
    return response.data;
  },
  removeMember: async (clubId, userId) => {
    const response = await api.delete(`/clubs/${clubId}/members/${userId}`);
    return response.data;
  },
};

export default api;
