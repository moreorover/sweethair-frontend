<template>
  <table class="table is-fullwidth is-striped is-hoverable">
    <thead>
      <tr>
        <th>Start</th>
        <th>Customers</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <router-link
        v-for="appointment in appointments"
        :key="appointment.id"
        v-slot="{ navigate }"
        :to="`/appointments/${appointment.id}`"
        custom
      >
        <tr @click="navigate">
          <td>{{ format(new Date(appointment.start), 'dd MMMM yyyy') }}</td>
          <td>{{ appointment.customers?.length }}</td>
          <td class="level-right">
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
