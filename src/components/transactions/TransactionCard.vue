<template>
  <div
    class="
      flex flex-col
      justify-between
      p-4
      leading-normal
      bg-white
      border-b border-l border-r border-gray-200
      rounded-b
      lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r
      my-2
    "
  >
    <p class="flex items-center text-sm text-gray-600">
      {{ format(new Date(transaction.date), 'd MMMM yyyy') }}
    </p>
    <span
      class="text-xs mx-auto px-2 font-medium text-white rounded-full py-0.5"
      :class="{ 'bg-indigo-500': transaction.isPaid, 'bg-pink-500': !transaction.isPaid }"
    >
      {{ transaction.isPaid ? 'Paid' : 'Awaiting' }}
    </span>
    <div class="flex">
      <div class="flex-grow max-h-full mx-6 m-auto">
        <div class="h-1" :class="{ 'bg-red-700': transaction.total < 0, 'bg-green-700': transaction.total > 0 }"></div>
      </div>
      <div class="flex flex-none text-xl font-bold text-gray-900 px-6">{{ transaction.total }}</div>
      <div class="flex-grow max-h-full mx-6 m-auto">
        <div class="h-1" :class="{ 'bg-red-700': transaction.total < 0, 'bg-green-700': transaction.total > 0 }"></div>
      </div>
    </div>
    <div class="flex gap-1 justify-items-end pt-2">
      <router-link v-slot="{ navigate }" :to="{ name: `Transaction`, params: { id: transaction.id } }" custom>
        <BaseButton @onClick="navigate" label="Show" />
      </router-link>
      <TransactionDialog :transaction="transaction" header="Edit Transaction" label="Edit" buttonSize="small" />
      <BaseConfirm @delete="deleteTransaction" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Transaction } from '@/services/TransactionService';
import { format } from 'date-fns';
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';
import { useTransactionsStore } from '@/store/transactionsStore';

interface Props {
  transaction: Transaction;
}

const props = defineProps<Props>();

const transactionsStore = useTransactionsStore();

const deleteTransaction = () => {
  transactionsStore.delete(props.transaction);
};
</script>
