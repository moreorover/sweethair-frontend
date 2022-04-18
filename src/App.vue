<script setup lang="ts">
import Header from './components/navigation/Header.vue';
import Sidebar from './components/navigation/Sidebar.vue';
</script>
<template>
  <div class="flex h-screen flex-col">
    <div class="h-16">
      <Header />
    </div>
    <div class="flex h-full flex-row">
      <div class="hidden w-40 flex-col bg-gray-50 md:flex">
        <Sidebar />
      </div>
      <div class="flex w-full flex-col bg-gray-100">
        <div class="container p-8">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
