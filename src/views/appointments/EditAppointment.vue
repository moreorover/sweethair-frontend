<template>
  <h1 class="title">Edit Appointment</h1>
  <appointment-form :appointment="appointment" @save="update" />
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import AppointmentForm from '@/components/appointments/AppointmentForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { useCustomersStore } from '@/store/customersStore';
import { Appointment } from '@/services/AppointmentService';

export default defineComponent({
  components: {
    AppointmentForm,
  },
  setup() {
    const appointmentStore = useAppointmentsStore();
    const customerStore = useCustomersStore();
    const router = useRouter();
    const id = useRoute().params.id as string;

    appointmentStore.fetchAll();
    customerStore.fetchAll();

    const appointment = computed<Appointment | undefined>(() => appointmentStore.getAppointmentById(id));

    if (!appointment.value) {
      throw Error('Appointment was not found.');
    }

    const update = async (appointment: Appointment) => {
      // appointment.customers.forEach((c) => delete c.appointments);
      await appointmentStore.update(appointment);
      router.push({
        name: 'Appointments',
      });
    };

    return { appointment, update };
  },
});
</script>
