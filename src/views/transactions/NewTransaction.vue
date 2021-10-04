<template>
  <h1 class="title">Create New Transaction</h1>
  <transaction-form :transaction-value="newTransaction" />
  <section class="section">
    <h1 class="title">New Transaction</h1>
    {{ newTransaction }}
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import TransactionForm from '@/components/transactions/TransactionForm.vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import { Transaction } from '@/services/TransactionService';

export default defineComponent({
  components: {
    TransactionForm,
  },
  setup() {
    const transactionsStore = useTransactionsStore();
    const newTransaction = reactive<Transaction>({
      id: '',
      total: 0,
      date: new Date().toISOString(),
      isPaid: false,
      customer: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        instagram: '',
      },
    });

    const submit = () => {
      // const t: Transaction = transactionModal.cleanTransaction(newTransaction);
      if (!newTransaction.id) {
        transactionsStore.create(newTransaction);
      } else {
        transactionsStore.update(newTransaction);
      }
      // show.value = false;
    };

    return { newTransaction, submit };
  },
});
</script>
