import { defineStore } from 'pinia';
import { Supplier } from '@/types';
import SupplierService from '@/services/SupplierService';

interface SuppliersStore {
  all: Record<string, Supplier>;
  ids: number[];
  loaded: boolean;
  loading: boolean;
}

export const useSuppliersStore = defineStore({
  id: 'SuppliersStore',
  state: (): SuppliersStore => ({
    all: {},
    ids: [],
    loaded: false,
    loading: false,
  }),
  getters: {
    getRaw(state): Record<string, Supplier> {
      return state.all;
    },
    getAll(state): Supplier[] {
      return state.ids.map((id: number) => this.all[id]);
    },
    getIds(state): number[] {
      return state.ids;
    },
    isLoaded(state): boolean {
      return state.loaded;
    },
  },
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const { data } = await SupplierService.getAll();
        const ids: number[] = [];
        const all: Record<string, Supplier> = {};

        for (const supplier of data) {
          if (!ids.includes(supplier.id)) {
            ids.push(supplier.id);
          }
          all[supplier.id] = supplier;
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
        console.log('Not loaded, something went wrong loading Suppliers');
        console.log({ error });
      }
    },
    async create(supplier: Supplier): Promise<Supplier | void> {
      try {
        const { data } = await SupplierService.create(supplier);
        this.all[data.id] = data;
        this.ids.push(data.id);
        return data;
      } catch (error) {
        console.log(
          'Failed to create Supplier',
          { Supplier: supplier },
          { error }
        );
      }
    },
    async update(supplier: Supplier): Promise<Supplier | void> {
      try {
        const { data } = await SupplierService.update(supplier);
        this.all[data.id] = data;
        return data;
      } catch (error) {
        console.log(
          'Failed to update Supplier',
          { Supplier: supplier },
          { error }
        );
      }
    },
  },
});
