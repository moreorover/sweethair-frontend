import { inject, App } from 'vue';
import AuthStore from './AuthStore';
import CustomerStore from './CustomerStore';

export const storeKey = Symbol('store');

export class Store {
  private auth: AuthStore;
  private customers: CustomerStore;

  constructor() {
    this.auth = new AuthStore();
    this.customers = new CustomerStore();
  }

  install(app: App) {
    app.provide(storeKey, this);
  }

  getCustomers() {
    return this.customers;
  }

  getAuth() {
    return this.auth;
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
