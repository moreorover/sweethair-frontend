<template>
  <Suspense>
    <template #default>
      <Customers />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Customers from '@/views/customers/Customers.vue';
</script>
