import { Transaction } from '@/services/TransactionService';
import AppointmentService, { Appointment } from '@/services/AppointmentService';
import { defineStore } from 'pinia';
import CustomerService, { Customer } from '@/services/CustomerService';

export const useAppointmentStore = defineStore({
  id: 'appointmentStore',
  state: () => ({
    appointment: {} as Appointment,
    customersBase: [] as Partial<Customer>[],
  }),
  getters: {
    getAppointment(state): Appointment {
      return state.appointment;
    },
    getCustomerBase(state): Partial<Customer>[] {
      return state.customersBase;
    },
  },
  actions: {
    async fetch(id: number) {
      try {
        const { data } = await AppointmentService.get(id);
        this.appointment = data;
      } catch (error) {
        console.log(
          `Not loaded, something went wrong loading Appointment with id ${id}`
        );
        console.log({ error });
      }
    },
    async saveCustomersToAppointment(customers: Customer[]) {
      if (!customers.length) return;

      try {
        if (!this.appointment) throw 'appointmentStore appointment is null';
        const { data } = await AppointmentService.addCustomers(
          this.appointment.id,
          customers
        );
        this.appointment.customers = data;
      } catch (error) {
        console.log(
          'Not loaded, something went wrong loading Appointment Items'
        );
        console.log({ error });
      }
    },
    async removeCustomerFromAppointment(customer: Customer) {
      try {
        if (!this.appointment) throw 'appointmentStore appointment is null';
        const { data } = await AppointmentService.removeCustomer(
          this.appointment.id,
          customer
        );
        this.appointment.customers = data;
      } catch (error) {
        console.log(
          'Not loaded, something went wrong loading Appointment Customers'
        );
        console.log({ error });
      }
    },
    async saveTransactionToAppointment(
      customerId: number,
      transaction: Transaction
    ) {
      try {
        if (!this.appointment) throw 'appointmentStore appointment is null';
        const { data } = await AppointmentService.addTransaction(
          this.appointment.id,
          customerId,
          transaction
        );
        this.appointment.transactions.push(data);
      } catch (error) {
        console.log(
          'Not saved, something went wrong saving Appointment Transaction'
        );
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
    async updateAppointment(appointment: Appointment) {
      try {
        const { data } = await AppointmentService.update(appointment);
        this.appointment = data;
      } catch (error) {
        console.log('Not loaded, something went wrong updating Appointment');
        console.log({ error });
      }
    },
  },
});
