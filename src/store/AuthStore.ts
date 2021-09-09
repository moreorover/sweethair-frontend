import { reactive, readonly } from 'vue';
import AuthService, { User } from '@/services/AuthService';

export default class AuthStore {
  private state: {
    user: User | null;
  };

  constructor() {
    this.state = reactive({ user: null });
  }

  getState() {
    return readonly(this.state);
  }

  async login(email: string, password: string) {
    const response = await AuthService.login(email, password);
    this.state.user = response.data;
  }

  async me() {
    await AuthService.me()
      .then((response) => (this.state.user = response.data))
      .catch(() => {
        this.state.user = null;
        console.log('You are unauthenticated.');
      });
  }

  async logout() {
    await AuthService.logout();
    this.state.user = null;
  }
}
