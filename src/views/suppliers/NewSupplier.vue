<template>
  <div class="container mx-auto">
    <SupplierForm :supplier="newSupplier" @submit="create" />
  </div>

  {{ newSupplier }}
</template>

<script setup lang="ts">
import router from '@/router';
import { useSuppliersStore } from '@/store/suppliersStore';
import { Supplier } from '@/types';
import SupplierForm from '@/components/suppliers/SupplierForm.vue';

const store = useSuppliersStore();

const newSupplier: Supplier = {
  id: -1,
  fullName: '',
  location: '',
  about: '',
  email: '',
  instagram: '',
  url: '',
};

const create = async (purchase: any) => {
  store.create(purchase);

  router.back();
};
</script>
