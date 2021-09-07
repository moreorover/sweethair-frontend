import apiClient from '@/axios/axios';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdOn: string;
  modifiedOn: string;
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return data;
}

export async function me(): Promise<User> {
  const { data } = await apiClient.get('/auth/me');
  return data;
}
