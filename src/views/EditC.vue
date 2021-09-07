<template>
  <suspense>
    <template #default>
      <edit-customer />
    </template>

    <template #fallback> Loading... </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EditCustomer from '@/views/EditCustomer.vue';
export default defineComponent({
  components: {
    EditCustomer,
  },
});
</script>
