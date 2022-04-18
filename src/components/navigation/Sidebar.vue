<script setup lang="ts">
import { ref } from 'vue';

const activeClass = ref('bg-gray-300 ');
const inactiveClass = ref('hover:bg-gray-300');

const routes = [
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Customers', link: '/customers' },
];
</script>
<template>
  <div class="w-full px-2">
    <div class="flex w-full flex-col items-center">
      <router-link
        v-for="route of routes"
        :to="route.link"
        :class="[$route.name === route.title ? activeClass : inactiveClass]"
        class="mt-2 flex h-12 w-full items-center rounded px-3"
      >
        <span class="ml-2 text-sm font-medium">{{ route.title }}</span>
      </router-link>
    </div>
  </div>
</template>
