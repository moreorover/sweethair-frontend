<template>
  <BaseButton :label="props.label" @onClick="toggleModal()" class="mr-2" :size="props.buttonSize" />
  <BaseModal :header="props.header" :show-footer="false" v-model:visible="showModal" @toggle-modal="toggleModal()">
    <AppointmentForm :appointment="props.appointment" @submit="submit" />
  </BaseModal>
</template>
<script setup lang="ts">
import useEntityCleaner from '@/hooks/entityCleaner';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import BaseButton from '@/components/base/BaseButton.vue';
import { Appointment } from '@/services/AppointmentService';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import AppointmentForm from './AppointmentForm.vue';

interface Props {
  appointment?: Appointment;
  header: string;
  label: string;
  buttonSize: string;
}

const props = withDefaults(defineProps<Props>(), {
  appointment: () => {
    return {
      id: '',
      title: '',
      scheduledAt: new Date().toISOString(),
      customers: null,
      transactions: null,
    };
  },
  buttonSize: 'small',
});

const store = useAppointmentsStore();
const entityCleaner = useEntityCleaner();
const { showModal, toggleModal } = useModal();

const submit = async (appointment: Appointment) => {
  const cleanAppointment: Appointment = entityCleaner.clean(appointment, true);
  cleanAppointment.id ? await store.update(cleanAppointment) : await store.create(cleanAppointment);
  toggleModal();
};
</script>
