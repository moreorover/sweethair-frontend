import { Appointment } from './../services/AppointmentService';
import CustomerService, { Customer } from '@/services/CustomerService';
import { defineStore } from 'pinia';
import _ from 'lodash';

interface CustomerStore {
  all: Customer[];
  loaded: boolean;
  isLoading: boolean;
}

export const useCustomersStore = defineStore({
  id: 'customersStore',
  state: (): CustomerStore => ({
    all: [] as Customer[],
    loaded: false,
    isLoading: false,
  }),
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
        const customerIds: (string | undefined)[] | undefined = appointment.customers?.map((customer) => customer.id);
        const transactionIds = appointment.transactions?.map((transactions) => transactions.id);
        const customers: Customer[] = state.all.filter((customer) => customerIds?.includes(customer.id));
        customers.forEach(
          (customer) => (customer.transactions = customer.transactions?.filter((t) => transactionIds?.includes(t.id)))
        );
        return customers;
      }
      return [];
    },
    shouldLoadState: (state) => {
      return !state.isLoading && !state.loaded;
    },
  },
  actions: {
    async fetchAll() {
      this.isLoading = true;
      try {
        const { data } = await CustomerService.getAll();
        this.all = data;
        this.loaded = true;
        this.isLoading = false;
      } catch (error) {
        this.loaded = false;
        this.isLoading = false;
        console.log('Not loaded, something went wrong loading Customers');
        console.log({ error });
      }
    },
    create(customer: Customer) {
      CustomerService.create(customer)
        .then((response) => {
          this.all.push(response.data);
          this.all = _.sortBy(this.all, ['fullName']);
        })
        .catch((err) => console.log('Failed to update Customer', customer, err));
    },
    update(customer: Customer) {
      CustomerService.update(customer)
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
