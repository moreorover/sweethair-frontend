<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">{{ appointment.title }}</h3>
    <div class="flex gap-1">
      <AppointmentDialog
        :appointment="appointment"
        header="Edit Appointment"
        label="Edit"
        class="btn btn-large"
        @submit="editAppointment($event)"
      />
      <MultipleCustomerPickerDialog
        :selection="appointmentStore.customers"
        :customers="allCustomers"
        header="Pick customers"
        label="Pick Customers"
        class="btn btn-small"
        @submit="pickedCustomers($event)"
      />
      <TransactionDialog
        header="Book a Transaction"
        label="Book Transaction"
        class="btn btn-large"
        @submit="newTransaction($event)"
      />
    </div>
  </div>
  {{ appointmentCustomers }}
  <br />
  {{ appointmentTransactions }}
</template>
<script setup lang="ts">
import { computed } from 'vue';
import AppointmentDialog from '@/components/appointments/AppointmentDialog.vue';
import MultipleCustomerPickerDialog from '@/components/customers/MultipleCustomerPickerDialog.vue';
import { Customer } from '@/services/CustomerService';
import { Transaction } from '@/services/TransactionService';
import { useRoute, useRouter } from 'vue-router';
import { Item } from '@/services/ItemService';
import { useAppointmentStore } from '@/store/appointmentStore';
import { Appointment } from '@/services/AppointmentService';
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';

const route = useRoute();
const router = useRouter();
const id: number = +route.params.id;

const appointmentStore = useAppointmentStore();

// const appointmentsStore = useAppointmentsStore();
// const transactionsStore = useTransactionsStore();
// const customersStore = useCustomersStore();
// const itemsStore = useItemsStore();

await appointmentStore.fetch(id);
await appointmentStore.fetchCustomers();
await appointmentStore.fetchItems();
await appointmentStore.fetchTransactions();
await appointmentStore.fetchAllCustomersBase();

const appointment = computed<Appointment>(
  () => appointmentStore.getAppointment
);
const appointmentCustomers = computed<Customer[]>(
  () => appointmentStore.getCustomers
);
const appointmentItems: Item[] = appointmentStore.getItems;
const appointmentTransactions = computed<Transaction[]>(
  () => appointmentStore.getTransactions
);
const allCustomers = appointmentStore.getCustomerBase;

// const appointment = computed<Appointment | null>(() => appointmentStore.getAppointment);

// if (appointmentsStore.shouldLoadState) await appointmentsStore.fetchAll();
// if (!appointmentStore.getAppointment) router.replace({ name: 'Appointments' });

// if (transactionsStore.shouldLoadState) await transactionsStore.fetchAll();
// if (customersStore.shouldLoadState) await customersStore.fetchAll();
// if (itemsStore.shouldLoadState) await itemsStore.fetchAll();

// const allCustomers: Customer[] = customersStore.getAll;

// const allItems = computed<Item[]>(() => itemsStore.getAvailableItems);

const pickedCustomers = async (customers: Customer[]) => {
  await appointmentStore.saveCustomersToAppointment(customers);
};

const newTransaction = async (transaction: Transaction) => {
  await appointmentStore.saveTransactionToAppointment(transaction, null);
};

const editAppointment = async (appointment: Appointment) => {
  await appointmentStore.updateAppointment(appointment);
};

// const pickedItems = async (items: Item[], customer: Customer) => {
//   for (const item of items) {
//     item.customer = customer;
//     item.appointment = appointment.value;

//     await itemsStore.update(item);
//   }
// };

// const pickedTransactions = async (transaction: Transaction) => {
//   await transactionsStore.update({ ...transaction, appointment: appointment.value });
// };

// const removeCustomer = async (customer: Customer) => {
//   await appointmentsStore.removeCustomer(appointment.value, customer);
// };
</script>
