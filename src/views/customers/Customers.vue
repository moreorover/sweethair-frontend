<template>
  <div class="px-0 py-4 md:px-4">
    <div class="border-2 surface-border border-round surface-card">
      <customers-table :customers="customers" :view-customer="true" @rowClicked="rowClicked" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import router from '@/router';
import CustomersTable from '@/components/customers/CustomersTable.vue';

export default defineComponent({
  name: 'Customers',
  components: { CustomersTable },
  setup() {
    const store = useCustomersStore();

    store.fetchAll();

    const customers = computed(() => store.getAll);

    const rowClicked = (data) => {
      router.push({ name: 'Customer', params: { id: data.data.id } });
    };

    return { customers, rowClicked };
  },
});
</script>
<style scoped></style>
