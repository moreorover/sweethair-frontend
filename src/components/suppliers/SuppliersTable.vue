<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Supplier } from '../../services/SuppliersService';
import SupplierFormDialog from './SupplierFormDialog.vue';

interface Props {
  suppliers: Supplier[];
}

const router = useRouter();

const props = defineProps<Props>();

const editSupplier = (supplierId: number) => {
  router.push({ name: 'Edit Supplier', params: { id: supplierId } });
};

const viewSupplier = (supplierId: number) => {
  router.push({ name: 'Supplier', params: { id: supplierId } });
};
</script>
<template>
  <div class="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <div
        class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-indigo-100">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Id
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Full Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Location
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="supplier in props.suppliers" :key="supplier.id">
              <td class="whitespace-nowrap px-6">
                <div class="text-sm text-gray-500">
                  {{ supplier.id }}
                </div>
              </td>
              <td class="whitespace-nowrap px-6">
                <div class="text-sm text-gray-500">
                  {{ supplier.fullName }}
                </div>
              </td>
              <td class="whitespace-nowrap px-6">
                <div class="text-sm text-gray-500">
                  {{ supplier.location }}
                </div>
              </td>
              <td class="flex flex-nowrap space-x-4 whitespace-nowrap px-6">
                <SupplierFormDialog
                  :supplier="supplier"
                  :button="{
                    class: ' p-button-warning p-button-text p-button-sm',
                    icon: 'pi pi-pencil',
                    label: 'Edit',
                  }"
                />
                <Button
                  label="View"
                  icon="pi pi-search"
                  class="p-button-secondary p-button-text p-button-sm"
                  @click="viewSupplier(supplier.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
