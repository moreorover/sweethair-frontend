<template>
  <Button class="p-button-sm mr-2" :label="props.label" @click="toggleModal()"></Button>

  <Dialog
    v-model:visible="showModal"
    :modal="true"
    :dismissable-mask="true"
    :header="props.header"
    :style="{ width: '50vw' }"
  >
    <appointment-form :appointment="a" @submit="submit" />
  </Dialog>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import useEntityCleaner from '@/composables/entityCleaner';
import useModal from '@/composables/useModal';
import { Transaction } from '@/services/TransactionService';
import { Customer } from '@/services/CustomerService';
import { Appointment } from '@/services/AppointmentService';
import AppointmentForm from '@/components/appointments/AppointmentForm.vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';

interface Props {
  header: string;
  label: string;
  appointment?: Appointment;
  transactions?: Transaction[] | null;
  customers?: Customer[] | null;
}

const props = withDefaults(defineProps<Props>(), {
  appointment: () => {
    return {
      id: '',
      scheduledAt: new Date().toISOString(),
      title: '',
      customers: null,
      transactions: null,
    };
  },
  customers: () => {
    return null;
  },
  transactions: () => {
    return null;
  },
});

const store = useAppointmentsStore();
const entityCleaner = useEntityCleaner();
const { showModal, toggleModal } = useModal();

const a: Appointment = reactive({
  ...props.appointment,
  customers: props.customers && { ...props.customers },
  transactions: props.transactions && { ...props.transactions },
});

const submit = (data: Transaction) => {
  const cleanAppointment: Appointment = entityCleaner.clean(data);
  cleanAppointment.id ? store.update(cleanAppointment) : store.create(cleanAppointment);
  toggleModal();
};
</script>
