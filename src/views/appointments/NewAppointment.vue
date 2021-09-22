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
import { useStore } from '@/store/index';
import { Appointment } from '@/services/AppointmentService';

export default defineComponent({
  components: {
    AppointmentForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const newAppointment: Appointment = reactive({
      id: '',
      start: '',
      customers: [],
    });

    const save = async (appointment: Appointment) => {
      await store.getAppointments().create(appointment);
      router.push({
        name: 'Appointments',
      });
    };

    return { newAppointment, save };
  },
});
</script>
