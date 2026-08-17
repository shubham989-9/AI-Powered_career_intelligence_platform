import axios from "axios";

// Clean and sanitize base URL (removes brackets, quotes, and trailing slashes)
const rawUrl =
  import.meta.env.VITE_API_URL || "https://career-api-4nux.onrender.com";

const cleanBaseUrl = String(rawUrl)
  .replace(/[\[\]"']/g, "")
  .trim()
  .replace(/\/+$/, "");

const api = axios.create({
  baseURL: cleanBaseUrl,
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