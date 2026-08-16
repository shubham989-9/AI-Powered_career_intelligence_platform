import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// =====================================================
// ATTACH JWT TOKEN TO EVERY REQUEST
// =====================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =====================================================
// HANDLE UNAUTHORIZED REQUESTS
// =====================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Authentication required.");
    }

    return Promise.reject(error);
  }
);

export default api;
export { api };