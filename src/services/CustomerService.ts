import { Transaction } from './TransactionService';
import { Appointment } from './AppointmentService';
import Service, { DataEntity } from './Service';
import { Item } from './ItemService';

export interface Customer extends DataEntity {
  fullName: string;
  location: string;
  about: string;
  email: string | null;
  instagram: string | null;
  appointments?: Appointment[];
  transactions?: Transaction[];
  items?: Item[];
}

class CustomerService extends Service<Customer> {}

export default new CustomerService('customers');
