import axios, { AxiosInstance } from 'axios';
import { API_URL } from '@/configs/api';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});
