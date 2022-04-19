import { defineStore } from 'pinia';
import SuppliersService, { Supplier } from '../services/SuppliersService';

interface SupplierStore {
  all: Supplier[];
  records: Record<string, Supplier>;
  ids: Set<number>;
}

export const useSuppliers = defineStore('suppliers', {
  state: (): SupplierStore => {
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
      const { data, status } = await SuppliersService.getAll();
      if (status < 400) {
        this.all = data;
        data.forEach((c) => {
          this.records[c.id] = c;
          this.ids.add(c.id);
        });
      }
    },
    async create(supplier: Supplier) {
      const { data, status } = await SuppliersService.create(supplier);
      if (status < 400) {
        this.all.push(data);
        this.records[data.id] = data;
      }
    },
    async update(supplier: Supplier) {
      const { data, status } = await SuppliersService.update(supplier);
      if (status < 400) {
        this.records[data.id] = data;
        this.all = this.all.filter((a) => a.id !== data.id);
        this.all.push(data);
      }
    },
  },
});
