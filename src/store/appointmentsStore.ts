import AppointmentService, { Appointment } from '@/services/AppointmentService';
import { defineStore } from 'pinia';
import { Customer } from '@/services/CustomerService';
import { getMonth, getYear } from 'date-fns';
import router from '@/router';

interface AppointmentStore {
  all: Record<string, Appointment>;
  ids: string[];
  loaded: boolean;
  loading: boolean;
}

export const useAppointmentsStore = defineStore({
  id: 'appointmentsStore',
  state: (): AppointmentStore => ({
    all: {},
    ids: [],
    loaded: false,
    loading: false,
  }),
  getters: {
    getRaw(state): Record<string, Appointment> {
      return state.all;
    },
    getAll(state): Appointment[] {
      return state.ids.map((id) => this.all[id]);
    },
    getIds(state): string[] {
      return state.ids;
    },
    getAppointmentById:
      (state) =>
      (id: string): Appointment => {
        return state.all[id];
      },
    getAppointmentsByMonthAndYear:
      (state) =>
      (month: number, year: number): Appointment[] => {
        return state.ids
          .map((id) => state.all[id])
          .filter((x) => getMonth(new Date(x.scheduledAt)) == month && getYear(new Date(x.scheduledAt)) == year);
      },
    getAppointmentsByCustomer:
      (state) =>
      (customer: Customer): Appointment[] => {
        const { id: customerId } = customer;
        const appointments: Appointment[] = state.ids
          .map((id) => state.all[id])
          .filter((a) => a.customers?.map((c) => c.id).includes(customerId));
        return appointments;
      },
    shouldLoadState: (state): boolean => !state.loading && !state.loaded,
  },
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const { data } = await AppointmentService.getAll();
        const ids: string[] = [];
        const all: Record<string, Appointment> = {};

        for (const appointment of data) {
          if (!ids.includes(appointment.id)) {
            ids.push(appointment.id);
          }
          all[appointment.id] = appointment;
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
        console.log('Not loaded, something went wrong loading Appointments');
        console.log({ error });
      }
    },
    async create(appointment: Appointment) {
      try {
        const { data } = await AppointmentService.create(appointment);
        this.all[data.id] = data;
        this.ids.push(data.id);
        router.push({ name: 'Appointment', params: { id: data.id } });
      } catch (error) {
        console.log('Failed to create Appointment', appointment, error);
      }
    },
    async update(appointment: Appointment) {
      try {
        const { data } = await AppointmentService.update(appointment);
        this.all[data.id] = data;
        router.push({ name: 'Appointment', params: { id: data.id } });
      } catch (error) {
        console.log('Failed to update Appointment', appointment, error);
      }
    },
    async removeCustomer(appointment: Appointment, customer: Customer) {
      if (appointment.customers) {
        appointment.customers = appointment.customers.filter((c) => c.id !== customer.id);
        await this.update(appointment);
      }
    },
  },
});
