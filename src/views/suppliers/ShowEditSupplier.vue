<template>
  <Suspense>
    <template #default>
      <EditSupplier />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import EditSupplier from './EditSupplier.vue';
</script>
