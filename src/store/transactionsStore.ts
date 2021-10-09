import TransactionService, { Transaction } from './../services/TransactionService';
import { defineStore } from 'pinia';
import { Appointment } from '@/services/AppointmentService';

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
    getTransactionsByAppointment: (state) => (appointment: Appointment | undefined) => {
      if (appointment) {
        const customerIds: (string | undefined)[] = appointment.customers.map((customer) => customer.id);
        const appointmentId: string | undefined = appointment.id;

        const transactions: Transaction[] = state.all.filter(
          (transaction) => transaction.appointment?.id === appointmentId //&& customerIds.includes(transaction.customer?.id)
        );
        return transactions;
      }
      return [];
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
    async delete(transaction: Transaction) {
      TransactionService.delete(transaction.id ? transaction.id : '');
      this.all = this.all.filter((t) => t.id !== transaction.id);
    },
  },
});
