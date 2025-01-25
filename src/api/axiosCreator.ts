import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const baseInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('crosscheck-admin');
    if (user) {
      const { token } = JSON.parse(user);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export const useAxiosInterceptors = () => {
  const navigate = useNavigate();

  authInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Redirect to login if unauthorized
        navigate('/sign-in');
      }
      return Promise.reject(error);
    }
  );
};

export { authInstance, baseInstance };
