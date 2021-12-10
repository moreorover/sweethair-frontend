<template>
  <TransactionDialog
    header="Edit Transaction"
    label="Edit"
    :customer="props.customer"
    :appointment="props.appointment"
    :transaction="props.transaction"
    class="text-link px-1"
  />

  <BaseConfirmDialog
    header="Confirm to Delete Transaction"
    label="Delete"
    @confirm="deleteTransaction"
    class="text-link px-1"
  />

  <BaseConfirmDialog
    header="Confirm to change Transaction paid status"
    :label="props.transaction.isPaid ? 'Mark Unpaid' : 'Mark Paid'"
    @confirm="changePaidStatus"
    class="text-link px-1"
  />

  <SingleCustomerPickerDialog
    v-if="!props.transaction.customer && !props.transaction.invoice"
    header="Pick Customer"
    label="Pick Customer"
    :customers="props.appointment?.customers || []"
    class="text-link px-1"
    @submit="customerSelected($event)"
  />
</template>

<script setup lang="ts">
import { Appointment } from '@/services/AppointmentService';
import { Customer } from '@/services/CustomerService';
import { Transaction } from '@/services/TransactionService';
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import SingleCustomerPickerDialog from '../customers/SingleCustomerPickerDialog.vue';

type Props = {
  transaction: Transaction;
  customer?: Customer;
  appointment?: Appointment;
};

const props = defineProps<Props>();

const transactionsStore = useTransactionsStore();

const changePaidStatus = async () => {
  await transactionsStore.update({ ...props.transaction, isPaid: !props.transaction.isPaid });
};

const deleteTransaction = async () => {
  await transactionsStore.delete(props.transaction);
};

const customerSelected = async (customer: Customer) => {
  await transactionsStore.update({ ...props.transaction, customer });
};
</script>
