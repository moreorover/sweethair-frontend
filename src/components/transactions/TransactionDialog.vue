<template>
  <BaseButton :label="props.label" @onClick="toggleModal()" class="mr-2" :size="props.buttonSize" />
  <BaseModal :header="props.header" :show-footer="false" v-model:visible="showModal" @toggle-modal="toggleModal()">
    <TransactionForm :transaction="props.transaction" @submit="submit" />
  </BaseModal>
</template>
<script setup lang="ts">
import useEntityCleaner from '@/hooks/entityCleaner';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import BaseButton from '@/components/base/BaseButton.vue';
import TransactionForm from './TransactionForm.vue';
import { Transaction } from '@/services/TransactionService';
import { useTransactionsStore } from '@/store/transactionsStore';

interface Props {
  transaction?: Transaction;
  header: string;
  label: string;
  buttonSize: string;
}

const props = withDefaults(defineProps<Props>(), {
  transaction: () => {
    return {
      id: '',
      total: 0.0,
      date: new Date().toISOString(),
      isPaid: false,
      customer: null,
      appointment: null,
    };
  },
  buttonSize: 'small',
});

const store = useTransactionsStore();
const entityCleaner = useEntityCleaner();
const { showModal, toggleModal } = useModal();

const submit = (transaction: Transaction) => {
  const cleanTransaction: Transaction = entityCleaner.clean(transaction);
  cleanTransaction.id ? store.update(cleanTransaction) : store.create(cleanTransaction);
  toggleModal();
};
</script>
