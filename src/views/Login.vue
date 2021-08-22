<template>
  <div class="container has-text-centered">
    <h1 class="title is-4">Log IN</h1>
    <form @submit.prevent="onSubmit">
      <div class="field">
        <div class="control">
          <input
            v-model="email"
            type="email"
            class="input is-medium"
            placeholder="email"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            v-model="password"
            type="password"
            class="input is-medium"
            placeholder="password"
          />
        </div>
      </div>
      <button class="button is-block is-primary is-fullwidth is-medium">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "@/axios/axios";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");

    const onSubmit = async () => {
      // TODO login and redirect
      const { data } = await axios.post("/auth/login", {
        email: email.value,
        password: password.value,
      });
      console.log(data);
    };

    return { email, password, onSubmit };
  },
});
</script>

<style></style>
