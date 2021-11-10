<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">{{ appointment?.title }}</h3>
    <AppointmentDialog :appointment="appointment" header="Edit Appointment" label="Edit" buttonSize="large" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { Appointment } from '@/services/AppointmentService';
import AppointmentDialog from '@/components/appointments/AppointmentDialog.vue';

type Props = {
  id: string;
};

const props = defineProps<Props>();

const appointmentsStore = useAppointmentsStore();

const all = appointmentsStore.all;

const appointment = computed<Appointment | undefined>(() => all.find((a) => a.id === props.id));
</script>
