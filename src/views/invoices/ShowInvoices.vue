<template>
  <Suspense>
    <template #default>
      <Invoices />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Invoices from '@/views/invoices/Invoices.vue';
</script>
