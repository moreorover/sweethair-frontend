<template>
  <table class="table is-fullwidth is-striped is-hoverable">
    <thead>
      <tr>
        <th>Start</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="appointment in appointments" :key="appointment.id" @click="navigateToAppointment(appointment.id)">
        <td>{{ appointment.start }}</td>
        <td class="level-right">
          <router-link :to="`/appointments/${appointment.id}/edit`" class="button is-small is-warning">
            Edit
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Appointment } from '@/services/AppointmentService';

export default defineComponent({
  name: 'AppointmentsTable',
  props: {
    appointments: {
      type: Object as () => Appointment[],
      required: true,
    },
  },
  async setup() {
    const router = useRouter();

    const navigateToAppointment = (id: string) => {
      router.push({ name: 'Appointment', params: { id } });
    };

    return { navigateToAppointment };
  },
});
</script>
<style scoped></style>
