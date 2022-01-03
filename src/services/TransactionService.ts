import { Appointment } from '@/services/AppointmentService';
import { Customer } from '@/services/CustomerService';
import { AxiosResponse } from 'axios';
import { Invoice } from './InvoiceService';
import Service, { DataEntity } from './Service';

export interface Transaction extends DataEntity {
  total: number;
  scheduledAt: string;
  isPaid: boolean;
  customerId: number | null;
  customer?: Customer | null;
  appointmentId: number | null;
  appointment?: Appointment | null;
  invoiceId: number | null;
  invoice?: Invoice | null;
}

class TransactionService extends Service<Transaction> {
  fetchSpareTransactions(
    customers: Customer[]
  ): Promise<AxiosResponse<Transaction[]>> {
    return this.apiClient.post<Transaction[]>(`${this.apiEndpoint}/spares`, {
      customers: customers.map((c) => c.id),
    });
  }
}

export default new TransactionService('transactions');
