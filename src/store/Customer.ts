import { Customer } from './../api/customer';
import CustomerService from '@/services/CustomerService';

const state = {
  customer: null,
  customers: [],
};

const getters = {
  customer: (state) => {
    return state.customer;
  },
  customers: (state) => {
    return state.customers;
  },
};

const actions = {
  async saveCustomer({ commit }, customer: Customer) {
    const { data } = await CustomerService.create(customer);
    commit('setCustomer', data);
  },
  async allCustomers({ commit }) {
    const { data } = await CustomerService.getAll();
    commit('setCustomers', data);
  },
  // async updateCustomer({commit, dispatch}, customer: Customer) {
  //   const {data} = await CustomerService.update(customer);

  // }
};

const mutations = {
  setCustomer(state, customer): void {
    state.customer = customer;
  },
  setCustomers(state, customers): void {
    state.customers = customers;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
