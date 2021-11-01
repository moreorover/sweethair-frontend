<template>
  <div class="px-2 py-2 md:px-6 lg:px-8">
    <div class="flex align-items-center justify-content-center">
      <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
          <h1>Sweet Hair</h1>
          <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        </div>

        <div>
          <label for="email1" class="block text-900 font-medium mb-2">Email</label>
          <InputText id="email1" v-model="email" type="text" class="w-full mb-3" />

          <label for="password1" class="block text-900 font-medium mb-2">Password</label>
          <InputText id="password1" v-model="password" type="password" class="w-full mb-3" />

          <Button label="Sign In" icon="pi pi-user" class="w-full" @click="onSubmit"></Button>
        </div>
      </div>
    </div>
  </div>
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
