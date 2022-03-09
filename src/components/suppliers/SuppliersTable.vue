<template>
  <div class="flex flex-col" v-if="props.suppliers.length > 0">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-indigo-100">
              <tr>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Id
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Full Name
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Location
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="supplier in props.suppliers" :key="supplier.id">
                <td class="px-6 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {{ supplier.id }}
                  </div>
                </td>
                <td class="px-6 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {{ supplier.fullName }}
                  </div>
                </td>
                <td class="px-6 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {{ supplier.location }}
                  </div>
                </td>
                <td class="px-6 flex flex-nowrap whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    <FormKit type="button" @click="editSupplier(supplier.id)"
                      >Edit</FormKit
                    >
                  </div>
                  <div class="text-sm text-gray-500">
                    <FormKit type="button" @click="viewSupplier(supplier.id)"
                      >View</FormKit
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class=""></div>
</template>
<script setup lang="ts">
import { Supplier } from '@/types';
import { useRouter } from 'vue-router';

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
