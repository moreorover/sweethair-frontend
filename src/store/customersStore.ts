import { defineStore } from 'pinia';
import CustomersService, { Customer } from '../services/CustomersService';

interface CustomerStore {
  all: Customer[];
  records: Record<string, Customer>;
  ids: Set<number>;
}

export const useCustomers = defineStore('customers', {
  state: (): CustomerStore => {
    return {
      all: [],
      records: {},
      ids: new Set<number>(),
    };
  },
  getters: {
    getAll: (state) => state.all,
    getRecords: (state) => state.records,
    getIds: (state) => state.ids,
  },
  actions: {
    async fetchAll() {
      const { data, status } = await CustomersService.getAll();
      if (status < 400) {
        this.all = data;
        data.forEach((c) => {
          this.records[c.id] = c;
          this.ids.add(c.id);
        });
      }
    },
    async create(customer: Customer) {
      const { data, status } = await CustomersService.create(customer);
      if (status < 400) {
        this.all.push(data);
      }
    },
  },
});
