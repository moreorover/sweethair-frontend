import { createStore } from 'vuex';
import User from './User';
import Customer from './Customer';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { user: User, customer: Customer },
});
