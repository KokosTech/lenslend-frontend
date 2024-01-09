import axios, { AxiosInstance } from 'axios';

// Create a type for the Axios instance with the specified configuration options
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://192.168.1.200:8080',
  // Add other configuration options as needed
}) as AxiosInstance;
