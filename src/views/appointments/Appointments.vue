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
      </div>

      <AppointmentsTable :appointments="appointmentsFiltered" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppointmentDialog from '@/components/appointments/AppointmentDialog.vue';
import AppointmentCard from '@/components/appointments/AppointmentCard.vue';
import { Appointment } from '@/services/AppointmentService';
import router from '@/router';

const { data, error } = await useAppointmentsQuery();

const appointments = computed(() => appointmentsStore.getAll);

const handleCreateAppointment = async (appointment: Appointment) => {
  const savedAppointment: Appointment | void = await appointmentsStore.create(
    appointment
  );
  if (savedAppointment) router.push(`/appointments/${savedAppointment.id}`);
};
</script>
