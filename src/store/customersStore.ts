import { Appointment } from './../services/AppointmentService';
import CustomerService, { Customer } from '@/services/CustomerService';
import { defineStore } from 'pinia';
import _ from 'lodash';

interface CustomerStore {
  all: Customer[];
  loaded: boolean;
  selectedCustomer: Customer | null;
}

export const useCustomersStore = defineStore({
  id: 'customersStore',
  state: (): CustomerStore => ({ all: [] as Customer[], loaded: false, selectedCustomer: null }),
  getters: {
    getAll(state) {
      return state.all;
    },
    getIsLoaded(state) {
      return state.loaded;
    },
    getCustomerById: (state) => (id: string) => {
      if (state.loaded) {
        return state.all.find((c) => c.id === id);
      } else {
        console.log('State is not loaded.');
      }
    },
    getSelectedCustomer(state) {
      return state.selectedCustomer;
    },
    getCustomersByAppointment: (state) => (appointment: Appointment | undefined) => {
      if (appointment) {
        const customerIds: (string | undefined)[] = appointment.customers.map((customer) => customer.id);
        const transactionIds: string[] = appointment.transactions.map((transactions) => transactions.id);
        const customers: Customer[] = state.all.filter((customer) => customerIds.includes(customer.id));
        customers.forEach(
          (customer) => (customer.transactions = customer.transactions?.filter((t) => transactionIds.includes(t.id)))
        );
        return customers;
      }
      return [];
    },
  },
  actions: {
    async fetchAll() {
      await CustomerService.getAll()
        .then((response) => {
          this.all = response.data;
          this.loaded = true;
        })
        .catch(() => {
          this.loaded = false;
          console.log('Not loaded, something went wrong loading Customers');
        });
    },
    async create(customer: Customer) {
      await CustomerService.create(customer)
        .then((response) => {
          this.all.push(response.data);
          this.all = _.sortBy(this.all, ['firstName', 'lastName']);
        })
        .catch((err) => console.log('Failed to update Customer', customer, err));
    },
    async update(customer: Customer) {
      await CustomerService.update(customer)
        .then((response) => {
          const i = this.all.findIndex((c) => c.id === response.data.id);
          if (i > -1) {
            this.all[i] = response.data;
          } else {
            this.all.push(response.data);
          }
        })
        .catch((err) => console.log('Failed to update Customer', customer, err));
    },
    selectCustomer(customer: Customer | null) {
      this.selectedCustomer = customer;
    },
  },
});
