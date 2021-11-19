<template>
  <BaseButton :label="props.label" @onClick="toggleModal()" :size="props.buttonSize" />
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
import { Customer } from '@/services/CustomerService';
import { Appointment } from '@/services/AppointmentService';

interface Props {
  transaction?: Transaction;
  header: string;
  label: string;
  buttonSize?: string;
  customer?: Customer;
  appointment?: Appointment;
}

const props = withDefaults(defineProps<Props>(), {
  transaction: () => {
    return {
      id: '',
      total: 0.0,
      date: new Date().toISOString(),
      isPaid: false,
    };
  },
  buttonSize: 'small',
  customer: undefined,
  appointment: undefined,
});

const transactionsStore = useTransactionsStore();
const entityCleaner = useEntityCleaner();
const { showModal, toggleModal } = useModal();

const submit = async (transaction: Transaction) => {
  const cleanTransaction: Transaction = entityCleaner.clean(
    {
      ...transaction,
      customer: props.customer || null,
      appointment: props.appointment || null,
    },
    true
  );
  cleanTransaction.id
    ? await transactionsStore.update(cleanTransaction)
    : await transactionsStore.create(cleanTransaction);
  toggleModal();
};
</script>
