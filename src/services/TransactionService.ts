import { Appointment } from '@/services/AppointmentService';
import { Customer } from '@/services/CustomerService';
import apiClient from '@/axios/axios';
import { AxiosResponse } from 'axios';

export interface Transaction {
  id: string;
  total: number;
  date: string;
  isPaid: boolean;
  createdOn?: string;
  modifiedOn?: string;
  customer: Customer | null;
  appointment: Appointment | null;
}

class TransactionService {
  getAll(): Promise<AxiosResponse<Transaction[]>> {
    return apiClient.get<Transaction[]>('/transactions');
  }

  get(id: string): Promise<AxiosResponse<Transaction>> {
    return apiClient.get<Transaction>(`/transactions/${id}`);
  }

  create(data: Transaction): Promise<AxiosResponse<Transaction>> {
    return apiClient.post<Transaction>('/transactions', data);
  }

  update(data: Transaction): Promise<AxiosResponse<Transaction>> {
    return apiClient.patch<Transaction>(`/transactions/${data.id}`, data);
  }

  delete(id: string): Promise<void> {
    return apiClient.delete(`/transactions/${id}`);
  }
}

export default new TransactionService();
