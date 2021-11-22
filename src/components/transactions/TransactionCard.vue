<template>
  <div
    class="
      flex flex-col
      justify-between
      p-4
      leading-normal
      bg-white
      border-b border-l border-r border-gray-200
      rounded-b
      lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r
      my-2
    "
  >
    <p class="flex items-center text-sm text-gray-600">
      {{ format(new Date(transaction.date), 'd MMMM yyyy') }}
    </p>
    <span
      class="text-xs mx-auto px-2 font-medium text-white rounded-full py-0.5"
      :class="{ 'bg-indigo-500': transaction.isPaid, 'bg-pink-500': !transaction.isPaid }"
    >
      {{ transaction.isPaid ? 'Paid' : 'Awaiting' }}
    </span>
    <div class="flex">
      <div class="flex-grow max-h-full mx-6 m-auto">
        <div class="h-1" :class="{ 'bg-red-700': transaction.total < 0, 'bg-green-700': transaction.total > 0 }"></div>
      </div>
      <div class="flex flex-none text-xl font-bold text-gray-900 px-6">{{ transaction.total }}</div>
      <div class="flex-grow max-h-full mx-6 m-auto">
        <div class="h-1" :class="{ 'bg-red-700': transaction.total < 0, 'bg-green-700': transaction.total > 0 }"></div>
      </div>
    </div>
    <div class="flex gap-1 justify-items-end pt-2">
      <RouterLink
        :to="{ name: `Transaction`, params: { id: transaction.id } }"
        class="
          tracking-wide
          text-white
          capitalize
          transition-colors
          duration-200
          transform
          bg-indigo-600
          rounded-md
          hover:bg-indigo-500
          focus:outline-none focus:bg-indigo-500
          px-2
          py-0
          font-normal
        "
      >
        Show
      </RouterLink>
      <TransactionDialog :transaction="transaction" header="Edit Transaction" label="Edit" buttonSize="small" />
      <BaseConfirm @delete="deleteTransaction" />
      <SingleCustomerPickerDialog
        v-if="!transaction.customer"
        header="Pick Customer"
        label="Pick Customer"
        buttonSize="small"
        :customersToPick="customersToPick"
        @submit="customerPicked($event)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Transaction } from '@/services/TransactionService';
import { format } from 'date-fns';
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import { useCustomersStore } from '@/store/customersStore';
import { computed } from 'vue';
import SingleCustomerPickerDialog from '@/components/customers/SingleCustomerPickerDialog.vue';
import { Customer } from '@/services/CustomerService';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { Appointment } from '@/services/AppointmentService';

interface Props {
  transaction: Transaction;
}

const props = defineProps<Props>();

const appointmentsStore = useAppointmentsStore();
const transactionsStore = useTransactionsStore();
const customersStore = useCustomersStore();

const appointment = computed<Appointment>(() =>
  appointmentsStore.getAppointmentById(props.transaction.appointment?.id || '')
);

const customersToPick = computed<Customer[]>(() =>
  !props.transaction.customer && appointment.value ? customersStore.getCustomersByAppointment(appointment.value) : []
);

const customerPicked = async (customer: Customer) => {
  await transactionsStore.update({ ...props.transaction, customer });
};

const deleteTransaction = async () => {
  await transactionsStore.delete(props.transaction);
};
</script>
