import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getAvatarUrl = (avatarUrl) => {
  if (!avatarUrl) return null;
  return `${API_URL.replace("/api", "")}${avatarUrl}`;
};

const api = axios.create({
  baseURL: API_URL,
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("clubhub_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("clubhub_token");
      const currentPath = window.location.pathname;
      if (!["/login", "/register", "/"].includes(currentPath)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

// ==========================
// AUTH API
// ==========================
export const authAPI = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.patch("/auth/profile", data);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await api.patch("/auth/password", data);
    return response.data;
  },

  getPublicProfile: async (userId) => {
    const response = await api.get(`/auth/users/${userId}`);
    return response.data;
  },

  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await api.post("/auth/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

// ==========================
// CLUBS API
// ==========================
export const clubsAPI = {
  getAll: async (params = {}) => {
    const response = await api.get("/clubs", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/clubs/${id}`);
    return response.data;
  },

  getMyClubs: async () => {
    const response = await api.get("/clubs/my-clubs");
    return response.data;
  },

  create: async (clubData) => {
    const response = await api.post("/clubs", clubData);
    return response.data;
  },

  update: async (id, clubData) => {
    const response = await api.patch(`/clubs/${id}`, clubData);
    return response.data;
  },
};

// ==========================
// JOIN REQUESTS API
// ==========================
export const joinRequestsAPI = {
  submit: async (clubId, message = "") => {
    const response = await api.post("/join-requests", {
      club_id: clubId,
      message,
    });
    return response.data;
  },

  getForClub: async (clubId) => {
    const response = await api.get(`/clubs/${clubId}/join-requests`);
    return response.data;
  },

  getMy: async () => {
    const response = await api.get("/join-requests/my-requests");
    return response.data;
  },

  updateStatus: async (requestId, status) => {
    const response = await api.patch(`/join-requests/${requestId}`, {
      status,
    });
    return response.data;
  },
};

// ==========================
// MEMBERSHIPS API
// ==========================
export const membershipsAPI = {
  getMy: async () => {
    const response = await api.get("/memberships/my-memberships");
    return response.data;
  },

  leave: async (clubId) => {
    const response = await api.delete(`/memberships/${clubId}`);
    return response.data;
  },
};

// ==========================
// MEMBERS API
// ==========================
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

// ==========================
// EVENTS API (FIXED)
// ==========================
export const eventsAPI = {
  getAll: async () => {
    const response = await api.get("/events/recent"); // ✅ FIXED HERE
    return response.data;
  },

  getRecent: async () => {
    const response = await api.get("/events/recent");
    return response.data;
  },

  getForClub: async (clubId) => {
    const response = await api.get(`/events/club/${clubId}`);
    return response.data;
  },

  create: async (eventData) => {
    const response = await api.post("/events", eventData);
    return response.data;
  },
};

export default api;
