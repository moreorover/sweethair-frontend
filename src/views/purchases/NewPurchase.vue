<template>
  <div class="container mx-auto">
    <PurchaseForm :purchase="newPurchase" @submit="createPurchase" />
  </div>
</template>

<script setup lang="ts">
import PurchaseForm from '@/components/purchases/PurchaseForm.vue';
import router from '@/router';
import { Purchase } from '@/types';
import { useDate } from '@/hooks/useDate';
import { usePurchasesStore } from '@/store/purchasesStore';

const { formatDate } = useDate();

const purchaseStore = usePurchasesStore();

const newPurchase: Purchase = {
  id: -1,
  arrived: false,
  arrivesAt: formatDate(new Date()),
  orderedAt: formatDate(new Date()),
  total: 0,
};

const createPurchase = async (purchase: any) => {
  purchaseStore.create(purchase);

  router.back();
};
</script>
