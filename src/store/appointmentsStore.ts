import AppointmentService, { Appointment } from '@/services/AppointmentService';
import { defineStore } from 'pinia';

interface AppointmentStore {
  all: Appointment[];
  loaded: boolean;
  newAppointment: Appointment;
}

export const useAppointmentsStore = defineStore({
  id: 'appointmentsStore',
  state: (): AppointmentStore => ({ all: [] as Appointment[], loaded: false, newAppointment: {} as Appointment }),
  getters: {
    getAll(state) {
      return state.all;
    },
    getIsLoaded(state) {
      return state.loaded;
    },
    getCustomerById: (state) => (id: string) => {
      if (state.loaded) {
        return state.all.find((x) => x.id === id);
      } else {
        console.log('State is not loaded.');
      }
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
          this.newAppointment = response.data;
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
  },
});
