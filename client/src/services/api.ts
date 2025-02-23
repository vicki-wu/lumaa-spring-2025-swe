import axios, { InternalAxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface TaskUpdate {
  title?: string;
  description?: string;
  isComplete?: boolean;
}

export const register = (username: string, password: string) =>
  api.post('/auth/register', { username, password });

export const login = (username: string, password: string) =>
  api.post('/auth/login', { username, password });

export const getTasks = () =>
  api.get('/tasks');

export const createTask = (title: string, description: string) =>
  api.post('/tasks', { title, description });

export const updateTask = (id: number, updates: TaskUpdate) =>
  api.put(`/tasks/${id}`, updates);

export const deleteTask = (id: number) =>
  api.delete(`/tasks/${id}`);
