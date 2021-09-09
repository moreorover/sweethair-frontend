<template>
  <div class="container has-text-centered">
    <h1 class="title is-4">Log IN</h1>
    <form @submit.prevent="onSubmit">
      <div class="field">
        <div class="control">
          <input v-model="email" type="email" class="input is-medium" placeholder="email" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="password" type="password" class="input is-medium" placeholder="password" />
        </div>
      </div>
      <button class="button is-block is-primary is-fullwidth is-medium">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store/';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const store = useStore();

    const email = ref('test@gmail.com');
    const password = ref('adminadmin');

    const onSubmit = async () => {
      await store.getAuth().login(email.value, password.value);
      router.push('/');
    };

    return { email, password, onSubmit };
  },
});
</script>

<style></style>
