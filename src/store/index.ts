import { inject, App } from 'vue';
import AppointmentStore from './AppointmentStore';
import CustomerStore from './CustomerStore';

export const storeKey = Symbol('store');

export class Store {
  private appointments: AppointmentStore;
  private customers: CustomerStore;

  constructor() {
    this.appointments = new AppointmentStore();
    this.customers = new CustomerStore();
  }

  install(app: App) {
    app.provide(storeKey, this);
  }

  getCustomers(): CustomerStore {
    return this.customers;
  }

  getAppointments(): AppointmentStore {
    return this.appointments;
  }
}

export const store = new Store();

export function useStore(): Store {
  const _store = inject<Store>(storeKey);
  if (!_store) {
    throw Error('Did you forgot to call provide?');
  }

  return _store;
}
