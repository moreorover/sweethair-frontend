import { Customer } from '@/services/CustomerService';
import apiClient from '@/axios/axios';
import { AxiosResponse } from 'axios';

export interface Appointment {
  id: string;
  start: string;
  createdOn?: string;
  modifiedOn?: string;
  customers: Customer[];
}

class AppointmentService {
  getAll(): Promise<AxiosResponse<Appointment[]>> {
    return apiClient.get<Appointment[]>('/appointments');
  }

  get(id: string): Promise<AxiosResponse<Appointment>> {
    return apiClient.get<Appointment>(`/appointments/${id}`);
  }

  create(data: Appointment): Promise<AxiosResponse<Appointment>> {
    return apiClient.post<Appointment>('/appointments', data);
  }

  update(data: Appointment): Promise<AxiosResponse<Appointment>> {
    return apiClient.patch<Appointment>(`/appointments/${data.id}`, data);
  }

  delete(id: string): void {
    apiClient.delete(`/appointments/${id}`);
  }
}

export default new AppointmentService();
