import axios, { AxiosInstance } from 'axios';
import { API_URL } from '@/configs/api';

// Create a type for the Axios instance with the specified configuration options
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    cookie: typeof window === 'undefined' ? undefined : document.cookie,
  },
  withCredentials: true,
});
