import { reactive, shallowReadonly } from 'vue';
import AppointmentService, { Appointment } from '@/services/AppointmentService';

export default class AppointmentStore {
  private state: {
    all: Map<string, Appointment>;
    loaded: boolean;
  };

  constructor() {
    this.state = reactive({ all: new Map<string, Appointment>(), loaded: false });
  }

  getState() {
    return shallowReadonly(this.state);
  }

  async fetchAll(force = false) {
    if (!this.state.loaded || force) {
      const response = await AppointmentService.getAll();
      for (const appointment of response.data) {
        this.state.all.set(appointment.id, appointment);
      }
      this.state.loaded = true;
    }
  }

  async create(appointment: Appointment) {
    const response = await AppointmentService.create(appointment);
    this.state.all.set(response.data.id, response.data);
  }

  async update(appointment: Appointment) {
    const response = await AppointmentService.update(appointment);
    this.state.all.set(response.data.id, response.data);
  }
}
