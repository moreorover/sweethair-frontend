import { Appointment } from '@/services/AppointmentService';
import { Customer } from '@/services/CustomerService';
import { Invoice } from './InvoiceService';
import Service from './Service';

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

class TransactionService extends Service<Transaction> {}

export default new TransactionService('transactions');
