import { reactive, readonly } from 'vue';
import CustomerService, { Customer } from '@/services/CustomerService';

export default class CustomerStore {
  private state: {
    all: Map<string, Customer>;
    loaded: boolean;
  };

  constructor() {
    this.state = reactive({ all: new Map<string, Customer>(), loaded: false });
  }

  getState() {
    return readonly(this.state);
  }

  async fetchAll(force = false) {
    if (!this.state.loaded || force) {
      const response = await CustomerService.getAll();
      for (const customer of response.data) {
        this.state.all.set(customer.id, customer);
      }
      this.state.loaded = true;
    }
  }

  async create(customer: Customer) {
    const response = await CustomerService.create(customer);
    this.state.all.set(response.data.id, response.data);
  }

  async update(customer: Customer) {
    const response = await CustomerService.update(customer);
    this.state.all.set(response.data.id, response.data);
  }
}
