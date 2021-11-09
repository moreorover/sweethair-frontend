<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">{{ customer?.fullName }}</h3>
    <CustomerDialog :customer="customer" header="Edit Customer" label="Edit" buttonSize="large" />
  </div>
  <div v-if="customer?.email || customer?.instagram" class="flex space-x-4">
    <h6 v-if="customer?.email" class="text-xl font-light text-gray-800">Email: {{ customer?.email }}</h6>
    <h6 v-if="customer?.instagram" class="text-xl font-light text-gray-800">Instagram: {{ customer?.instagram }}</h6>
  </div>
  <div v-if="customer?.about" class="border-solid border-4 border-light-blue-500 bg-gray-300 py-8 px-6 my-4">
    {{ customer?.about }}
  </div>
</template>
<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import { useCustomersStore } from '@/store/customersStore';
import { computed } from 'vue';
import CustomerDialog from '@/components/customers/CustomerDialog.vue';

type Props = {
  id: string;
};

const props = defineProps<Props>();

const customersStore = useCustomersStore();

const all = customersStore.all;

const customer = computed<Customer | undefined>(() => all.find((c) => c.id === props.id));
const c = computed(() => customersStore.getCustomerById(props.id));
</script>
