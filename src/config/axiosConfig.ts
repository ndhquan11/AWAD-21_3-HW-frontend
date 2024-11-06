/// <reference types="vite/client" />
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          useAuthStore.getState().logout();
          window.location.href = '/login';
          break;
        case 403:
          // Xử lý lỗi forbidden
          break;
        case 404:
          // Xử lý lỗi not found
          break;
        default:
          // Xử lý các lỗi khác
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 