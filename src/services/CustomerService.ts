import { Customer } from './../api/customer';
import apiClient from '@/axios/axios';
import { AxiosResponse } from 'axios';

class CustomerService {
  async getAll(): Promise<AxiosResponse<Customer[]>> {
    const response = await apiClient.get('/customers');
    return response;
  }

  get(id: string): Promise<AxiosResponse<Customer>> {
    return apiClient.get(`/customers/${id}`);
  }

  create(data: Customer): Promise<AxiosResponse<Customer>> {
    return apiClient.post('/customers', data);
  }

  update(data: Customer): Promise<AxiosResponse<Customer>> {
    return apiClient.patch(`/customers/${data.id}`, data);
  }

  delete(id: string): void {
    apiClient.delete(`/customers/${id}`);
  }
}

export default new CustomerService();
