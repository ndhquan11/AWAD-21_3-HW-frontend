/// <reference types="vite/client" />
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage nếu có
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Xử lý các lỗi response (status code không phải 2xx)
      switch (error.response.status) {
        case 401:
          // Xử lý lỗi unauthorized
          localStorage.removeItem('token');
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