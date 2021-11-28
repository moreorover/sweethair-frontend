import { Transaction } from './TransactionService';
import { Appointment } from './AppointmentService';
import Service from './Service';
import { Item } from './ItemService';

export interface Customer {
  id: number;
  fullName: string;
  location: string;
  about: string;
  email: string | null;
  instagram: string | null;
  createdOn?: string;
  modifiedOn?: string;
  appointments?: Appointment[];
  transactions?: Transaction[];
  items?: Item[];
}

class CustomerService extends Service<Customer> {}

export default new CustomerService('customers');
