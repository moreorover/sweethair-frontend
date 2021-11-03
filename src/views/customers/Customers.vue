<template>
  <h3 class="text-3xl font-medium text-gray-700">Customers</h3>
  {{ customers }}
</template>

<script setup lang="ts">
import { useCustomersStore } from '@/store/customersStore';
import { computed } from 'vue';

const customersStore = useCustomersStore();
customersStore.fetchAll();
const customers = computed(() => customersStore.getAll);
</script>
