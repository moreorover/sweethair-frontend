<script setup lang="ts">
import { Appointment } from '@/services/AppointmentService';
import { reactive, ref } from 'vue';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

type Props = {
  appointment: Appointment;
};

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const a = reactive<Appointment>({ ...props.appointment });

const rules = {
  scheduledAt: { required },
  title: { required },
};

const submitted = ref(false);

const v$ = useVuelidate(rules, a);

function handleSubmit(isFormValid: boolean) {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  emit('submit', a);
}
</script>
<template>
  <form class="p-fluid py-2" @submit.prevent="handleSubmit(!v$.$invalid)">
    <div class="p-field p-grid">
      <label for="lastName" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Title</label>
      <div class="p-col-12 p-md-10">
        <InputText id="lastName" v-model="a.title" type="text" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="scheduled" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Scheduled at</label>
      <div class="p-col-12 p-md-10">
        <Calendar
          id="scheduled"
          v-model="a.scheduledAt"
          :show-time="true"
          date-format="dd MM yy"
          :manual-input="false"
        />
      </div>
    </div>
    <div class="p-field p-grid pt-2">
      <Button type="submit" label="Submit" class="p-mt-2" />
    </div>
  </form>
</template>
