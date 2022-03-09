<template>
  <div class="flex flex-col" v-if="props.purchases.length > 0">
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
                  Ordered At
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
                  Arrives At
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
                  Arrived
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
                  Supplier
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
                  Total
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="purchase in props.purchases" :key="purchase.id">
                <td class="px-6 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {{ purchase.id }}
                  </div>
                </td>
                <td class="px-6 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {{ formatDate(purchase.orderedAt) }}
                  </div>
                </td>
                <td class="px-6 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {{ formatDate(purchase.arrivesAt) }}
                  </div>
                </td>
                <td class="px-6 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {{ purchase.arrived }}
                  </div>
                </td>
                <td class="px-6 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {{ purchase.supplier?.fullName }}
                  </div>
                </td>
                <td class="px-6 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    £ {{ purchase.total }}
                  </div>
                </td>
                <td class="px-6 flex flex-nowrap whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    <FormKit type="button" @click="editPurchase(purchase.id)">
                      Edit
                    </FormKit>
                  </div>
                  <div class="text-sm text-gray-500">
                    <FormKit type="button" @click="viewPurchase(purchase.id)">
                      View
                    </FormKit>
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
import { useDate } from '@/hooks/useDate';
import { Purchase } from '@/types';
import { useRouter } from 'vue-router';

interface Props {
  purchases: Purchase[];
}

const router = useRouter();

const props = defineProps<Props>();

const { formatDate } = useDate();

const editPurchase = (purchaseId: number) => {
  router.push({ name: 'Edit Purchase', params: { id: purchaseId } });
};

const viewPurchase = (purchaseId: number) => {
  router.push({ name: 'View Purchase', params: { id: purchaseId } });
};
</script>
