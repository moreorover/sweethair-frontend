<template>
  <suspense>
    <template #default>
      <customer />
    </template>
    <template #fallback>
      <progress class="progress is-snall is-info" max="100"></progress>
    </template>
  </suspense>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Customer from '@/components/customers/Customer.vue';

export default defineComponent({
  components: { Customer },
});
</script>
<style scoped></style>
