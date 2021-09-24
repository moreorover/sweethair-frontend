import AuthService from '@/services/AuthService';
import { User } from './../../services/AuthService';
import { defineStore } from 'pinia';

interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
}

export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',
  state: (): UserStore => ({ user: null, isLoggedIn: false }),
  getters: {
    getUser(state) {
      return state.user;
    },
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
    async me() {
      await AuthService.me()
        .then((response) => {
          this.user = response.data;
          this.isLoggedIn = true;
        })
        .catch(() => {
          this.user = null;
          this.isLoggedIn = false;
          console.log('You are unauthenticated.');
        });
    },
  },
  actions: {
    async login(email: string, password: string) {
      await AuthService.login(email, password)
        .then((response) => {
          this.user = response.data;
          this.isLoggedIn = true;
        })
        .catch(() => {
          this.user = null;
          this.isLoggedIn = false;
          console.log('Incorrect login details.');
        });
    },
    async logout() {
      await AuthService.logout();
      this.user = null;
      this.isLoggedIn = false;
    },
  },
});
