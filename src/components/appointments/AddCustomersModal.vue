<template>
  <Button class="p-button-sm mr-2" label="Select Customers" @click="toggleModal()"></Button>

  <Dialog
    v-model:visible="showModal"
    :modal="true"
    :dismissable-mask="true"
    header="Select Customers"
    :style="{ width: '50vw' }"
  >
    <add-customers-form :appointment="props.appointment" @submit="submit" />
  </Dialog>
</template>
<script setup lang="ts">
import useEntityCleaner from '@/composables/entityCleaner';
import useModal from '@/composables/useModal';
import { Appointment } from '@/services/AppointmentService';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import AddCustomersForm from '@/components/appointments/AddCustomersForm.vue';

interface Props {
  appointment: Appointment | undefined;
}

const props = defineProps<Props>();

const store = useAppointmentsStore();
const entityCleaner = useEntityCleaner();
const { showModal, toggleModal } = useModal();

const submit = (data: Appointment) => {
  const cleanAppointment: Appointment = entityCleaner.clean(data);
  cleanAppointment.id ? store.update(cleanAppointment) : store.create(cleanAppointment);
  toggleModal();
};
</script>
