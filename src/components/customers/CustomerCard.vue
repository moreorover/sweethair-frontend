<template>
  <div
    class="
      flex flex-col
      justify-between
      p-4
      leading-normal
      bg-white
      border-b border-l border-r border-gray-200
      rounded-b
      lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r
      my-2
    "
  >
    <p class="flex items-center text-sm text-gray-600">
      {{ customer.location }}
    </p>
    <div class="mb-2 text-xl font-bold text-gray-900">{{ customer.fullName }}</div>
    <p class="text-base text-gray-700">
      {{ customer.about }}
    </p>
    <div class="flex items-center">
      <div class="text-sm">
        <p class="leading-none text-gray-900">{{ customer.email }}</p>
        <p class="text-gray-600">{{ customer.instagram }}</p>
      </div>
    </div>
    <div class="flex gap-1 justify-items-end pt-2">
      <RouterLink
        :to="{ name: `Customer`, params: { id: customer.id } }"
        class="
          tracking-wide
          text-white
          capitalize
          transition-colors
          duration-200
          transform
          bg-indigo-600
          rounded-md
          hover:bg-indigo-500
          focus:outline-none focus:bg-indigo-500
          px-2
          py-0
          font-normal
        "
      >
        Show
      </RouterLink>
      <customer-dialog :customer="customer" header="Edit Customer" label="Edit" buttonSize="small" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import CustomerDialog from '@/components/customers/CustomerDialog.vue';

interface Props {
  customer: Customer;
}

const props = defineProps<Props>();
</script>
