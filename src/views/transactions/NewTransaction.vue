<template>
  <h1 class="title">Create New Transaction</h1>
  <transaction-form :transaction="newTransaction" @save="save" />
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import TransactionForm from '@/components/transactions/TransactionForm.vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useTransactionsStore } from '@/store/transactionsStore';
import { Transaction } from '@/services/TransactionService';
import { useCustomersStore } from '@/store/customersStore';
import { Customer } from '@/services/CustomerService';

export default defineComponent({
  components: {
    TransactionForm,
  },
  setup() {
    const transactionsStore = useTransactionsStore();
    const customersStore = useCustomersStore();
    const selectedCustomer = computed<Customer | null>(() => customersStore.getSelectedCustomer);
    const router = useRouter();
    const newTransaction: Transaction = {
      id: '',
      total: 0,
      date: new Date().toISOString(),
      isPaid: false,
      customer: selectedCustomer.value ? selectedCustomer.value : null,
    };

    const save = async (transaction: Transaction) => {
      await transactionsStore.create(transaction);
      router.push({
        name: 'Transactions',
      });
    };

    onBeforeRouteLeave(() => {
      selectedCustomer.value && customersStore.selectCustomer(null);
    });

    return { newTransaction, save };
  },
});
</script>
