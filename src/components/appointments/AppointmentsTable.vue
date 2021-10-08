<template>
  <table class="table is-fullwidth is-hoverable">
    <thead>
      <tr>
        <th>Scheduled At</th>
        <th>Attendees</th>
        <th>Transactions No.</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>Scheduled At</th>
        <th>Attendees</th>
        <th>Transactions No.</th>
        <th>Actions</th>
      </tr>
    </tfoot>
    <tbody>
      <tr v-for="appointment in appointments" :key="appointment.id">
        <router-link v-slot="{ navigate }" :to="`/appointments/${appointment.id}`" custom>
          <td class="has-text-weight-bold" @click="navigate()">
            {{ format(new Date(appointment.start), 'dd MMMM yyyy HH:mm') }}
          </td>
        </router-link>
        <td>
          <div v-for="customer in appointment.customers" :key="customer.id" class="level">
            <div class="level-left">
              <div class="level-item">{{ customer.firstName }} {{ customer.lastName }}</div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <transaction-modal
                  title="Book New Transaction"
                  action="New Transaction"
                  :appointment="appointment"
                  :customer="customer"
                />
              </div>
            </div>
          </div>
        </td>
        <td>{{ appointment.transactions?.length }}</td>

        <td>
          <div class="buttons">
            <appointment-modal title="Edit Appointment" action="Edit Appointment" :appointment="appointment" />
            <transaction-modal
              v-if="appointment.customers.length === 0"
              title="Book New Transaction"
              action="New Transaction"
              :appointment="appointment"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Appointment } from '@/services/AppointmentService';
import { format } from 'date-fns';
import AppointmentModal from './AppointmentModal.vue';
import TransactionModal from '@/components/transactions/TransactionModal.vue';

export default defineComponent({
  name: 'AppointmentsTable',
  components: { AppointmentModal, TransactionModal },
  props: {
    appointments: {
      type: Object as () => Appointment[],
      required: true,
    },
  },
  setup() {
    return { format };
  },
});
</script>
<style scoped></style>
