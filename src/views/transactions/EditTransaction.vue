<template>
  <section class="hero is-small is-link">
    <div class="hero-body">
      <p class="title">Edit Transaction</p>
    </div>
  </section>
  <transaction-form :transaction="transaction" @save="update" />
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import TransactionForm from '@/components/transactions/TransactionForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useTransactionsStore } from '@/store/transactionsStore';
import { Transaction } from '@/services/TransactionService';

export default defineComponent({
  components: {
    TransactionForm,
  },
  setup() {
    const store = useTransactionsStore();
    const router = useRouter();
    const id = useRoute().params.id as string;

    store.fetchAll();

    const transaction = computed(() => store.getTransactionById(id));

    if (!transaction.value) {
      throw Error('Transaction was not found.');
    }

    const update = async (transaction: Transaction) => {
      await store.update(transaction);
      router.push({
        name: 'Transactions',
      });
    };

    return { transaction, update };
  },
});
</script>
