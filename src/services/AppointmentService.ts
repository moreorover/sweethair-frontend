import { Transaction } from './TransactionService';
import { Customer } from '@/services/CustomerService';
import Service from './Service';

export interface Appointment {
  id: number;
  scheduledAt: string;
  title: string;
  createdOn?: string;
  modifiedOn?: string;
  customers?: Customer[];
  transactions?: Transaction[];
}

class AppointmentService extends Service<Appointment> {}

export default new AppointmentService('appointments');
