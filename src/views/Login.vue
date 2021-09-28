<template>
  <section class="hero welcome is-info is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form class="box" @submit.prevent="onSubmit">
              <h1 class="title has-text-centered has-text-danger-dark">Sweet Hair</h1>
              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left">
                  <input v-model="email" class="input" type="email" placeholder="e.g. alexjohnson@gmail.com" required />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left">
                  <input v-model="password" class="input" type="password" placeholder="********" required />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox" disabled />
                  Remember me
                </label>
              </div>
              <div class="field">
                <button class="button is-success">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoggedInUserStore } from '@/store/loggedInUser';

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const store = useLoggedInUserStore();

    const email = ref('test@gmail.com');
    const password = ref('adminadmin');

    const onSubmit = async () => {
      await store.login(email.value, password.value);
      router.push('/');
    };

    return { email, password, onSubmit };
  },
});
</script>

<style></style>
