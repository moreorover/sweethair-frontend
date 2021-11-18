<template>
  <Suspense>
    <template #default>
      <Customer />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Customer from '@/views/customers/Customer.vue';
</script>
