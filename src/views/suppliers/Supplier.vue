<template>
  <h3 class="text-3xl font-medium text-gray-700">{{ supplier.fullName }}</h3>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSuppliersStore } from '@/store/suppliersStore';
import SuppliersTable from '@/components/suppliers/SuppliersTable.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useSuppliersStore();
const id: number = +route.params.id;

if (!store.loaded) await store.fetchAll();

const supplier = computed(() => store.getRaw[id]);
</script>
