<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">{{ appointment?.title }}</h3>
    <AppointmentDialog :appointment="appointment" header="Edit Appointment" label="Edit" buttonSize="large" />
    <MultipleCustomerPickerDialog
      :preSelection="appointment?.customers"
      header="Pick customers"
      label="Pick Customers"
      buttonSize="medium"
      @submit="pickedCustomers($event)"
    />
  </div>
  <div class="flex flex-col mx-auto gap-8 pt-3">
    <div class="container border-2 border-gray-400 p-2" v-for="customer in appointment?.customers" :key="customer.id">
      <div class="flex justify-between">
        <h4 class="text-1xl font-semibold text-indigo-600">{{ customer.fullName }}</h4>
        <div class="flex gap-1">
          <BaseConfirm v-if="customerTransactions(customer).value.length < 1" @delete="removeCustomer(customer)" />
          <TransactionDialog
            header="Book a Transaction"
            label="Book Transaction"
            :customer="customer"
            :appointment="appointment"
          />
        </div>
      </div>

      <div
        v-if="customerTransactions(customer).value.length > 0"
        v-for="transaction in customerTransactions(customer).value"
      >
        <!-- {{ transaction }} -->
        <TransactionCard :transaction="transaction" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { Appointment } from '@/services/AppointmentService';
import AppointmentDialog from '@/components/appointments/AppointmentDialog.vue';
import MultipleCustomerPickerDialog from '@/components/customers/MultipleCustomerPickerDialog.vue';
import { Customer } from '@/services/CustomerService';
import { useTransactionsStore } from '@/store/transactionsStore';
import { Transaction } from '@/services/TransactionService';
import TransactionCard from '@/components/transactions/TransactionCard.vue';
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';

type Props = {
  id: string;
};

const props = defineProps<Props>();

const appointmentsStore = useAppointmentsStore();
const transactionsStore = useTransactionsStore();

transactionsStore.fetchAll();

const all = appointmentsStore.all;

const appointment = computed<Appointment | undefined>(() => all.find((a) => a.id === props.id));

const transactions = computed<Transaction[]>(() => transactionsStore.getTransactionsByAppointment(appointment.value));

const pickedCustomers = (customers: Customer[]) => {
  if (appointment.value && customers.length > 0) {
    appointment.value?.customers?.push(...customers);
    appointmentsStore.update(appointment.value);
  }
};

const customerTransactions = (customer: Customer) =>
  computed<Transaction[]>(() => transactionsStore.getTransactionsByCustomerAndAppointment(customer, appointment.value));

const removeCustomer = (customer: Customer) => {
  appointmentsStore.removeCustomer(appointment.value, customer);
};
</script>
