import AppointmentService, { Appointment } from '@/services/AppointmentService';
import { defineStore } from 'pinia';
import _ from 'lodash';
import router from '@/router';
import { Customer } from '@/services/CustomerService';
import { getMonth, getYear } from 'date-fns';

interface AppointmentStore {
  all: Appointment[];
  loaded: boolean;
  new: Appointment | null;
  selected: Appointment | null;
}

export const useAppointmentsStore = defineStore({
  id: 'appointmentsStore',
  state: (): AppointmentStore => ({ all: [] as Appointment[], loaded: false, new: null, selected: null }),
  getters: {
    getAll(state) {
      return state.all;
    },
    getIsLoaded(state) {
      return state.loaded;
    },
    getAppointmentById: (state) => (id: string) => {
      if (state.loaded) {
        return state.all.find((x) => x.id === id);
      } else {
        console.log('State is not loaded.');
      }
    },
    getAppointmentByMonthAndYear: (state) => (month: number, year: number) => {
      if (state.loaded) {
        return state.all.filter(
          (x) => getMonth(new Date(x.scheduledAt)) == month && getYear(new Date(x.scheduledAt)) == year
        );
      } else {
        console.log('State is not loaded.');
      }
    },
    getNew(state) {
      return state.new;
    },
    getSelected(state) {
      return state.selected;
    },
  },
  actions: {
    async fetchAll() {
      await AppointmentService.getAll()
        .then((response) => {
          this.all = response.data;
          this.loaded = true;
        })
        .catch(() => {
          this.loaded = false;
          console.log('Not loaded, something went wrong loading Appointments');
        });
    },
    async create(appointment: Appointment) {
      await AppointmentService.create(appointment)
        .then((response) => {
          this.all.push(response.data);
          this.all = _.sortBy(this.all, ['scheduledAt']);
          router.push({ name: 'Appointment', params: { id: response.data.id } });
        })
        .catch((err) => console.log('Failed to create Customer', appointment, err));
    },
    async update(appointment: Appointment) {
      await AppointmentService.update(appointment)
        .then((response) => {
          const i = this.all.findIndex((c) => c.id === response.data.id);
          if (i > -1) {
            this.all[i] = response.data;
          } else {
            this.all.push(response.data);
          }
        })
        .catch((err) => console.log('Failed to update Appointment', appointment, err));
    },
    async removeCustomer(appointment: Appointment | undefined, customer: Customer) {
      if (appointment?.customers) {
        appointment.customers = appointment.customers?.filter((c) => c.id !== customer.id);
        this.update(appointment);
      }
    },
  },
});
