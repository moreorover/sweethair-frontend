<template>
  <div class="tw-flex tw-h-screen tw-bg-gray-200 tw-font-roboto">
    <Sidebar />

    <div class="tw-flex-1 tw-flex tw-flex-col tw-overflow-hidden">
      <Header />

      <main
        class="tw-flex-1 tw-overflow-x-hidden tw-overflow-y-auto tw-bg-gray-200"
      >
        <div class="tw-container tw-mx-auto tw-px-6 tw-py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
</script>
