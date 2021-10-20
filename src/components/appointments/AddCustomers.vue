<template>
  <modal title="Add Customers" action="+ Customers" @submit="submit">
    <multiple-customer-picker v-model:selection-value="appointment.customers" :filter-by-selection="true" />
  </modal>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { Appointment } from '@/services/AppointmentService';
import Modal from '@/components/common/Modal.vue';
import { useEntityCleaner } from '@/composables/entityCleaner';
import MultipleCustomerPicker from '../customers/MultipleCustomerPicker.vue';

export default defineComponent({
  components: {
    Modal,
    MultipleCustomerPicker,
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
