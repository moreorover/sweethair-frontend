import { defineStore } from 'pinia';
import PurchasesService, { Purchase } from '../services/PurchasesService';

interface PurchaseStore {
  all: Purchase[];
  records: Record<string, Purchase>;
  ids: Set<number>;
}

export const usePurchases = defineStore('purchases', {
  state: (): PurchaseStore => {
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
      const { data, status } = await PurchasesService.getAll();
      if (status < 400) {
        this.all = data;
        data.forEach((c) => {
          this.records[c.id] = c;
          this.ids.add(c.id);
        });
      }
    },
    async create(purchase: Purchase) {
      const { data, status } = await PurchasesService.create(purchase);
      if (status < 400) {
        this.all.push(data);
        this.records[data.id] = data;
      }
    },
    async update(purchase: Purchase) {
      const { data, status } = await PurchasesService.update(purchase);
      if (status < 400) {
        this.records[data.id] = data;
        this.all = this.all.filter((a) => a.id !== data.id);
        this.all.push(data);
      }
    },
  },
});
