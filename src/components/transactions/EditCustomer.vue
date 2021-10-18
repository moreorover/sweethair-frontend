<template>
  <modal title="Edit Transaction" action="Edit" @submit="submit">
    <transaction-form :transaction-value="transaction" />
  </modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/common/Modal.vue';
import useEntityCleaner from '@/composables/entityCleaner';
import { Transaction } from '@/services/TransactionService';
import TransactionForm from './TransactionForm.vue';
import { useTransactionsStore } from '@/store/transactionsStore';

export default defineComponent({
  name: 'EditCustomerModal',
  components: { Modal, TransactionForm },
  props: {
    transactionValue: {
      type: Object as () => Transaction,
      required: true,
    },
  },
  setup(props) {
    const store = useTransactionsStore();
    const entityCleaner = useEntityCleaner();

    const transaction: Transaction = { ...props.transactionValue };

    const submit = () => {
      const cleanTransaction: Transaction = entityCleaner.clean(transaction);
      store.update(cleanTransaction);
    };

    return { transaction, submit };
  },
});
</script>
<style scoped></style>
