<template>
  <modal title="Add Customers" action="+ Customers" @submit="submit">
    <multiple-customer-picker v-model:selection-value="appointment.customers" :filter-by-selection="true" />
  </modal>
</template>
<script lang="ts">
import { defineComponent, ref, onBeforeUpdate } from 'vue';
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

    const appointment = ref<Appointment>({ ...props.appointmentValue });

    const submit = () => {
      const cleanAppointment: Appointment = entityCleaner.clean(appointment.value);
      appointmentStore.update(cleanAppointment);
    };

    onBeforeUpdate(() => {
      appointment.value = { ...props.appointmentValue };
    });

    return { appointment, submit };
  },
});
</script>
