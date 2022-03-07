<template>
  <Suspense>
    <template #default>
      <Purchases />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Purchases from '@/views/Purchases/Purchases.vue';
</script>
