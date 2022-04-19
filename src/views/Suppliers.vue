<script setup lang="ts">
import { computed } from 'vue';
import SupplierFormDialog from '../components/suppliers/SupplierFormDialog.vue';
import SuppliersTable from '../components/suppliers/SuppliersTable.vue';
import { useSuppliers } from '../store/suppliersStore';

const suppliersStore = useSuppliers();
const suppliers = computed(() => suppliersStore.getAll);
const records = computed(() => suppliersStore.getRecords);
const ids = computed(() => suppliersStore.getIds);

suppliersStore.fetchAll();
</script>
<template>
  <h3 class="text-3xl font-medium text-gray-700">Suppliers</h3>

  <div class="mt-4">
    <div
      class="flex items-center justify-end space-x-4 rounded-md bg-white px-4 py-4"
    >
      <div>Search</div>
      <SupplierFormDialog />
    </div>
  </div>

  <div class="mt-4">
    <SuppliersTable :suppliers="suppliers" />
  </div>

  <div class="mt-4">
    <div
      class="flex items-center justify-end space-x-4 rounded-md bg-white px-4 py-4"
    >
      Suppliers <br />
      {{ suppliers }} <br />
      <br />
      Records <br />
      {{ records }} <br />
      <br />
      ids <br />
      {{ ids }}
    </div>
  </div>
</template>
