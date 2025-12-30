import axios from "axios";

// Base API URL (same one you already use)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request Interceptor (attach token automatically)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ❗ Response Interceptor (centralized error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract backend error message if exists
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    return Promise.reject(new Error(message));
  }
);

export default api;
