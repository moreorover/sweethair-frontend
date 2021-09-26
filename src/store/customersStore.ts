import { Customer } from '@/services/CustomerService';
import CustomerService from '@/services/CustomerService';
import { defineStore } from 'pinia';

interface CustomerStore {
  all: Customer[];
  loaded: boolean;
}

export const useCustomersStore = defineStore({
  id: 'customersStore',
  state: (): CustomerStore => ({ all: [] as Customer[], loaded: false }),
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
        .then((response) => this.all.push(response.data))
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
  },
});
