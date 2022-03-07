import { defineStore } from 'pinia';
import { Purchase } from '@/types';
import PurchaseService from '@/services/PurchaseService';

interface PurchasesStore {
  all: Record<string, Purchase>;
  ids: number[];
  loaded: boolean;
  loading: boolean;
}

export const usePurchasesStore = defineStore({
  id: 'PurchasesStore',
  state: (): PurchasesStore => ({
    all: {},
    ids: [],
    loaded: false,
    loading: false,
  }),
  getters: {
    getRaw(state): Record<string, Purchase> {
      return state.all;
    },
    getAll(state): Purchase[] {
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
        const { data } = await PurchaseService.getAll();
        const ids: number[] = [];
        const all: Record<string, Purchase> = {};

        for (const Purchase of data) {
          if (!ids.includes(Purchase.id)) {
            ids.push(Purchase.id);
          }
          all[Purchase.id] = Purchase;
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
        console.log('Not loaded, something went wrong loading Purchases');
        console.log({ error });
      }
    },
    async create(Purchase: Purchase): Promise<Purchase | void> {
      try {
        const { data } = await PurchaseService.create(Purchase);
        this.all[data.id] = data;
        this.ids.push(data.id);
        return data;
      } catch (error) {
        console.log('Failed to create Purchase', { Purchase }, { error });
      }
    },
    async update(Purchase: Purchase): Promise<Purchase | void> {
      try {
        const { data } = await PurchaseService.update(Purchase);
        this.all[data.id] = data;
        return data;
      } catch (error) {
        console.log('Failed to update Purchase', { Purchase }, { error });
      }
    },
  },
});
