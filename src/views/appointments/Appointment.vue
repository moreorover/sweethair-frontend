<template>
  <h1 class="title block">Appointment</h1>

  <nav class="level">
    <div class="level-left">
      <div class="level-item">
        <h1 class="subtitle block">
          {{ appointment?.start && format(new Date(appointment?.start), 'dd MMMM yyyy HH:mm') }}
        </h1>
      </div>
      <div class="level-item">
        <appointment-modal title="Edit Appointment" action="Edit" :appointment="appointment" />
      </div>
    </div>
  </nav>
  <!-- <customers-table :customers="customers" /> -->
  <div class="columns is-multiline content">
    <div v-for="customer in customers" :key="customer.id" class="column is-full">
      <div class="box">
        <h1 class="title">{{ customer.firstName }} {{ customer.lastName }}</h1>
        <div class="columns is-multiline">
          <div class="column is-one-fifth">
            <div>Transactions</div>
            <div>
              <transaction-modal
                title="Book New Transaction"
                action="New Transaction"
                :appointment="appointment"
                :customer="customer"
              />
            </div>
          </div>
          <div class="column content">
            <div
              v-for="transaction in transactions"
              :key="transaction.id"
              class="columns"
              :class="{
                'has-background-success-light': transaction.isPaid,
                'has-background-danger-light': !transaction.isPaid,
              }"
            >
              <div v-if="transaction.customer?.id === customer.id" class="column">
                {{ transaction.date }}
              </div>
              <div v-if="transaction.customer?.id === customer.id" class="column">{{ transaction.total }}</div>
              <div class="column">
                <transaction-modal title="Edit Transaction" action="Edit Transaction" :transaction="transaction" />
              </div>
              <div class="column">
                <transaction-modal title="Delete Transaction" action="Delete" :transaction="transaction" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { format } from 'date-fns';
import { useCustomersStore } from '@/store/customersStore';
import AppointmentModal from '@/components/appointments/AppointmentModal.vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import TransactionModal from '@/components/transactions/TransactionModal.vue';

export default defineComponent({
  components: { AppointmentModal, TransactionModal },
  setup() {
    const appointmentsStore = useAppointmentsStore();
    const customersStore = useCustomersStore();
    const transactionsStore = useTransactionsStore();
    const id = useRoute().params.id as string;

    appointmentsStore.fetchAll();
    customersStore.fetchAll();
    transactionsStore.fetchAll();

    const appointment = computed(() => appointmentsStore.getAppointmentById(id));
    const customers = computed(() => customersStore.getCustomersByAppointment(appointment.value));
    const transactions = computed(() => transactionsStore.getTransactionsByAppointment(appointment.value));

    if (!appointment.value) {
      throw Error('Appointment was not found.');
    }

    return { appointment, format, customers, transactions };
  },
});
</script>
