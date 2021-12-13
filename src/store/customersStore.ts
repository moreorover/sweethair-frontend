import { Appointment } from './../services/AppointmentService';
import CustomerService, { Customer } from '@/services/CustomerService';
import { defineStore } from 'pinia';

interface CustomerStore {
  all: Record<string, Customer>;
  ids: number[];
  loaded: boolean;
  loading: boolean;
}

export const useCustomersStore = defineStore({
  id: 'customersStore',
  state: (): CustomerStore => ({
    all: {},
    ids: [],
    loaded: false,
    loading: false,
  }),
  getters: {
    getRaw(state): Record<string, Customer> {
      return state.all;
    },
    getAll(state): Customer[] {
      return state.ids.map((id: number) => this.all[id]);
    },
    getIds(state): number[] {
      return state.ids;
    },
    getCustomerById:
      (state) =>
      (id: number): Customer => {
        return state.all[id];
      },
    getCustomersByAppointment:
      (state) =>
      (appointment: Appointment): Customer[] => {
        const customerIds: number[] = appointment.customers
          ? appointment.customers?.map((customer) => customer.id)
          : [];
        const transactionIds: number[] = appointment.transactions
          ? appointment.transactions?.map((transactions) => transactions.id)
          : [];
        const customers: Customer[] = state.ids
          .map((id: number) => state.all[id])
          .filter((customer: Customer) => customerIds.includes(customer.id))
          .map((customer: Customer) => {
            customer.transactions = customer.transactions?.filter((t) =>
              transactionIds.includes(t.id)
            );
            return customer;
          });
        return customers;
      },
    shouldLoadState: (state): boolean => !state.loading && !state.loaded,
  },
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const { data } = await CustomerService.getAll();
        const ids: number[] = [];
        const all: Record<string, Customer> = {};

        for (const customer of data) {
          if (!ids.includes(customer.id)) {
            ids.push(customer.id);
          }
          all[customer.id] = customer;
        }
        this.all = all;
        this.ids = ids;
        this.loaded = true;
        this.loading = false;
      } catch (error) {
        this.all = {};
        this.ids = [];
        this.loaded = false;
        this.loading = false;
        console.log('Not loaded, something went wrong loading Customers');
        console.log({ error });
      }
    },
    async create(customer: Customer) {
      try {
        const { data } = await CustomerService.create(customer);
        this.all[data.id] = data;
        this.ids.push(data.id);
      } catch (error) {
        console.log('Failed to create Customer', customer, error);
      }
    },
    async update(customer: Customer) {
      try {
        const { data } = await CustomerService.update(customer);
        this.all[data.id] = data;
      } catch (error) {
        console.log('Failed to update Customer', customer, error);
      }
    },
  },
});
