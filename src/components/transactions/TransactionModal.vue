<template>
  <Button class="p-button-sm mr-2" :label="props.label" @click="toggleModal()"></Button>

  <Dialog
    v-model:visible="showModal"
    :modal="true"
    :dismissable-mask="true"
    :header="props.header"
    :style="{ width: '50vw' }"
  >
    <transaction-form :transaction="t" @submit="submit" />
  </Dialog>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import TransactionForm from '@/components/transactions/TransactionForm.vue';
import useEntityCleaner from '@/composables/entityCleaner';
import useModal from '@/composables/useModal';
import { Transaction } from '@/services/TransactionService';
import { useTransactionsStore } from '@/store/transactionsStore';
import { Customer } from '@/services/CustomerService';
import { Appointment } from '@/services/AppointmentService';

interface Props {
  header: string;
  label: string;
  transaction?: Transaction;
  customer?: Customer | null;
  appointment?: Appointment | null;
}

const props = withDefaults(defineProps<Props>(), {
  transaction: () => {
    return {
      id: '',
      total: 0,
      date: new Date().toISOString(),
      isPaid: false,
      customer: null,
      appointment: null,
    };
  },
  customer: () => {
    return null;
  },
  appointment: () => {
    return null;
  },
});

const store = useTransactionsStore();
const entityCleaner = useEntityCleaner();
const { showModal, toggleModal } = useModal();

const t: Transaction = reactive({
  ...props.transaction,
  customer: props.customer && { ...props.customer },
  appointment: props.appointment && { ...props.appointment },
});

const submit = (data: Transaction) => {
  const cleanTransaction: Transaction = entityCleaner.clean(data);
  cleanTransaction.id ? store.update(cleanTransaction) : store.create(cleanTransaction);
  toggleModal();
};
</script>
