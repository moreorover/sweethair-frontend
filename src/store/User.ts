import * as auth from '@/api/auth';

const state = {
  user: null,
};

const getters = {
  user: (state) => {
    return state.user;
  },
};

const actions = {
  async login({ commit }, { email, password }) {
    const user = await auth.login(email, password);
    commit('setUser', user);
  },
};

const mutations = {
  setUser(state, user): void {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
