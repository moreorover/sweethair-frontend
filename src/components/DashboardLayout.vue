<script setup lang="ts">
import Sidebar from './navigation/Sidebar.vue';
import Header from './navigation/Header.vue';
</script>
<template>
  <div class="font-roboto flex h-screen bg-gray-200">
    <Sidebar />

    <div class="flex flex-1 flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
