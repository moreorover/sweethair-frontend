<template>
  <BaseButton :label="props.label" @onClick="toggleModal" :size="props.buttonSize" />
  <BaseModal
    :header="props.header"
    :show-footer="true"
    v-model:visible="showModal"
    @toggle-modal="toggleModal"
    @cancel="cancel"
    @submit="submit"
  >
    <div class="flex flex-col lg:flex-row justify-center min-w-max gap-4">
      <div class="flex flex-col w-full lg:w-1/2">
        <p>Selection:</p>
        <TransactionCard v-if="selection" @click="removeSelection" :transaction="selection" />
      </div>
      <div class="flex flex-col w-full lg:w-1/2">
        <div>
          <BaseInput v-model="search" class="" type="text" label="Search" />
        </div>
        <div class="rounded-lg w-full">
          <p>Options:</p>
          <TransactionCard
            v-for="transaction in transactions"
            :key="transaction.id"
            :transaction="transaction"
            @click="selection = transaction"
          />
        </div>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, ref } from 'vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import { Transaction } from '@/services/TransactionService';
import TransactionCard from '@/components/transactions/TransactionCard.vue';

interface Props {
  header: string;
  label: string;
  buttonSize: string;
  customer: Customer;
}

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const store = useTransactionsStore();
store.fetchAll();
const { showModal, toggleModal } = useModal();

const search = ref('');

const transactions = computed<Transaction[]>(() =>
  store.getTransactionsByCustomerAndAppointmentNull(props.customer).filter((t) => t.id !== selection.value?.id)
);

const selection = ref<Transaction>();

const removeSelection = () => {
  selection.value = undefined;
};

const submit = () => {
  if (selection.value) {
    emit('submit', selection.value);
    selection.value = undefined;
    toggleModal();
  }
};

const cancel = () => {
  selection.value = undefined;
  toggleModal();
};
</script>
