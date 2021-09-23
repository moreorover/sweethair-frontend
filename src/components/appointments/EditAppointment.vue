<template>
  <section class="hero is-small is-link">
    <div class="hero-body">
      <p class="title">Edit Appointment</p>
    </div>
  </section>
  <appointment-form :appointment="appointment" @save="update" />
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import AppointmentForm from '@/components/appointments/AppointmentForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store/index';
import { Appointment } from '@/services/AppointmentService';

export default defineComponent({
  components: {
    AppointmentForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const id = useRoute().params.id as string;

    store.getCustomers().fetchAll();
    store.getAppointments().fetchAll();

    const appointment = computed<Appointment | undefined>(() => store.getAppointments().getState().all.get(id));

    if (!appointment.value) {
      throw Error('Appointment was not found.');
    }

    const update = async (appointment: Appointment) => {
      // appointment.customers.forEach((c) => delete c.appointments);
      await store.getAppointments().update(appointment);
      router.push({
        name: 'Appointments',
      });
    };

    return { appointment, update };
  },
});
</script>
