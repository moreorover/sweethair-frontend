import { AxiosInstance, AxiosResponse } from 'axios';
import apiClient from '@/axios/axios';

export interface DataEntity {
  id: number;
  createdOn?: string;
  modifiedOn?: string;
}

export default abstract class Service<T extends DataEntity> {
  apiEndpoint: string;
  apiClient: AxiosInstance = apiClient;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = `/${apiEndpoint}`;
  }
  getAll(): Promise<AxiosResponse<T[]>> {
    return this.apiClient.get<T[]>(this.apiEndpoint);
  }

  get(id: number): Promise<AxiosResponse<T>> {
    return this.apiClient.get<T>(`${this.apiEndpoint}/${id}`);
  }

  create(data: T): Promise<AxiosResponse<T>> {
    const { id, ...d } = data;
    return this.apiClient.post<T>(this.apiEndpoint, d);
  }

  update(data: T): Promise<AxiosResponse<T>> {
    return this.apiClient.patch<T>(`${this.apiEndpoint}/${data.id}`, data);
  }

  delete(id: number): void {
    this.apiClient.delete(`${this.apiEndpoint}/${id}`);
  }
}
