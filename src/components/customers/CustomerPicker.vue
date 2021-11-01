<script setup lang="ts">
import { useCustomersStore } from '@/store/customersStore';
import { computed, ref } from 'vue';

const emit = defineEmits(['selected']);

const store = useCustomersStore();
store.fetchAll();
const customers = computed(() => store.getAll);
const selected = ref();
const filteredCustomers = ref();
const searchCustomer = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCustomers.value = [...filteredCustomers.value];
    } else {
      filteredCustomers.value = customers.value.filter((customer) => {
        return customer.fullName.toLowerCase().includes(event.query.toLowerCase());
      });
    }
  }, 250);
};

const selectedSuggestion = (event) => {
  emit('selected', event.value);
};
</script>
<template>
  <AutoComplete
    v-model="selected"
    :suggestions="filteredCustomers"
    field="fullName"
    force-selection
    @complete="searchCustomer($event)"
    @item-select="selectedSuggestion($event)"
  />
</template>
