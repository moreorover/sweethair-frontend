import { Customer } from './../services/CustomerService';
import TransactionService, { Transaction } from './../services/TransactionService';
import { defineStore } from 'pinia';
import { Appointment } from '@/services/AppointmentService';

interface TransactionStore {
  all: Record<string, Transaction>;
  ids: number[];
  loaded: boolean;
  loading: boolean;
}

export const useTransactionsStore = defineStore({
  id: 'transactionsStore',
  state: (): TransactionStore => ({
    all: {},
    ids: [],
    loaded: false,
    loading: false,
  }),
  getters: {
    getRaw(state): Record<string, Transaction> {
      return state.all;
    },
    getAll(state): Transaction[] {
      return state.ids.map((id: number) => this.all[id]);
    },
    getIds(state): number[] {
      return state.ids;
    },
    getTransactionById:
      (state) =>
      (id: number): Transaction => {
        return state.all[id];
      },
    getTransactionsByAppointment:
      (state) =>
      (appointment: Appointment): Transaction[] => {
        const { id: appointmentId } = appointment;
        const transactions: Transaction[] = state.ids
          .map((id: number) => state.all[id])
          .filter((transaction: Transaction) => transaction.appointment?.id === appointmentId);
        return transactions;
      },
    getTransactionsByAppointmentCustomerNull:
      (state) =>
      (appointment: Appointment): Transaction[] => {
        const { id: appointmentId } = appointment;
        const transactions: Transaction[] = state.ids
          .map((id: number) => state.all[id])
          .filter((transaction: Transaction) => transaction.appointment?.id === appointmentId && !transaction.customer);
        return transactions;
      },
    getTransactionsByCustomer:
      (state) =>
      (customer: Customer): Transaction[] => {
        const { id: customerId } = customer;
        const transactions: Transaction[] = state.ids
          .map((id: number) => state.all[id])
          .filter((transaction: Transaction) => transaction.customer?.id === customerId);
        return transactions;
      },
    // TODO check what uses this function
    getTransactionsByCustomerAndAppointment:
      (state) =>
      (customer: Customer, appointment: Appointment): Transaction[] => {
        const { id: customerId } = customer;
        const transactions: Transaction[] = state.ids
          .map((id: number) => state.all[id])
          .filter(
            (transaction: Transaction) =>
              transaction.customer?.id === customerId && transaction.appointment?.id === appointment.id
          );
        return transactions;
      },
    getTransactionsByCustomerAndAppointmentNull:
      (state) =>
      (customer: Customer): Transaction[] => {
        const { id } = customer;
        const transactions: Transaction[] = state.ids
          .map((id: number) => state.all[id])
          .filter((transaction: Transaction) => transaction.customer?.id === id && !transaction.appointment);
        return transactions;
      },
    shouldLoadState: (state): boolean => !state.loading && !state.loaded,
  },
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const { data } = await TransactionService.getAll();
        const ids: number[] = [];
        const all: Record<string, Transaction> = {};

        for (const transaction of data) {
          if (!ids.includes(transaction.id)) {
            ids.push(transaction.id);
          }
          all[transaction.id] = transaction;
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
        console.log('Not loaded, something went wrong loading Transactions');
        console.log({ error });
      }
    },
    async create(transaction: Transaction) {
      try {
        const { data } = await TransactionService.create(transaction);
        this.all[data.id] = data;
        this.ids.push(data.id);
      } catch (error) {
        console.log('Failed to create Transaction', transaction, error);
      }
    },
    async update(transaction: Transaction) {
      try {
        const { data } = await TransactionService.update(transaction);
        this.all[data.id] = data;
      } catch (error) {
        console.log('Failed to update Transaction', transaction, error);
      }
    },
    async delete(transaction: Transaction) {
      try {
        await TransactionService.delete(transaction.id);
        this.ids = this.ids.filter((id) => id !== transaction.id);
        delete this.getRaw[transaction.id];
      } catch (error) {
        console.log('Failed to update Transaction', transaction, error);
      }
    },
  },
});
