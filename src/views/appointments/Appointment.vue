<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">{{ appointment.title }}</h3>
    <div class="flex gap-1">
      <AppointmentDialog :appointment="appointment" header="Edit Appointment" label="Edit" buttonSize="large" />
      <MultipleCustomerPickerDialog
        :selection="appointment.customers || []"
        :customers="allCustomers"
        header="Pick customers"
        label="Pick Customers"
        buttonSize="medium"
        @submit="pickedCustomers($event)"
      />
      <TransactionDialog header="Book a Transaction" label="Book Transaction" :appointment="appointment" />
    </div>
  </div>
  <div class="flex flex-col mx-auto gap-8 pt-3">
    <div class="container border-2 border-gray-400 p-2" v-for="customer in appointment.customers" :key="customer.id">
      <div class="flex justify-between">
        <h4 class="text-1xl font-semibold text-indigo-600">{{ customer.fullName }}</h4>
        <div class="flex gap-1">
          <SingleTransactionPickerDialog
            v-if="spareTransactions(customer).length"
            header="Pick Transaction"
            label="Pick Transaction"
            buttonSize="small"
            :transactions="spareTransactions(customer)"
            @submit="pickedTransactions($event)"
          />
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
        <TransactionCard :transaction="transaction" />
      </div>
    </div>
  </div>

  <BaseCardGrid>
    <TransactionCard
      v-for="transaction in appointmentTransactionsNoCustomer"
      :key="transaction.id"
      :transaction="transaction"
    />
  </BaseCardGrid>
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
import SingleTransactionPickerDialog from '@/components/transactions/SingleTransactionPickerDialog.vue';
import { useRoute, useRouter } from 'vue-router';
import { useCustomersStore } from '@/store/customersStore';

const route = useRoute();
const router = useRouter();
const id: string = route.params.id instanceof Array ? route.params.id[0] : route.params.id;

const appointmentsStore = useAppointmentsStore();
const transactionsStore = useTransactionsStore();
const customersStore = useCustomersStore();

if (appointmentsStore.shouldLoadState) await appointmentsStore.fetchAll();
if (!appointmentsStore.getIds.includes(id)) router.replace({ name: 'Appointments' });

if (transactionsStore.shouldLoadState) await transactionsStore.fetchAll();
if (customersStore.shouldLoadState) await customersStore.fetchAll();

const appointment = computed<Appointment>(() => appointmentsStore.getAppointmentById(id));

const appointmentTransactionsNoCustomer = computed<Transaction[]>(() =>
  transactionsStore.getTransactionsByAppointmentCustomerNull(appointment.value)
);

const allCustomers = computed<Customer[]>(() => customersStore.getAll);

const spareTransactions = (customer: Customer): Transaction[] =>
  computed<Transaction[]>(() => transactionsStore.getTransactionsByCustomerAndAppointmentNull(customer)).value;

const pickedCustomers = async (customers: Customer[]) => {
  appointment.value.customers
    ? appointment.value.customers?.push(...customers)
    : (appointment.value.customers = customers);
  await appointmentsStore.update(appointment.value);
};

const pickedTransactions = async (transaction: Transaction) => {
  await transactionsStore.update({ ...transaction, appointment: appointment.value });
};

const customerTransactions = (customer: Customer) =>
  computed<Transaction[]>(() => transactionsStore.getTransactionsByCustomerAndAppointment(customer, appointment.value));

const removeCustomer = async (customer: Customer) => {
  await appointmentsStore.removeCustomer(appointment.value, customer);
};
</script>
