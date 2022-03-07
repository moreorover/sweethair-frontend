<template>
  <div class="container mx-auto"><PurchaseForm @submit="createPurchase" /></div>
</template>

<script setup lang="ts">
import PurchaseForm from '@/components/purchases/PurchaseForm.vue';
import router from '@/router';
import { useFetch } from '@vueuse/core';

const createPurchase = async (purchase: any) => {
  useFetch('http://127.0.0.1:3000/purchases').post(purchase);

  router.back();
};
</script>
