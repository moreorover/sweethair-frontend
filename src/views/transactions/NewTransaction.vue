<template>
  <section class="hero is-small is-link">
    <div class="hero-body">
      <p class="title">Create New Customer</p>
    </div>
  </section>
  <transaction-form :transaction="newTransaction" @save="save" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TransactionForm from '@/components/transactions/TransactionForm.vue';
import { useRouter } from 'vue-router';
import { useTransactionsStore } from '@/store/transactionsStore';
import { Transaction } from '@/services/TransactionService';

export default defineComponent({
  components: {
    TransactionForm,
  },
  setup() {
    const store = useTransactionsStore();
    const router = useRouter();
    const newTransaction: Transaction = {
      id: '',
      total: 0,
      date: new Date().toISOString(),
      isPaid: false,
    };

    const save = async (transaction: Transaction) => {
      await store.create(transaction);
      router.push({
        name: 'Transactions',
      });
    };

    return { newTransaction, save };
  },
});
</script>
