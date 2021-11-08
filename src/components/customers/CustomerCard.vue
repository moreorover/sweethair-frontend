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
    <div class="mb-8">
      <p class="flex items-center text-sm text-gray-600">
        {{ customer.location }}
      </p>
      <div class="mb-2 text-xl font-bold text-gray-900">{{ customer.fullName }}</div>
      <p class="text-base text-gray-700">
        {{ customer.about }}
      </p>
    </div>
    <div class="flex items-center">
      <div class="text-sm">
        <p class="leading-none text-gray-900">{{ customer.email }}</p>
        <p class="text-gray-600">{{ customer.instagram }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Customer } from '@/services/CustomerService';

interface Props {
  customer: Customer;
}

const props = defineProps<Props>();
</script>
