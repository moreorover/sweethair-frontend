<template>
  <h3 class="text-3xl font-medium text-gray-700">Appointments</h3>

  <div class="mt-8">
    <div class="mt-6">
      <div class="flex flex-col mt-3 lg:flex-row">
        <AppointmentDialog
          header="Create new Appointment"
          label="New"
          class="btn btn-medium"
          @submit="handleCreateAppointment($event)"
        />
      </div>
      <div class="flex justify-between">
        <div class="text-center lg:text-left text-gray-700 font-bold py-2">
          Showing {{ appointmentsFiltered.length }} out of
          {{ appointments.length }} records.
        </div>
        <WeekToolBar />
      </div>

      <AppointmentsTable :appointments="appointmentsFiltered" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppointmentDialog from '@/components/appointments/AppointmentDialog.vue';
import moment from 'moment';
import { useWeek } from '@/hooks/useWeek';
import WeekToolBar from '@/components/WeekToolBar.vue';
import {
  useAppointmentsQuery,
  useCreateAppointmentMutation,
} from '@/generated/graphql';
import { Appointment } from '@/services/AppointmentService';
import { sortBy } from 'lodash';
import AppointmentsTable from '@/components/appointments/AppointmentsTable.vue';
import router from '@/router';

const { weekNumber } = useWeek();

const { data, error } = await useAppointmentsQuery();

const appointments = computed<Appointment[]>(
  () => data.value?.appointments as Appointment[]
);

const createAppointment = useCreateAppointmentMutation();

const appointmentsFiltered = computed(() => {
  const filtered =
    data.value?.appointments.filter(
      (a) => moment(a.scheduledAt).week() == weekNumber.value
    ) || [];
  return sortBy(filtered, ['scheduledAt']);
});

const handleCreateAppointment = async (appointment: Appointment) => {
  await createAppointment
    .executeMutation({
      appointment: {
        scheduledAt: appointment.scheduledAt,
        title: appointment.title,
      },
    })
    .then((result) =>
      router.push(`/appointments/${result.data?.createAppointment.id}`)
    );
};
</script>
