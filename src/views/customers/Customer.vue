<template>
  <div class="flex justify-between">
    <h3
      data-test="customer-fullname"
      class="text-3xl font-medium text-gray-700"
    >
      {{ customer.fullName }}
    </h3>
    <CustomerDialog
      :customer="customer"
      header="Edit Customer"
      label="Edit"
      class="btn btn-large"
      @submit="handleCustomerUpdate($event)"
    />
  </div>
  <div v-if="customer.email || customer.instagram" class="flex space-x-4">
    <h6 v-if="customer.email" class="text-xl font-light text-gray-800">
      Email: {{ customer.email }}
    </h6>
    <h6 v-if="customer.instagram" class="text-xl font-light text-gray-800">
      Instagram: {{ customer.instagram }}
    </h6>
  </div>
  <div
    v-if="customer.about"
    class="
      border-solid border-4 border-light-blue-500
      bg-gray-300
      py-8
      px-6
      my-4
    "
  >
    {{ customer.about }}
  </div>

  <h3 class="text-2xl font-medium text-gray-700">Customer appointments</h3>
  <BaseCardGrid>
    <AppointmentCard
      v-for="appointment in customer.appointments"
      :key="appointment.id"
      :appointment="appointment"
    />
  </BaseCardGrid>
  <h3 class="text-2xl font-medium text-gray-700">Customer transactions</h3>
  <BaseCardGrid>
    <TransactionCard
      v-for="transaction in customer.transactions"
      :key="transaction.id"
      :transaction="transaction"
    />
  </BaseCardGrid>
</template>
<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import { computed } from 'vue';
import CustomerDialog from '@/components/customers/CustomerDialog.vue';
import BaseCardGrid from '@/components/base/BaseCardGrid.vue';
import AppointmentCard from '@/components/appointments/AppointmentCard.vue';
import TransactionCard from '@/components/transactions/TransactionCard.vue';
import { useRoute, useRouter } from 'vue-router';
import {
  useCustomerQuery,
  useUpdateCustomerMutation,
} from '@/generated/graphql';

const route = useRoute();
const router = useRouter();
const id: number = +route.params.id;

const updateCustomerMutation = useUpdateCustomerMutation();

const { data, error } = await useCustomerQuery({
  variables: { customerId: id },
});

if (data.value?.customer == null) router.replace({ name: 'Customers' });

const customer = computed<Customer>(() => data.value?.customer as Customer);

const handleCustomerUpdate = async (customer: Customer) => {
  await updateCustomerMutation.executeMutation({
    customer,
  });
};
</script>
