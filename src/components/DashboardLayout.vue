<script setup lang="ts">
import Header from './navigation/Header.vue';
import Sidebar from './navigation/Sidebar.vue';
</script>
<template>
  <div class="tw-font-roboto tw-flex tw-h-screen tw-bg-gray-200">
    <Sidebar />

    <div class="tw-flex tw-flex-1 tw-flex-col tw-overflow-hidden">
      <Header />

      <main
        class="tw-flex-1 tw-overflow-y-auto tw-overflow-x-hidden tw-bg-gray-200"
      >
        <div class="tw-container tw-mx-auto tw-px-6 tw-py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
