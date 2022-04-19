import { AxiosInstance, AxiosResponse } from 'axios';
import http from '../utils/useAxios';

export interface BaseDataEntity {
  id: number;
  createdOn?: string;
  modifiedOn?: string;
}

export abstract class BaseService<T extends BaseDataEntity> {
  apiEndpoint: string;
  apiClient: AxiosInstance = http;

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
