import { Item } from './ItemService';
import { Transaction } from './TransactionService';
import { Customer } from '@/services/CustomerService';
import Service, { DataEntity } from './Service';
import { AxiosResponse } from 'axios';

export interface Appointment extends DataEntity {
  scheduledAt: string;
  title: string;
  customers: Array<Customer>;
  transactions: Array<Transaction>;
  items: Array<Item>;
}

class AppointmentService extends Service<Appointment> {
  fetchCustomers(appointmentId: number): Promise<AxiosResponse<Customer[]>> {
    return this.apiClient.get<Customer[]>(
      `${this.apiEndpoint}/${appointmentId}/customers`
    );
  }

  fetchTransactions(
    appointmentId: number
  ): Promise<AxiosResponse<Transaction[]>> {
    return this.apiClient.get<Transaction[]>(
      `${this.apiEndpoint}/${appointmentId}/transactions`
    );
  }

  fetchItems(appointmentId: number): Promise<AxiosResponse<Item[]>> {
    return this.apiClient.get<Item[]>(
      `${this.apiEndpoint}/${appointmentId}/items`
    );
  }

  addCustomers(
    appointmentId: number,
    customers: Customer[]
  ): Promise<AxiosResponse<Customer[]>> {
    return this.apiClient.post<Customer[]>(
      `${this.apiEndpoint}/${appointmentId}/customers`,
      { customers }
    );
  }
  removeCustomer(
    appointmentId: number,
    customer: Customer
  ): Promise<AxiosResponse<Customer[]>> {
    return this.apiClient.delete<Customer[]>(
      `${this.apiEndpoint}/${appointmentId}/customers/${customer.id}`
    );
  }
  addTransaction(
    appointmentId: number,
    customerId: number,
    transaction: Transaction
  ): Promise<AxiosResponse<Transaction>> {
    return this.apiClient.post<Transaction>(
      `${this.apiEndpoint}/${appointmentId}/transactions`,
      {
        transaction,
        appointmentId,
        customerId,
      }
    );
  }
}

export default new AppointmentService('appointments');
