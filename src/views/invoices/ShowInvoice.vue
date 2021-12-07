<template>
  <Suspense>
    <template #default>
      <Invoice />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Invoice from '@/views/invoices/Invoice.vue';
</script>
