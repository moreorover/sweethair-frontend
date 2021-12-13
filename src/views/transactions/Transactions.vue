<template>
  <h3 class="text-3xl font-medium text-gray-700">Transactions</h3>

  <div class="mt-8">
    <div class="mt-6">
      <div class="flex flex-col mt-3 lg:flex-row">
        <TransactionDialog
          header="Create new Transaction"
          label="New"
          class="btn btn-medium"
        />
      </div>
      <div class="text-center lg:text-left text-gray-700 font-bold py-2">
        Showing {{ transactions.length }} out of
        {{ transactionsStore.getAll.length }} records.
      </div>
      <BaseCardGrid>
        <TransactionCard
          v-for="transaction in transactions"
          :key="transaction.id"
          :transaction="transaction"
        />
      </BaseCardGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCardGrid from '@/components/base/BaseCardGrid.vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import TransactionCard from '@/components/transactions/TransactionCard.vue';
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';
import { Transaction } from '@/services/TransactionService';

const transactionsStore = useTransactionsStore();
if (transactionsStore.shouldLoadState) await transactionsStore.fetchAll();
const transactions = computed<Transaction[]>(() => transactionsStore.getAll);
</script>
