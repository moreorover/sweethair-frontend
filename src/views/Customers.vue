<script setup lang="ts">
import { computed } from 'vue';
import { useCustomers } from '../store/customersStore';

const customersStore = useCustomers();
const customers = computed(() => customersStore.getAll);
const records = computed(() => customersStore.getRecords);
const ids = computed(() => customersStore.getIds);

customersStore.fetchAll();
</script>
<template>
  <h3 class="text-3xl font-medium text-gray-700">Customers</h3>
  <div class="flex flex-col">
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    Customers <br />
    {{ customers }} <br />
    <br />
    Records <br />
    {{ records }} <br />
    <br />
    ids <br />
    {{ ids }}
    <!-- <div class="flex w-1/2 flex-col bg-red-400">
      <div class="">Customers</div>
      
    </div>
    <div class="flex w-1/2 flex-col bg-blue-400">Selected Customer</div> -->
  </div>
</template>
