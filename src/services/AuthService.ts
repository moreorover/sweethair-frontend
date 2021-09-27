import apiClient from '@/axios/axios';
import { AxiosResponse } from 'axios';

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdOn?: string;
  modifiedOn?: string;
  role?: Role;
}

class AuthService {
  login(email: string, password: string): Promise<AxiosResponse<User>> {
    return apiClient.post<User>('/auth/login', { email, password });
  }
  me(): Promise<AxiosResponse<User>> {
    return apiClient.get<User>('/auth/me');
  }
  logout(): Promise<AxiosResponse<void>> {
    return apiClient.get<void>('/auth/logout');
  }
}

export default new AuthService();
