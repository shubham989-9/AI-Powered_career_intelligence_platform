import axios from "axios";

// Direct Live Render Backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://career-api-4nux.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor to attach Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
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