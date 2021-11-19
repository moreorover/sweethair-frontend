<template>
  <Suspense>
    <template #default>
      <ShowCustomers />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import ShowCustomers from '@/views/customers/Customers.vue';
</script>
