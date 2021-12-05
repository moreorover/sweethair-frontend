<template>
  <TransactionDialog
    header="Edit Transaction"
    label="Edit"
    :customer="props.customer"
    :appointment="props.appointment"
    :transaction="props.transaction"
    class="text-link px-1"
  />
  |

  <BaseButton label="Delete" @onClick="toggleDeleteModal()" class="text-link px-1" /> |
  <BaseModal
    header="Confirm to Delete Transaction"
    :show-footer="true"
    v-model:visible="showDeleteModal"
    @submit="deleteTransaction"
    @toggle-modal="toggleDeleteModal()"
    @cancel="toggleDeleteModal()"
  >
  </BaseModal>

  <BaseButton
    :label="props.transaction.isPaid ? 'Mark Unpaid' : 'Mark Paid'"
    @onClick="togglePriceModal()"
    class="text-link px-1"
  />
  <BaseModal
    header="Confirm to change Transaction Status"
    :show-footer="true"
    v-model:visible="showPriceModal"
    @submit="changePaidStatus"
    @toggle-modal="togglePriceModal()"
    @cancel="togglePriceModal()"
  >
  </BaseModal>
</template>

<script setup lang="ts">
import { Appointment } from '@/services/AppointmentService';
import { Customer } from '@/services/CustomerService';
import { Transaction } from '@/services/TransactionService';
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import useModal from '@/hooks/useModal';

type Props = {
  transaction: Transaction;
  customer?: Customer;
  appointment?: Appointment;
};

const props = defineProps<Props>();

const transactionsStore = useTransactionsStore();

const { showModal: showDeleteModal, toggleModal: toggleDeleteModal } = useModal();
const { showModal: showPriceModal, toggleModal: togglePriceModal } = useModal();

const changePaidStatus = async () => {
  togglePriceModal();
  await transactionsStore.update({ ...props.transaction, isPaid: !props.transaction.isPaid });
};

const deleteTransaction = async () => {
  toggleDeleteModal();
  await transactionsStore.delete(props.transaction);
};
</script>
