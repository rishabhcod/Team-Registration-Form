import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Team API calls
export const teamAPI = {
  // Register a new team
  registerTeam: async (teamData) => {
    const response = await api.post('/teams/register', teamData);
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    const response = await api.post('/teams/verify', { email, otp });
    return response.data;
  },

  // Get team status by team number
  getTeamStatus: async (teamNumber) => {
    const response = await api.get(`/teams/status/${teamNumber}`);
    return response.data;
  },
};

// Admin API calls
export const adminAPI = {
  // Admin login
  login: async (username, password) => {
    const response = await api.post('/admin/login', { username, password });
    return response.data;
  },

  // Get all teams (requires auth)
  getAllTeams: async () => {
    const response = await api.get('/admin/teams');
    return response.data;
  },

  // Mark team as qualified (requires auth)
  markQualified: async (teamId) => {
    const response = await api.put(`/admin/qualify/${teamId}`);
    return response.data;
  },

  // Export teams as CSV (requires auth)
  exportCSV: async () => {
    const response = await api.get('/admin/export/csv', {
      responseType: 'blob',
    });
    return response.data;
  },

  // Send certificate to team (requires auth)
  sendCertificate: async (teamId) => {
    const response = await api.post(`/admin/certificate/${teamId}`);
    return response.data;
  },
};

export default api;
