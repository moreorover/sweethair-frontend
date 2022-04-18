<script setup lang="ts">
import Sidebar from './components/navigation/Sidebar.vue';
</script>
<template>
  <div class="flex h-screen flex-row">
    <div
      class="flex h-full w-40 flex-col items-center overflow-hidden rounded bg-gray-100 text-gray-700"
    >
      <router-link class="mt-3 flex w-full items-center px-3" to="/">
        <svg
          class="h-8 w-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
          ></path>
        </svg>
        <span class="ml-2 text-sm font-bold">Salooner</span>
      </router-link>
      <Sidebar />
    </div>

    <div class="flex-auto bg-gray-200">
      <div class="container p-8">
        <router-view />
      </div>
    </div>
  </div>
</template>
