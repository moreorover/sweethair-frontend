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
      <router-link
        v-for="appointment in appointments"
        :key="appointment.id"
        v-slot="{ navigate }"
        :to="`/appointments/${appointment.id}`"
        custom
      >
        <tr @click="navigate">
          <td class="has-text-weight-bold">{{ format(new Date(appointment.start), 'dd MMMM yyyy HH:mm') }}</td>
          <td>
            <p v-for="customer in appointment.customers" :key="customer.id">
              {{ customer.firstName }} {{ customer.lastName }}
            </p>
          </td>
          <td>{{ appointment.transactions.length }}</td>
          <td>
            <router-link :to="`/appointments/${appointment.id}/edit`" class="button is-small is-warning">
              Edit
            </router-link>
          </td>
        </tr>
      </router-link>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Appointment } from '@/services/AppointmentService';
import { format } from 'date-fns';

export default defineComponent({
  name: 'AppointmentsTable',
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
