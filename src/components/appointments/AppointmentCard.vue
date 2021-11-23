<template>
  <div
    class="
      flex flex-col
      justify-between
      p-4
      leading-normal
      bg-white
      border-b border-l border-r border-gray-200
      rounded-b
      lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r
      my-2
    "
  >
    <p class="flex items-center text-sm text-gray-600">
      {{ format(new Date(appointment.scheduledAt), 'd MMMM yyyy - HH:mm') }}
    </p>
    <div class="mb-2 text-xl font-bold text-gray-900">{{ appointment.title }}</div>

    <div class="flex justify-center">
      <div class="rounded-lg w-full">
        <ul class="divide-y divide-gray-300">
          <li v-for="customer in appointment.customers">{{ customer.fullName }}</li>
        </ul>
      </div>
    </div>
    <div class="flex gap-1 justify-items-end pt-2">
      <RouterLink :to="{ name: `Appointment`, params: { id: appointment.id } }" class="btn-small"> Show </RouterLink>
      <AppointmentDialog :appointment="appointment" header="Edit Appointment" label="Edit" buttonSize="small" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Appointment } from '@/services/AppointmentService';
import AppointmentDialog from './AppointmentDialog.vue';
import { format } from 'date-fns';

interface Props {
  appointment: Appointment;
}

const props = defineProps<Props>();
</script>
