<template>
  <h3 class="text-3xl font-medium text-gray-700">Appointments</h3>

  <div class="mt-8">
    <div class="mt-6">
      <div class="flex flex-col mt-3 lg:flex-row">
        <AppointmentDialog header="Create new Appoingment" label="New" buttonSize="medium" />
      </div>
      <div class="text-center lg:text-left text-gray-700 font-bold py-2">
        Showing {{ appointments.length }} out of {{ appointmentsStore.getAll.length }} records.
      </div>
      <BaseCardGrid>
        <AppointmentCard v-for="appointment in appointments" :key="appointment.id" :appointment="appointment" />
      </BaseCardGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCardGrid from '@/components/base/BaseCardGrid.vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import AppointmentDialog from '@/components/appointments/AppointmentDialog.vue';
import AppointmentCard from '@/components/appointments/AppointmentCard.vue';

const appointmentsStore = useAppointmentsStore();
if (appointmentsStore.shouldLoadState) await appointmentsStore.fetchAll();

const appointments = computed(() => appointmentsStore.getAll);
</script>
