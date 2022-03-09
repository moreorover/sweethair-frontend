<template>
  <Suspense>
    <template #default>
      <Supplier />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Supplier from './Supplier.vue';
</script>
