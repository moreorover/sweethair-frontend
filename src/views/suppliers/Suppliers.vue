<template>
  <h3 class="text-3xl font-medium text-gray-700">Suppliers</h3>

  <FormKit type="button" @click="newSupplier"> New Supplier </FormKit>

  <SuppliersTable :suppliers="suppliers" />
</template>

<script setup lang="ts">
import router from '@/router';
import { computed } from 'vue';
import { useSuppliersStore } from '@/store/suppliersStore';
import SuppliersTable from '@/components/suppliers/SuppliersTable.vue';

const store = useSuppliersStore();

await store.fetchAll();

const suppliers = computed(() => store.getAll);

const newSupplier = () => {
  router.push({ name: 'New Supplier' });
};
</script>
