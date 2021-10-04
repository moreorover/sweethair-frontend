import TransactionService, { Transaction } from './../services/TransactionService';
import { defineStore } from 'pinia';

interface TransactionStore {
  all: Transaction[];
  loaded: boolean;
}

export const useTransactionsStore = defineStore({
  id: 'transactionsStore',
  state: (): TransactionStore => ({
    all: [] as Transaction[],
    loaded: false,
  }),
  getters: {
    getAll(state) {
      return state.all;
    },
    getIsLoaded(state) {
      return state.loaded;
    },
    getTransactionById: (state) => (id: string) => {
      if (state.loaded) {
        return state.all.find((c) => c.id === id);
      } else {
        console.log('State is not loaded.');
      }
    },
  },
  actions: {
    async fetchAll() {
      await TransactionService.getAll()
        .then((response) => {
          this.all = response.data;
          this.loaded = true;
        })
        .catch(() => {
          this.loaded = false;
          console.log('Not loaded, something went wrong loading Transactions');
        });
    },
    async create(transaction: Transaction) {
      await TransactionService.create(transaction)
        .then((response) => {
          this.all.push(response.data);
        })
        .catch((err) => console.log('Failed to update Transaction', transaction, err));
    },
    async update(transaction: Transaction) {
      await TransactionService.update(transaction)
        .then((response) => {
          const i = this.all.findIndex((c) => c.id === response.data.id);
          if (i > -1) {
            this.all[i] = response.data;
          } else {
            this.all.push(response.data);
          }
        })
        .catch((err) => console.log('Failed to update Transaction', transaction, err));
    },
  },
});
