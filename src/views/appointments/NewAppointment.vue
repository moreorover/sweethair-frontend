<template>
  <section class="hero is-small is-link">
    <div class="hero-body">
      <p class="title">Create New Appointment</p>
    </div>
  </section>
  <div class="container"><appointment-form :appointment="newAppointment" @save="save" /></div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import AppointmentForm from '@/components/appointments/AppointmentForm.vue';
import { useRouter } from 'vue-router';
import { Appointment } from '@/services/AppointmentService';
import { useAppointmentsStore } from '@/store/pinia/appointmentsStore';

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
    });

    const save = async (appointment: Appointment) => {
      await store.create(appointment);
      router.push({
        name: 'Appointments',
      });
    };

    return { newAppointment, save };
  },
});
</script>
