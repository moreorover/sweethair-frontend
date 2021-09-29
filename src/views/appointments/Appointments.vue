<template>
  <h1 class="title">Appointments</h1>

  <nav class="level">
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle is-5">
          <strong>{{ appointments.length }}</strong> appointments
        </p>
      </div>

      <p class="level-item">
        <router-link to="/appointments/new">
          <a class="button is-success">New</a>
        </router-link>
      </p>
      <div v-for="period in periods" :key="period" class="level-item">
        <span
          :class="{ 'is-light': activePeriod !== period }"
          class="tag is-link is-clickable"
          @click="activePeriod = period"
        >
          {{ period }}
        </span>
      </div>
    </div>
  </nav>
  <appointments-table :appointments="appointments" />
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import AppointmentsTable from '@/components/appointments/AppointmentsTable.vue';
import { isAfter, isBefore, nextSunday, addDays, startOfMonth, endOfMonth, getMonth, setMonth } from 'date-fns';

type TimePeriod = 'Today' | 'This Week' | 'Next Week' | 'This Month' | 'Next Month' | 'All';

export default defineComponent({
  name: 'Appointments',
  components: { AppointmentsTable },
  setup() {
    const periods: TimePeriod[] = ['Today', 'This Week', 'Next Week', 'This Month', 'Next Month', 'All'];
    const activePeriod = ref<TimePeriod>('All');
    const store = useAppointmentsStore();

    store.fetchAll();

    const appointments = computed(() => {
      return store.getAll.filter((appointment) => {
        const appointmentScheduledAt: Date = new Date(appointment.start);
        var curr = new Date();

        if (activePeriod.value === 'Today') {
          let firstDay = curr.setHours(0, 0, 0);
          let lastDay = curr.setHours(23, 59, 59);
          if (isAfter(appointmentScheduledAt, firstDay) && isBefore(appointmentScheduledAt, lastDay)) {
            return true;
          }
        }

        if (activePeriod.value === 'This Week') {
          let first = curr.getDate() - curr.getDay();
          let last = first + 6;

          let firstDay = new Date(curr.setDate(first));
          firstDay.setHours(0, 0, 0);
          let lastDay = new Date(curr.setDate(last));
          lastDay.setHours(23, 59, 59);
          if (isAfter(appointmentScheduledAt, firstDay) && isBefore(appointmentScheduledAt, lastDay)) {
            return true;
          }
        }
        if (activePeriod.value === 'Next Week') {
          let firstDay = nextSunday(curr);
          let lastDay = addDays(firstDay, 6);

          firstDay.setHours(0, 0, 0);
          lastDay.setHours(23, 59, 59);
          if (isAfter(appointmentScheduledAt, firstDay) && isBefore(appointmentScheduledAt, lastDay)) {
            return true;
          }
        }
        if (activePeriod.value === 'This Month') {
          if (
            isAfter(appointmentScheduledAt, startOfMonth(curr)) &&
            isBefore(appointmentScheduledAt, endOfMonth(curr))
          ) {
            return true;
          }
        }
        if (activePeriod.value === 'Next Month') {
          const nextMonth = getMonth(curr) + 1;
          if (
            isAfter(appointmentScheduledAt, startOfMonth(setMonth(curr, nextMonth))) &&
            isBefore(appointmentScheduledAt, endOfMonth(setMonth(curr, nextMonth)))
          ) {
            return true;
          }
        }
        if (activePeriod.value === 'All') {
          return true;
        }
      });
    });

    return { appointments, periods, activePeriod };
  },
});
</script>
<style scoped></style>
