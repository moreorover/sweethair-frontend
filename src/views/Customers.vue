<template>
  <suspense>
    <template #default>
      <customers-table />
    </template>
    <template #fallback>
      <progress class="progress is-snall is-info" max="100"></progress>
    </template>
  </suspense>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CustomersTable from '@/components/CustomersTable.vue';

export default defineComponent({
  components: { CustomersTable },
});
</script>
<style scoped></style>
