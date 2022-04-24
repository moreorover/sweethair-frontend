import { defineStore } from 'pinia';
import PurchasesService, { Purchase } from '../services/PurchasesService';
import { PurchaseDetail } from './../services/PurchaseDetailsService';

interface PurchaseStore {
  id: number;
  purchase: Purchase | null;
}

export const usePurchase = defineStore('purchase', {
  state: (): PurchaseStore => {
    return {
      id: -1,
      purchase: null,
    };
  },
  getters: {
    getPurchase: (state) => state.purchase,
    getId: (state) => state.id,
  },
  actions: {
    setId(id: number) {
      this.id = id;
    },
    async fetchPurchase() {
      if (this.id > 0) {
        const { data, status } = await PurchasesService.get(this.id);
        if (status < 400) {
          this.purchase = data;
        }
      }
    },
    async createPurchaseDetail(purchaseDetail: PurchaseDetail) {
      if (this.id > 0) {
        const { data, status } = await PurchasesService.createPurchaseDetail(
          this.id,
          purchaseDetail
        );
        if (status < 400) {
          this.purchase?.purchaseDetails?.push(data);
        }
      }
    },
    async update(purchase: Purchase) {
      const { data, status } = await PurchasesService.update(purchase);
      if (status < 400) {
        this.purchase = data;
      }
    },
  },
});
