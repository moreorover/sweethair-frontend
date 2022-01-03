<template>
  <BaseButton :label="props.label" @onClick="toggleModal()" v-bind="attrs" />
  <BaseModal
    :header="props.header"
    :show-footer="false"
    v-model:visible="showModal"
    @toggle-modal="toggleModal()"
  >
    <TransactionForm :transaction="props.transaction" @submit="submit" />
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import BaseButton from '@/components/base/BaseButton.vue';
import TransactionForm from './TransactionForm.vue';
import { Transaction, TransactionType } from '@/services/TransactionService';
import moment from 'moment';
import { useAttrs } from 'vue';

const emit = defineEmits(['submit']);

interface Props {
  transaction?: Transaction;
  header: string;
  label: string;
}

const attrs = useAttrs();
const props = withDefaults(defineProps<Props>(), {
  transaction: () => {
    return {
      id: -1,
      total: 0.0,
      scheduledAt: moment().toISOString(),
      isPaid: false,
      type: TransactionType.In,
      customerId: null,
      appointmentId: null,
      invoiceId: null,
    };
  },
});

const { showModal, toggleModal } = useModal();

const submit = async (transaction: Transaction) => {
  emit('submit', transaction);
  toggleModal();
};
</script>
