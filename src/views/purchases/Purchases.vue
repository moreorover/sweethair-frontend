<template>
  <h3 class="text-3xl font-medium text-gray-700">Purchases</h3>

  <FormKit type="button" @click="newPurchase"> New Purchase </FormKit>

  <div class="flex flex-col mx-auto gap-4 pt-3">
    <div class="container flex flex-col mx-auto" v-if="purchases.length">
      <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <span class="font-bold text-md text-black ml-2">Purchases</span>
          </div>
        </div>
        <div class="container flex flex-col mx-auto gap-4 pl-8">
          <div class="flex text-center justify-between">
            <div class="flex items-center">
              <!-- <TransactionDialog
                header="Book a Transaction"
                label="Book Transaction"
                :appointment="appointment"
                class="btn btn-small"
              /> -->
            </div>
          </div>

          <div v-for="purchase of purchases" @click="editPurchase(purchase)">
            {{ purchase.id }} {{ purchase.arrived }} {{ purchase.total }}
            {{ formatDate(purchase.arrivesAt) }}
            {{ formatDate(purchase.orderedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { usePurchasesStore } from '@/store/purchasesStore';
import { Purchase } from '@/types';
import { format } from 'date-fns';
import { computed } from 'vue';

const purchaseStore = usePurchasesStore();

await purchaseStore.fetchAll();

const purchases = computed(() => purchaseStore.getAll);

const newPurchase = () => {
  router.push({ name: 'New Purchase' });
};

const editPurchase = (purchase: Purchase) => {
  router.push(`/purchases/${purchase.id}/edit`);
};

const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'yyyy-MM-dd');
};
</script>
