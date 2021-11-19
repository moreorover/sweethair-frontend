<template>
  <Suspense>
    <template #default>
      <Transaction />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Transaction from '@/views/transactions/Transaction.vue';
</script>
