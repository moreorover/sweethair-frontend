<template>
  <modal title="Edit Transaction" action="Edit" @submit="submit">
    <transaction-form :transaction-value="transaction" />
  </modal>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import Modal from '@/components/common/Modal.vue';
import TransactionForm from '@/components/transactions/TransactionForm.vue';
import { useEntityCleaner } from '@/composables/entityCleaner';
import { Transaction } from '@/services/TransactionService';

export default defineComponent({
  nane: 'EditTransaction',
  components: { TransactionForm, Modal },
  props: {
    transactionValue: {
      type: Object as () => Transaction,
      required: true,
    },
  },
  setup(props) {
    const store = useTransactionsStore();
    const entityCleaner = useEntityCleaner();

    const transaction: Transaction = reactive({ ...props.transactionValue });

    const submit = () => {
      const cleanTransaction: Transaction = entityCleaner.clean(transaction);
      store.update(cleanTransaction);
    };

    return { transaction, submit };
  },
});
</script>
<style scoped></style>
