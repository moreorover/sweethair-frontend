import { defineStore } from 'pinia';
import ProductsService, { Product } from '../services/ProductsService';

interface ProductStore {
  all: Product[];
  records: Record<string, Product>;
  ids: Set<number>;
}

export const useProducts = defineStore('products', {
  state: (): ProductStore => {
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
      const { data, status } = await ProductsService.getAll();
      if (status < 400) {
        this.all = data;
        data.forEach((c) => {
          this.records[c.id] = c;
          this.ids.add(c.id);
        });
      }
    },
    async create(product: Product): Promise<Product | null> {
      const { data, status } = await ProductsService.create(product);
      if (status < 400) {
        this.all.push(data);
        this.records[data.id] = data;
        return data;
      }
      return null;
    },
    async update(product: Product) {
      const { data, status } = await ProductsService.update(product);
      if (status < 400) {
        this.records[data.id] = data;
        this.all = this.all.filter((a) => a.id !== data.id);
        this.all.push(data);
      }
    },
  },
});
