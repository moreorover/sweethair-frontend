import { Transaction } from './TransactionService';
import { Appointment } from './AppointmentService';
import apiClient from '@/axios/axios';
import { AxiosResponse } from 'axios';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  instagram: string | null;
  createdOn?: string;
  modifiedOn?: string;
  appointments?: Appointment[];
  transactions?: Transaction[];
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
