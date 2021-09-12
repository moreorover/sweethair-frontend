<template>
  <nav class="navbar is-white has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item brand-text" to="/">Sweet Hair</router-link>
        <a class="navbar-burger" data-target="navMenu" :class="{ 'is-active': isOpen }" @click="isOpen = !isOpen">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <div id="navMenu" class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start" :class="{ 'is-hidden': !isOpen }">
          <side-menu />
        </div>
        <div class="navbar-end">
          <div class="navbar-item">Hello {{ user?.firstName }} {{ user?.lastName }}</div>
          <router-link class="navbar-item" to="/logout">Logout</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { User } from '@/services/AuthService';
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store/';
import SideMenu from '@/components/SideMenu.vue';

export default defineComponent({
  name: 'Navigation',
  components: { SideMenu },
  setup() {
    const isOpen = ref<boolean>(false);
    const store = useStore();

    const user: User | null = store.getAuth().getState().user;

    return { isOpen, user };
  },
});
</script>
<style scoped>
nav.navbar {
  border-top: 4px solid #ae0cbd;
  margin-bottom: 1rem;
}
</style>
