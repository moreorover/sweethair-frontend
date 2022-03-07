<template>
  <h3 class="text-3xl font-medium text-gray-700">Purchases</h3>

  <FormKit type="button" @click="newPurchase"> New Purchase </FormKit>

  <PurchasesTable :purchases="purchases" />
</template>

<script setup lang="ts">
import router from '@/router';
import { usePurchasesStore } from '@/store/purchasesStore';
import { computed } from 'vue';
import PurchasesTable from '@/components/purchases/PurchasesTable.vue';

const purchaseStore = usePurchasesStore();

await purchaseStore.fetchAll();

const purchases = computed(() => purchaseStore.getAll);

const newPurchase = () => {
  router.push({ name: 'New Purchase' });
};
</script>
