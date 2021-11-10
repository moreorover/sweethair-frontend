<template>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <BaseInput label="Title" v-model="title" type="text" :error="errors.title" />
      </div>
      <div class="p-field p-col-12 p-md-4">
        <label for="time24">Scheduled Date</label>
        <Calendar id="time24" v-model="scheduledAt" :showTime="true" :showSeconds="false" />
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <BaseButton label="Submit" size="large" />
    </div>
  </form>
  {{ props.appointment.scheduledAt }}
  {{ scheduledAt }}
</template>
<script setup lang="ts">
import { Appointment } from '@/services/AppointmentService';
import { useField, useForm } from 'vee-validate';
import { object, string, array } from 'yup';

type Props = {
  appointment: Appointment;
};

const props = defineProps<Props>();

const emit = defineEmits(['submit']);

const validationSchema = object({
  scheduledAt: string().trim().required('Scheduled Date is required'),
  title: string().trim().required(),
  customers: array().nullable(),
  transactions: array().nullable(),
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: scheduledAt } = useField('scheduledAt');
const { value: title } = useField('title');

scheduledAt.value = props.appointment.scheduledAt;
title.value = props.appointment.title;

const submit = handleSubmit((values) => {
  emit('submit', { id: props.appointment.id, ...values });
});
</script>
