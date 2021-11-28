import { Transaction } from './TransactionService';
import { Customer } from '@/services/CustomerService';
import Service, { DataEntity } from './Service';

export interface Appointment extends DataEntity {
  scheduledAt: string;
  title: string;
  customers?: Customer[];
  transactions?: Transaction[];
}

class AppointmentService extends Service<Appointment> {}

export default new AppointmentService('appointments');
