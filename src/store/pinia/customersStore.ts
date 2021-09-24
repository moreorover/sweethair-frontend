import { Customer } from '@/services/CustomerService';
import CustomerService from '@/services/CustomerService';
import { defineStore } from 'pinia';

interface CustomerStore {
  customers: Customer[];
  loaded: boolean;
}

export const useCustomersStore = defineStore({
  id: 'customersStore',
  state: (): CustomerStore => ({ customers: [] as Customer[], loaded: false }),
  getters: {
    getCustomers(state) {
      return state.customers;
    },
    getIsLoaded(state) {
      return state.loaded;
    },
    getCustomerById: (state) => (id: string) => {
      if (state.loaded) {
        return state.customers.find((c) => c.id === id);
      } else {
        console.log('State is not loaded.');
      }
    },
  },
  actions: {
    async fetchCustomers() {
      await CustomerService.getAll()
        .then((response) => {
          this.customers = response.data;
          this.loaded = true;
        })
        .catch(() => {
          this.loaded = false;
          console.log('Not loaded, something went wrong loading Customers');
        });
    },
    async createCustomer(customer: Customer) {
      await CustomerService.create(customer)
        .then((response) => this.customers.push(response.data))
        .catch((err) => console.log('Failed to update Customer', customer, err));
    },
    async updateCustomer(customer: Customer) {
      await CustomerService.update(customer)
        .then((response) => {
          const i = this.customers.findIndex((c) => c.id === response.data.id);
          if (i > -1) {
            this.customers[i] = response.data;
          } else {
            this.customers.push(response.data);
          }
        })
        .catch((err) => console.log('Failed to update Customer', customer, err));
    },
  },
});
