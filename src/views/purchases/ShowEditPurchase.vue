<template>
  <Suspense>
    <template #default>
      <EditPurchase />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import EditPurchase from '@/views/purchases/EditPurchase.vue';
</script>
