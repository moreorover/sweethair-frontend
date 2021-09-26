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
          <div v-if="isLoggedIn" class="navbar-item">Hello {{ user?.firstName }} {{ user?.lastName }}</div>
          <router-link v-if="isLoggedIn" class="navbar-item" to="/logout">Logout</router-link>

          <router-link v-else class="navbar-item" to="/login">Log In</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SideMenu from '@/components/SideMenu.vue';
import { useLoggedInUserStore } from '@/store/loggedInUser';

export default defineComponent({
  name: 'Navigation',
  components: { SideMenu },
  setup() {
    const isOpen = ref<boolean>(false);
    const store = useLoggedInUserStore();

    return { isOpen, user: computed(() => store.getUser), isLoggedIn: computed(() => store.getIsLoggedIn) };
  },
});
</script>
<style scoped>
nav.navbar {
  border-top: 4px solid #ae0cbd;
  margin-bottom: 1rem;
}
</style>
