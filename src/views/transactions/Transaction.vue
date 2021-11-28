<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">
      {{ transaction && format(new Date(transaction.scheduledAt), 'd MMMM yyyy - HH:mm') }}
    </h3>

    <TransactionDialog :transaction="transaction" header="Edit Transaction" label="Edit" buttonSize="large" />
  </div>
  <div class="flex max-w-screen-md">
    <div class="flex-grow max-h-full mx-6 m-auto">
      <div
        class="h-1"
        :class="{
          'bg-red-700': transaction && transaction.total < 0,
          'bg-green-700': transaction && transaction.total > 0,
        }"
      ></div>
    </div>
    <div class="flex flex-none text-xl font-bold text-gray-900 px-6">{{ transaction && transaction.total }}</div>
    <span
      class="text-xs mx-auto px-2 font-medium text-white rounded-full py-0.5"
      :class="{ 'bg-indigo-500': transaction && transaction.isPaid, 'bg-pink-500': transaction && !transaction.isPaid }"
    >
      {{ transaction && transaction.isPaid ? 'Paid' : 'Awaiting' }}
    </span>
    <div class="flex-grow max-h-full mx-6 m-auto">
      <div
        class="h-1"
        :class="{
          'bg-red-700': transaction && transaction.total < 0,
          'bg-green-700': transaction && transaction.total > 0,
        }"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import { Transaction } from '@/services/TransactionService';
import { format } from 'date-fns';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id: number = +route.params.id;

const transactionsStore = useTransactionsStore();
if (transactionsStore.shouldLoadState) await transactionsStore.fetchAll();
if (!transactionsStore.getIds.includes(id)) router.replace({ name: 'Transactions' });

const transaction = computed<Transaction>(() => transactionsStore.getTransactionById(id));
</script>
