<template>
  <BaseButton :label="props.label" @onClick="toggleModal()" v-bind="attrs" />
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
import moment from 'moment';
import { useAttrs } from 'vue';

interface Props {
  transaction?: Transaction;
  header: string;
  label: string;
  customer?: Customer;
  appointment?: Appointment;
}

const attrs = useAttrs();
const props = withDefaults(defineProps<Props>(), {
  transaction: () => {
    return {
      id: -1,
      total: 0.0,
      scheduledAt: moment().toISOString(),
      isPaid: false,
    };
  },
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
