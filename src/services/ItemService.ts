import { Appointment } from '@/services/AppointmentService';
import { Customer } from '@/services/CustomerService';
import { AxiosResponse } from 'axios';
import { Invoice } from './InvoiceService';
import Service, { DataEntity } from './Service';

export interface Item extends DataEntity {
  title: string;
  total: number;
  invoiceId: number | null;
  invoice?: Invoice;
  customerId: number | null;
  customer?: Customer | null;
  appointmentId: number | null;
  appointment?: Appointment | null;
}

class ItemService extends Service<Item> {
  fetchAvailableItems(): Promise<AxiosResponse<Item[]>> {
    return this.apiClient.get<Item[]>(`${this.apiEndpoint}/available`);
  }
}

export default new ItemService('items');
