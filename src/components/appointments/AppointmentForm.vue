<template>
  <div class="p-fluid py-2">
    <div class="p-field p-grid">
      <label for="scheduled" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Scheduled at</label>
      <div class="p-col-12 p-md-10">
        <Calendar
          id="scheduled"
          v-model="appointment.start"
          :touch-u-i="true"
          :show-time="true"
          date-format="mm-dd-yy"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Appointment } from '@/services/AppointmentService';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    appointmentValue: {
      type: Object as () => Appointment,
      required: true,
    },
  },
  emits: ['update:appointmentValue'],
  setup(props, { emit }) {
    const appointment = computed({
      get: () => props.appointmentValue,
      set: (val) => emit('update:appointmentValue', val),
    });

    return { appointment };
  },
});
</script>
<style scoped></style>
