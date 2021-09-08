import { reactive, readonly, inject, App } from 'vue';
import { Customer } from '../services/CustomerService';
import CustomerService from '@/services/CustomerService';

interface BaseState<T> {
  ids: string[];
  all: Map<string, T>;
  loaded: boolean;
}

type CustomersState = BaseState<Customer>;

export interface State {
  customers: CustomersState;
}

export const storeKey = Symbol('store');

export class Store {
  private state: State;

  constructor(initial: State) {
    this.state = reactive(initial);
  }

  install(app: App) {
    app.provide(storeKey, this);
  }

  getState() {
    return readonly(this.state);
  }

  async createCustomer(customer: Customer) {
    const response = await CustomerService.create(customer);
    this.state.customers.all.set(response.data.id, response.data);
    this.state.customers.ids.push(response.data.id);
  }

  async updateCustomer(customer: Customer) {
    const response = await CustomerService.update(customer);
    this.state.customers.all.set(response.data.id, response.data);
  }

  async fetchCustomers() {
    const response = await CustomerService.getAll();
    const customersState: CustomersState = {
      ids: [],
      all: new Map(),
      loaded: true,
    };

    for (const customer of response.data) {
      customersState.ids.push(customer.id);
      customersState.all.set(customer.id, customer);
    }

    this.state.customers = customersState;
  }
}

const all = new Map<string, Customer>();

export const store = new Store({
  customers: {
    all,
    ids: [],
    loaded: false,
  },
});

export function useStore(): Store {
  const _store = inject<Store>(storeKey);
  if (!_store) {
    throw Error('Did you forgot to call provide?');
  }

  return _store;
}
