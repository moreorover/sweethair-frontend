<template>
  <div class="container mx-auto">
    <PurchaseForm @submit="updatePurchase" :purchase="purchase" />
  </div>
</template>

<script setup lang="ts">
import PurchaseForm from '@/components/purchases/PurchaseForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { usePurchasesStore } from '@/store/purchasesStore';

const purchaseStore = usePurchasesStore();
const route = useRoute();
const router = useRouter();
const id: number = +route.params.id;

if (!purchaseStore.isLoaded) await purchaseStore.fetchAll();

const purchase = purchaseStore.getRaw[id];

const updatePurchase = async (purchase: any) => {
  console.log({ purchase });
  purchaseStore.update(purchase);

  router.back();
};
</script>
