<template>
  <Suspense>
    <template #default>
      <Suppliers />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Suppliers from './Suppliers.vue';
</script>
