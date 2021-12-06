<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">{{ appointment.title }}</h3>
    <div class="flex gap-1">
      <AppointmentDialog :appointment="appointment" header="Edit Appointment" label="Edit" class="btn btn-large" />
      <MultipleCustomerPickerDialog
        :selection="appointment.customers || []"
        :customers="allCustomers"
        header="Pick customers"
        label="Pick Customers"
        class="btn btn-small"
        @submit="pickedCustomers($event)"
      />
      <TransactionDialog
        header="Book a Transaction"
        label="Book Transaction"
        :appointment="appointment"
        class="btn btn-large"
      />
    </div>
  </div>
  <div class="flex flex-col mx-auto gap-4 pt-3">
    <div class="container flex flex-col mx-auto" v-for="customer in appointment.customers" :key="customer.id">
      <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <span class="font-bold text-md text-black ml-2">{{ customer.fullName }} {{ customer.id }}</span>
          </div>
          <div class="flex items-center">
            <SingleTransactionPickerDialog
              v-if="spareTransactions(customer).length"
              header="Pick Transaction"
              label="Pick Transaction"
              class="btn btn-small"
              :transactions="spareTransactions(customer)"
              @submit="pickedTransactions($event)"
            />
            <BaseConfirm
              v-if="customerTransactions(customer).value.length < 1"
              @confirm="removeCustomer(customer)"
              label="Remove Customer"
            />
          </div>
        </div>
        <div class="container flex flex-col mx-auto gap-4 pl-8">
          <div class="flex text-center justify-between">
            <div class="flex items-center">
              <span class="font-semibold text-md text-black">Transactions</span>
            </div>
            <div class="flex items-center">
              <TransactionDialog
                header="Book a Transaction"
                label="Book Transaction"
                :customer="customer"
                :appointment="appointment"
                class="btn btn-small"
              />
            </div>
          </div>
          <TransactionsTable
            :transactions="customerTransactions(customer).value"
            :customer="customer"
            :appointment="appointment"
          />
        </div>

        <div class="container flex flex-col mx-auto gap-4 pl-8">
          <div class="flex text-center justify-between">
            <div class="flex items-center">
              <span class="font-semibold text-md text-black">Items</span>
            </div>
            <div class="flex items-center">
              <MultipleItemPickerDialog
                :selection="[]"
                :items="allItems"
                header="Pick Items"
                label="Pick Items"
                class="btn btn-small"
                @submit="pickedItems($event, customer)"
              />
            </div>
          </div>
          <ItemsTable :items="customerItems(customer).value" />
        </div>
      </div>
    </div>

    <div class="container flex flex-col mx-auto" v-if="appointmentTransactionsNoCustomer.length > 0">
      <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <span class="font-bold text-md text-black ml-2">Spare Transactions</span>
          </div>
        </div>
        <div class="container flex flex-col mx-auto gap-4 pl-8">
          <div class="flex text-center justify-between">
            <div class="flex items-center">
              <span class="font-semibold text-md text-black">Transactions</span>
            </div>
            <div class="flex items-center">
              <TransactionDialog
                header="Book a Transaction"
                label="Book Transaction"
                :appointment="appointment"
                class="btn btn-small"
              />
            </div>
          </div>
          <TransactionsTable :transactions="appointmentTransactionsNoCustomer" :appointment="appointment" />
        </div>
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
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';
import SingleTransactionPickerDialog from '@/components/transactions/SingleTransactionPickerDialog.vue';
import { useRoute, useRouter } from 'vue-router';
import { useCustomersStore } from '@/store/customersStore';
import moment from 'moment';
import { useItemsStore } from '@/store/itemsStore';
import { Item } from '@/services/ItemService';
import ItemDialog from '@/components/items/ItemDialog.vue';
import TransactionActions from '@/components/transactions/TransactionActions.vue';
import TransactionsTable from '@/components/transactions/TransactionsTable.vue';
import ItemsTable from '@/components/items/ItemsTable.vue';
import MultipleItemPickerDialog from '@/components/items/MultipleItemPickerDialog.vue';

const route = useRoute();
const router = useRouter();
const id: number = +route.params.id;

const appointmentsStore = useAppointmentsStore();
const transactionsStore = useTransactionsStore();
const customersStore = useCustomersStore();
const itemsStore = useItemsStore();

if (appointmentsStore.shouldLoadState) await appointmentsStore.fetchAll();
if (!appointmentsStore.getIds.includes(id)) router.replace({ name: 'Appointments' });

if (transactionsStore.shouldLoadState) await transactionsStore.fetchAll();
if (customersStore.shouldLoadState) await customersStore.fetchAll();
if (itemsStore.shouldLoadState) await itemsStore.fetchAll();

const appointment = computed<Appointment>(() => appointmentsStore.getAppointmentById(id));

const appointmentTransactionsNoCustomer = computed<Transaction[]>(() =>
  transactionsStore.getTransactionsByAppointmentCustomerNull(appointment.value)
);

const allCustomers = computed<Customer[]>(() => customersStore.getAll);

const allItems = computed<Item[]>(() => itemsStore.getAvailableItems);

const spareTransactions = (customer: Customer): Transaction[] =>
  computed<Transaction[]>(() => transactionsStore.getTransactionsByCustomerAndAppointmentNull(customer)).value;

const pickedCustomers = async (customers: Customer[]) => {
  appointment.value.customers
    ? appointment.value.customers?.push(...customers)
    : (appointment.value.customers = customers);
  await appointmentsStore.update(appointment.value);
};

const pickedItems = async (items: Item[], customer: Customer) => {
  for (const item of items) {
    item.customer = customer;
    item.appointment = appointment.value;

    await itemsStore.update(item);
  }
};

const pickedTransactions = async (transaction: Transaction) => {
  await transactionsStore.update({ ...transaction, appointment: appointment.value });
};

const customerTransactions = (customer: Customer) =>
  computed<Transaction[]>(() => transactionsStore.getTransactionsByCustomerAndAppointment(customer, appointment.value));

const customerItems = (customer: Customer) =>
  computed<Item[]>(() => itemsStore.getItemsByCustomerAndAppointment(customer, appointment.value));

const removeCustomer = async (customer: Customer) => {
  await appointmentsStore.removeCustomer(appointment.value, customer);
};
</script>
