import { Appointment } from '@/services/AppointmentService';
import { Customer } from '@/services/CustomerService';
import { Invoice } from './InvoiceService';
import Service, { DataEntity } from './Service';

export interface Item extends DataEntity {
  title: string;
  total: number;
  invoiceId?: number;
  invoice?: Invoice;
  customerId?: number;
  customer?: Customer | null;
  appointmentId?: number;
  appointment?: Appointment | null;
}

class ItemService extends Service<Item> {}

export default new ItemService('items');
