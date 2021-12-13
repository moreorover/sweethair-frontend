<template>
  <BaseButton :label="props.label" @onClick="toggleModal()" v-bind="attrs" />
  <BaseModal
    :header="props.header"
    :show-footer="false"
    v-model:visible="showModal"
    @toggle-modal="toggleModal()"
  >
    <AppointmentForm :appointment="props.appointment" @submit="submit" />
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import BaseButton from '@/components/base/BaseButton.vue';
import { Appointment } from '@/services/AppointmentService';
import AppointmentForm from './AppointmentForm.vue';
import moment from 'moment';
import { useAttrs } from 'vue';

interface Props {
  appointment?: Appointment;
  header: string;
  label: string;
}

const emit = defineEmits(['submit']);

const attrs = useAttrs();
const props = withDefaults(defineProps<Props>(), {
  appointment: () => {
    return {
      id: -1,
      title: '',
      scheduledAt: moment().toISOString(),
    };
  },
});

const { showModal, toggleModal } = useModal();

const submit = async (appointment: Appointment) => {
  emit('submit', appointment);
  toggleModal();
};
</script>
