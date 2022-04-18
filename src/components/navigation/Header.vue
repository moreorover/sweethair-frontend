<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './Sidebar.vue';

const open = ref(false);
</script>
<template>
  <header class="flex items-center justify-around py-4 px-4">
    <div>Salooner</div>
    <div></div>
    <div class="hover:cursor-pointer" @click="open = !open">
      <div class="flex items-center justify-center">
        <div class="relative inline-block">
          <!-- Dropdown toggle button -->
          <button
            class="relative z-10 block rounded-md border border-transparent bg-white p-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400 dark:focus:ring-opacity-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <!-- Dropdown menu -->
          <div
            :class="[open ? 'absolute right-0 z-20' : 'hidden']"
            class="mt-2 w-48 rounded-md bg-white py-2 shadow-xl dark:bg-gray-800"
          >
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
