<template>
  <div class="container mx-auto">
    <SupplierForm @submit="update" :supplier="supplier" />
  </div>
</template>

<script setup lang="ts">
import SupplierForm from '@/components/suppliers/SupplierForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useSuppliersStore } from '@/store/suppliersStore';

const store = useSuppliersStore();
const route = useRoute();
const router = useRouter();
const id: number = +route.params.id;

if (!store.isLoaded) await store.fetchAll();

const supplier = store.getRaw[id];

const update = async (supplier: any) => {
  store.update(supplier);

  router.back();
};
</script>
