import { Transaction } from './TransactionService';
import { Appointment } from './AppointmentService';
import Service, { DataEntity } from './Service';
import { Item } from './ItemService';
import { AxiosResponse } from 'axios';

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

class CustomerService extends Service<Customer> {
  fetchCustomersBase(): Promise<AxiosResponse<Partial<Customer>[]>> {
    return this.apiClient.get<Partial<Customer>[]>(`${this.apiEndpoint}/base`);
  }
}

export default new CustomerService('customers');
