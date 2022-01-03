<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">
      {{ appointment?.title }}
    </h3>
    <div class="flex gap-1">
      <AppointmentDialog
        :appointment="appointment"
        header="Edit Appointment"
        label="Edit"
        class="btn btn-large"
        @submit="editAppointment($event)"
      />
      <MultipleCustomerPickerDialog
        :selection="appointment.customers"
        :customers="allCustomers"
        header="Pick customers"
        label="Pick Customers"
        class="btn btn-small"
        @submit="pickedCustomers($event)"
      />
    </div>
  </div>
  <div class="flex flex-col mx-auto gap-4 pt-3">
    <div
      class="container flex flex-col mx-auto"
      v-for="customer in appointment.customers"
      :key="customer.id"
    >
      <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <span class="font-bold text-md text-black ml-2"
              >{{ customer.id }} | {{ customer.fullName }}</span
            >
          </div>
          <div class="flex items-center">
            <BaseConfirm
              v-if="!customerTransactions(customer.id).value.length"
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
                class="btn btn-small"
                @submit="newTransaction($event, customer.id)"
              />
            </div>
          </div>
          <TransactionsTable
            :transactions="customerTransactions(customer.id).value"
          >
            <template v-slot:actions="slotProps">
              <TransactionActions
                :transaction="slotProps.transaction"
                :customer="customer"
                :appointment="appointment"
              />
            </template>
          </TransactionsTable>
        </div>
        <div class="container flex flex-col mx-auto gap-4 pl-8">
          <div class="flex text-center justify-between">
            <div class="flex items-center">
              <span class="font-semibold text-md text-black">Items</span>
            </div>
            <div class="flex items-center">
              <!-- <MultipleItemPickerDialog
                :selection="[]"
                :items="allItems"
                header="Pick Items"
                label="Pick Items"
                class="btn btn-small"
                @submit="pickedItems($event, customer)"
              /> -->
            </div>
          </div>
          <ItemsTable :items="customerItems(customer.id).value" />
        </div>
      </div>
    </div>
  </div>
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
import TransactionsTable from '@/components/transactions/TransactionsTable.vue';
import TransactionActions from '@/components/transactions/TransactionActions.vue';
import ItemsTable from '@/components/items/ItemsTable.vue';

const route = useRoute();
const router = useRouter();
const id: number = +route.params.id;

const appointmentStore = useAppointmentStore();

await appointmentStore.fetch(id);
if (!appointmentStore.getAppointment) router.replace({ name: 'Appointments' });
appointmentStore.fetchAllCustomersBase();

const appointment = computed<Appointment>(
  () => appointmentStore.getAppointment
);

const allCustomers = computed<Partial<Customer>[]>(
  () => appointmentStore.getCustomerBase
);

const customerTransactions = (customerId: number) =>
  computed<Transaction[]>(
    () =>
      appointment.value.transactions?.filter(
        (t) => t.customerId === customerId
      ) || []
  );

const customerItems = (customerId: number) =>
  computed<Item[]>(
    () =>
      appointment.value.items?.filter((i) => i.customerId === customerId) || []
  );

const pickedCustomers = async (customers: Customer[]) => {
  await appointmentStore.saveCustomersToAppointment(customers);
};

const newTransaction = async (transaction: Transaction, customerId: number) => {
  await appointmentStore.saveTransactionToAppointment(customerId, transaction);
};

const editAppointment = async (appointment: Appointment) => {
  await appointmentStore.updateAppointment(appointment);
};

const removeCustomer = async (customer: Customer) => {
  await appointmentStore.removeCustomerFromAppointment(customer);
};
</script>
