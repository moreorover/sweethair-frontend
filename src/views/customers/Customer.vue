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

  <h3 class="text-2xl font-medium text-gray-700">Customer appointments</h3>
  <BaseCardGrid>
    <AppointmentCard v-for="appointment in customerAppointments" :key="appointment.id" :appointment="appointment" />
  </BaseCardGrid>
  <h3 class="text-2xl font-medium text-gray-700">Customer transactions</h3>
  <BaseCardGrid>
    <TransactionCard v-for="transaction in customerTransactions" :key="transaction.id" :transaction="transaction" />
  </BaseCardGrid>
</template>
<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import { useCustomersStore } from '@/store/customersStore';
import { computed } from 'vue';
import CustomerDialog from '@/components/customers/CustomerDialog.vue';
import BaseCardGrid from '@/components/base/BaseCardGrid.vue';
import AppointmentCard from '@/components/appointments/AppointmentCard.vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { useTransactionsStore } from '@/store/transactionsStore';
import TransactionCard from '@/components/transactions/TransactionCard.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const customersStore = useCustomersStore();
const appointmentsStore = useAppointmentsStore();
const transactionsStore = useTransactionsStore();

if (customersStore.shouldLoadState) await customersStore.fetchAll();

appointmentsStore.fetchAll();
transactionsStore.fetchAll();

const customers = customersStore.all;

const customer = computed<Customer | undefined>(() => customers.find((c) => c.id === route.params.id));

const customerAppointments = appointmentsStore.getAppointmentsByCustomer(customer.value);

const customerTransactions = transactionsStore.getTransactionsByCustomerAndAppointmentNull(customer.value);
</script>
