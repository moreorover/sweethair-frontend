<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">
      {{ appointment?.title }} -
      {{ scheduledAtFormatted().value }}
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
        v-if="customersBase?.customers"
        :selection="appointment.customers || []"
        :customers="customersBase.customers"
        header="Pick customers"
        label="Pick Customers"
        class="btn btn-small"
        @submit="pickedCustomers($event)"
      />
      <TransactionDialog
        header="Book a Transaction"
        label="Book Transaction"
        class="btn btn-large"
        @submit="newTransaction($event, null)"
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
            <SingleTransactionPickerDialog
              v-if="customerSpareTransactions(customer).value.length"
              header="Pick Transaction"
              label="Pick Transaction"
              class="btn btn-small"
              :transactions="customerSpareTransactions(customer).value"
              @submit="pickedTransactionForCustomer($event)"
            />
            <BaseConfirm
              v-if="showCustomerRemoveButton(customer).value"
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
                @submit="newTransaction($event, customer)"
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
import moment from 'moment';
import AppointmentDialog from '@/components/appointments/AppointmentDialog.vue';
import MultipleCustomerPickerDialog from '@/components/customers/MultipleCustomerPickerDialog.vue';
import { Customer } from '@/services/CustomerService';
import { Transaction, TransactionType } from '@/services/TransactionService';
import { useRoute, useRouter } from 'vue-router';
import { Item } from '@/services/ItemService';
import { useAppointmentStore } from '@/store/appointmentStore';
import { Appointment } from '@/services/AppointmentService';
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';
import TransactionsTable from '@/components/transactions/TransactionsTable.vue';
import TransactionActions from '@/components/transactions/TransactionActions.vue';
import ItemsTable from '@/components/items/ItemsTable.vue';
import SingleTransactionPickerDialog from '@/components/transactions/SingleTransactionPickerDialog.vue';
import {
  useAddCustomerToAppointmentMutation,
  useAppointmentQuery,
  useCreateTransactionMutation,
  useCustomersBaseQuery,
  useRemoveCustomerToAppointmentMutation,
  useUpdateAppointmentMutation,
  useUpdateTransactionMutation,
} from '@/generated/graphql';
import { transactions } from '../customers/tests/mockData';

const route = useRoute();
const router = useRouter();
const id: number = +route.params.id;

const { data, error } = await useAppointmentQuery({
  variables: { appointmentId: id },
});

if (data.value?.appointment == null) router.replace({ name: 'Appointments' });

const appointment = computed<Appointment>(
  () => data.value?.appointment as Appointment
);

const updateAppointment = useUpdateAppointmentMutation();
const addCustomerToAppointment = useAddCustomerToAppointmentMutation();
const createTransaction = useCreateTransactionMutation();
const updateTransaction = useUpdateTransactionMutation();
const removeCustomerFromAppointment = useRemoveCustomerToAppointmentMutation();

const scheduledAtFormatted = () =>
  computed(() =>
    moment(appointment.value?.scheduledAt).format('DD MMM YYYY HH:mm')
  );

const { data: customersBase, error: customersBaseError } =
  useCustomersBaseQuery();

// const appointment = computed<Appointment>(
//   () => appointmentStore.getAppointment
// );

// const allCustomers = appointmentStore.getCustomerBase;

// const customerTransactions = (customerId: number) =>
//   computed<Transaction[]>(() =>
//     appointmentStore.getTransactions.filter(
//       (t) => t.customer?.id === customerId
//     )
//   );

const showCustomerRemoveButton = (customer: Customer) =>
  computed<Boolean>(
    () =>
      !customer.transactions?.map((t) => t.appointmentId).includes(id) || false
  );

const customerSpareTransactions = (customer: Customer) =>
  computed<Transaction[]>(() =>
    customer.transactions?.length
      ? customer.transactions.filter((t) => t.appointmentId !== id)
      : []
  );

const customerTransactions = (customerId: number) =>
  computed<Transaction[]>(() =>
    appointment.value.transactions?.length
      ? appointment.value.transactions.filter(
          (t) => t.customerId === customerId
        )
      : []
  );

// const spareTransaction = computed<Transaction[]>(
//   () => appointmentStore.getSpareCustomersTransactions
// );

const customerItems = (customerId: number) =>
  computed<Item[]>(() =>
    appointment.value.items?.length
      ? appointment.value.items.filter((t) => t.customerId === customerId)
      : []
  );

const removeCustomer = async (customer: Customer) => {
  await removeCustomerFromAppointment.executeMutation({
    appointmentId: id,
    customerId: customer.id,
  });
};

const pickedCustomers = async (customers: Customer[]) => {
  await Promise.all(
    customers.map((c) =>
      addCustomerToAppointment.executeMutation({
        appointmentId: id,
        customerId: c.id,
      })
    )
  );
};

const newTransaction = async (
  transaction: Transaction,
  customer: Customer | null
) => {
  await createTransaction.executeMutation({
    transaction: {
      ...transaction,
      invoiceId: null,
      appointmentId: id,
      customerId: customer ? customer.id : null,
    },
  });
};

const editAppointment = async (appointment: Appointment) => {
  await updateAppointment.executeMutation({
    appointment,
  });
};

const pickedTransactionForCustomer = async (transaction: Transaction) => {
  await updateTransaction.executeMutation({
    transaction: {
      id: transaction.id,
      total: transaction.total,
      isPaid: transaction.isPaid,
      scheduledAt: transaction.scheduledAt,
      type: transaction.type,
      customerId: transaction.customerId,
      invoiceId: transaction.invoiceId,
      appointmentId: id,
    },
  });
};
</script>
