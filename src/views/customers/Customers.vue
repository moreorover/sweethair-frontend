<template>
  <h3 class="text-3xl font-medium text-gray-700">Customers</h3>

  <div class="mt-8">
    <div class="mt-6">
      <div class="flex flex-col mt-3 lg:flex-row">
        <customer-dialog header="Create new Customer" label="New" buttonSize="medium" />

        <div class="relative block mt-2 sm:mt-0">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
              />
            </svg>
          </span>

          <BaseInput v-model="search" class="pl-8 pr-6" type="text" />
        </div>
      </div>
      <div class="text-center lg:text-left text-gray-700 font-bold py-2">
        Showing {{ customers.length }} out of {{ customersStore.getAll.length }} records.
      </div>
      <BaseCardGrid>
        <customer-card v-for="customer in customers" :key="customer.id" :customer="customer"></customer-card>
      </BaseCardGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomersStore } from '@/store/customersStore';
import { computed, ref } from 'vue';
import CustomerDialog from '@/components/customers/CustomerDialog.vue';
import CustomerCard from '@/components/customers/CustomerCard.vue';
import BaseCardGrid from '@/components/base/BaseCardGrid.vue';

const customersStore = useCustomersStore();

if (customersStore.shouldLoadState) await customersStore.fetchAll();

const customers = computed(() =>
  customersStore.getAll.filter(
    (c) =>
      c.fullName.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
      c.location.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
      c.about.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
      c.email?.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
      c.instagram?.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  )
);

const search = ref('');
</script>
