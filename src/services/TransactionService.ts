import { Appointment } from '@/services/AppointmentService';
import { Customer } from '@/services/CustomerService';
import { Invoice } from './InvoiceService';
import Service, { DataEntity } from './Service';

export interface Transaction extends DataEntity {
  total: number;
  scheduledAt: string;
  isPaid: boolean;
  customer?: Customer | null;
  appointment?: Appointment | null;
  invoice?: Invoice | null;
}

class TransactionService extends Service<Transaction> {}

export default new TransactionService('transactions');
