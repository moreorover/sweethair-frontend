import { Appointment } from './AppointmentService';
import apiClient from '@/axios/axios';
import { AxiosResponse } from 'axios';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  instagram: string;
  createdOn?: string;
  modifiedOn?: string;
  appointments?: Appointment[];
}

class CustomerService {
  getAll(): Promise<AxiosResponse<Customer[]>> {
    return apiClient.get<Customer[]>('/customers');
  }

  get(id: string): Promise<AxiosResponse<Customer>> {
    return apiClient.get<Customer>(`/customers/${id}`);
  }

  create(data: Customer): Promise<AxiosResponse<Customer>> {
    return apiClient.post<Customer>('/customers', data);
  }

  update(data: Customer): Promise<AxiosResponse<Customer>> {
    return apiClient.patch<Customer>(`/customers/${data.id}`, data);
  }

  delete(id: string): void {
    apiClient.delete(`/customers/${id}`);
  }
}

export default new CustomerService();
