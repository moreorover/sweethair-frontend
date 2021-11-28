import { AxiosResponse } from 'axios';
import apiClient from '@/axios/axios';

export default abstract class Service<T> {
  apiEndpoint: string;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }
  getAll(): Promise<AxiosResponse<T[]>> {
    return apiClient.get<T[]>(`/${this.apiEndpoint}`);
  }

  get(id: number): Promise<AxiosResponse<T>> {
    return apiClient.get<T>(`/${this.apiEndpoint}/${id}`);
  }

  create(data: T): Promise<AxiosResponse<T>> {
    return apiClient.post<T>(`/${this.apiEndpoint}`, data);
  }

  update(data: T): Promise<AxiosResponse<T>> {
    return apiClient.patch<T>(`/${this.apiEndpoint}/${data.id}`, data);
  }

  delete(id: number): void {
    apiClient.delete(`/${this.apiEndpoint}/${id}`);
  }
}
