<template>
  <h1 class="title">Create New Appointment</h1>
  <appointment-form :appointment="newAppointment" @save="save" />
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import AppointmentForm from '@/components/appointments/AppointmentForm.vue';
import { useRouter } from 'vue-router';
import { Appointment } from '@/services/AppointmentService';
import { useAppointmentsStore } from '@/store/appointmentsStore';

export default defineComponent({
  components: {
    AppointmentForm,
  },
  setup() {
    const store = useAppointmentsStore();
    const router = useRouter();
    const newAppointment: Appointment = reactive({
      id: '',
      start: new Date().toISOString(),
      customers: [],
      transactions: [],
    });

    const save = async (appointment: Appointment) => {
      await store.create(appointment);
      const newAppointment = computed<Appointment>(() => store.newAppointment);
      router.push({
        name: 'Appointment',
        params: { id: newAppointment.value.id },
      });
    };

    return { newAppointment, save };
  },
});
</script>
