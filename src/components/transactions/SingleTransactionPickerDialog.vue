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
    <BasePicker>
      <template v-slot:selection>
        <div v-if="selection" class="flex flex-col border-gray-400 border-solid border-2 px-4">
          <div>Scheduled At: {{ selection?.scheduledAt }}</div>
          <div>Total: {{ selection?.total }}</div>
          <div>Is paid: {{ selection?.isPaid }}</div>
          <BaseChip @select="removeSelection" text="Remove" :show-action="false" />
        </div>
      </template>
      <template v-slot:search>
        <BaseInput v-model="search" type="text" label="Search" />
      </template>
      <template v-slot:options>
        <div class="flex flex-col border-gray-400 border-solid border-2 px-4 my-2" v-for="transaction in transactions">
          <div>Scheduled At: {{ transaction.scheduledAt }}</div>
          <div>Total: {{ transaction.total }}</div>
          <div>Is paid: {{ transaction.isPaid }}</div>
          <BaseChip @select="selection = transaction" text="Select" :show-action="false" />
        </div>
      </template>
    </BasePicker>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, ref } from 'vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import { Transaction } from '@/services/TransactionService';
import { useSinglePicker } from '@/hooks/usePicker';

interface Props {
  header: string;
  label: string;
  buttonSize: string;
  transactions: Transaction[];
}

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const transactionsStore = useTransactionsStore();
if (transactionsStore.shouldLoadState) await transactionsStore.fetchAll();

const { showModal, toggleModal } = useModal();
const { selection, removeSelection } = useSinglePicker<Transaction>();

const search = ref('');

const transactions = computed<Transaction[]>(() => props.transactions.filter((t) => t.id !== selection.value?.id));

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
