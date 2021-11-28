import { Appointment } from '@/services/AppointmentService';
import { Customer } from '@/services/CustomerService';
import apiClient from '@/axios/axios';
import { AxiosResponse } from 'axios';

export interface Transaction {
  id: number;
  total: number;
  scheduledAt: string;
  isPaid: boolean;
  createdOn?: string;
  modifiedOn?: string;
  customer?: Customer | null;
  appointment?: Appointment | null;
}

class TransactionService {
  getAll(): Promise<AxiosResponse<Transaction[]>> {
    return apiClient.get<Transaction[]>('/transactions');
  }

  get(id: number): Promise<AxiosResponse<Transaction>> {
    return apiClient.get<Transaction>(`/transactions/${id}`);
  }

  create(data: Transaction): Promise<AxiosResponse<Transaction>> {
    return apiClient.post<Transaction>('/transactions', data);
  }

  update(data: Transaction): Promise<AxiosResponse<Transaction>> {
    return apiClient.patch<Transaction>(`/transactions/${data.id}`, data);
  }

  delete(id: number): Promise<void> {
    return apiClient.delete(`/transactions/${id}`);
  }
}

export default new TransactionService();
