<template>
  <modal title="Edit Appointment" action="Edit" @submit="submit">
    <appointment-form :appointment-value="appointment" />
  </modal>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import AppointmentForm from '@/components/appointments/AppointmentForm.vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { Appointment } from '@/services/AppointmentService';
import Modal from '@/components/common/Modal.vue';
import { useEntityCleaner } from '@/composables/entityCleaner';

export default defineComponent({
  components: {
    AppointmentForm,
    Modal,
  },
  props: {
    appointmentValue: {
      type: Object as () => Appointment,
      required: true,
    },
  },
  setup(props) {
    const appointmentStore = useAppointmentsStore();
    const entityCleaner = useEntityCleaner();

    const appointment: Appointment = reactive({ ...props.appointmentValue });

    const submit = () => {
      const cleanAppointment: Appointment = entityCleaner.clean(appointment);
      appointmentStore.update(cleanAppointment);
    };

    return { appointment, submit };
  },
});
</script>
