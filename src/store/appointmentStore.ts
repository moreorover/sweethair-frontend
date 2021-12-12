import { Transaction } from './../services/TransactionService';
import AppointmentService, { Appointment } from '@/services/AppointmentService';
import { defineStore } from 'pinia';
import CustomerService, { Customer } from '@/services/CustomerService';
import { Item } from '@/services/ItemService';

export const useAppointmentStore = defineStore({
  id: 'appointmentStore',
  state: () => ({
    appointment: {} as Appointment,
    customers: [] as Customer[],
    customersBase: [] as Partial<Customer>[],
    transactions: [] as Transaction[],
    items: [] as Item[],
  }),
  getters: {
    getAppointment(state): Appointment {
      return state.appointment;
    },
    getCustomers(state): Customer[] {
      return state.customers;
    },
    getCustomersIds(state): number[] {
      return state.customers.map((c) => c.id);
    },
    getCustomerBase(state): Partial<Customer>[] {
      return state.customersBase;
    },
    getTransactions(state): Transaction[] {
      return state.transactions;
    },
    getItems(state): Item[] {
      return state.items;
    },
  },
  actions: {
    async fetch(id: number) {
      try {
        const { data } = await AppointmentService.get(id);
        this.appointment = data;
      } catch (error) {
        console.log(`Not loaded, something went wrong loading Appointment with id ${id}`);
        console.log({ error });
      }
    },
    async fetchCustomers() {
      try {
        if (!this.appointment) throw 'appointmentStore appointment is null';
        const { data } = await AppointmentService.fetchCustomers(this.appointment.id);
        this.customers = data;
      } catch (error) {
        console.log('Not loaded, something went wrong loading Appointment Customers');
        console.log({ error });
      }
    },
    async fetchTransactions() {
      try {
        if (!this.appointment) throw 'appointmentStore appointment is null';
        const { data } = await AppointmentService.fetchTransactions(this.appointment.id);
        this.transactions = data;
      } catch (error) {
        console.log('Not loaded, something went wrong loading Appointment Transactions');
        console.log({ error });
      }
    },
    async fetchItems() {
      try {
        if (!this.appointment) throw 'appointmentStore appointment is null';
        const { data } = await AppointmentService.fetchItems(this.appointment.id);
        this.items = data;
      } catch (error) {
        console.log('Not loaded, something went wrong loading Appointment Items');
        console.log({ error });
      }
    },
    async saveCustomersToAppointment(customers: Customer[]) {
      if (!customers.length) return;

      try {
        if (!this.appointment) throw 'appointmentStore appointment is null';
        const { data } = await AppointmentService.addCustomers(this.appointment.id, customers);
        this.customers = data;
      } catch (error) {
        console.log('Not loaded, something went wrong loading Appointment Items');
        console.log({ error });
      }
    },
    async fetchAllCustomersBase() {
      try {
        const { data } = await CustomerService.fetchCustomersBase();
        this.customersBase = data;
      } catch (error) {
        console.log('Not loaded, something went wrong loading Customers base');
        console.log({ error });
      }
    },
  },
});
