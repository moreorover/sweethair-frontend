<template>
  <suspense>
    <template #default>
      <customers />
    </template>
    <template #fallback>
      <progress class="progress is-snall is-info" max="100"></progress>
    </template>
  </suspense>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Customers from '@/components/customers/Customers.vue';

export default defineComponent({
  components: { Customers },
});
</script>
<style scoped></style>
