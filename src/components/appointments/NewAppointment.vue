<template>
  <modal title="Create New" :action="action" @submit="submit">
    <appointment-form :appointment-value="newAppointment" />
  </modal>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import AppointmentForm from '@/components/appointments/AppointmentForm.vue';
import { Appointment } from '@/services/AppointmentService';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { useEntityCleaner } from '@/composables/entityCleaner';
import { Customer } from '@/services/CustomerService';
import { Transaction } from '@/services/TransactionService';
import Modal from '@/components/common/Modal.vue';

export default defineComponent({
  name: 'NewAppointment',
  components: {
    AppointmentForm,
    Modal,
  },
  props: {
    action: {
      type: String,
      required: false,
      default: 'New',
    },
    customers: {
      type: Object as () => Customer[],
      required: false,
      default: () => [] as Customer[],
    },
    transactions: {
      type: Object as () => Transaction[],
      required: false,
      default: () => [] as Transaction[],
    },
  },
  setup(props) {
    const appointmentsStore = useAppointmentsStore();
    const entityCleaner = useEntityCleaner();

    const newAppointment = reactive<Appointment>({
      id: '',
      scheduledAt: new Date().toISOString(),
      customers: props.customers,
      transactions: props.transactions,
    });

    const submit = () => {
      const cleanAppointment: Appointment = entityCleaner.clean(newAppointment);
      appointmentsStore.create(cleanAppointment);
      newAppointment.id = '';
      newAppointment.scheduledAt = new Date().toISOString();
      newAppointment.customers = null;
      newAppointment.transactions = null;
    };

    return { newAppointment, submit };
  },
});
</script>
