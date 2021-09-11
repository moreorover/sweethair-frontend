<template>
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item brand-text" to="/">Sweet Hair</router-link>
        <div
          class="navbar-burger burger"
          data-target="navMenu"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/about">About</router-link>
          <router-link class="navbar-item" to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Navigation',
  setup() {
    const isOpen = ref('');

    return { isOpen };
  },
});
</script>
<style scoped>
nav.navbar {
  border-top: 4px solid #ae0cbd;
  margin-bottom: 1rem;
}
</style>
