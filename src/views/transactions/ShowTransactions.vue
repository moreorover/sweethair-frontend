<template>
  <Suspense>
    <template #default>
      <Transactions />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Transactions from '@/views/transactions/Transactions.vue';
</script>
