<template>
  <div class="columns is-centered">
    <div class="column">
      <div class="block">
        <div class="field">
          <label class="label">Scheduled Date and Time</label>
          <datepicker
            v-model="appointment.start"
            :uid="Date.now().toString(36) + Math.random().toString(36).substring(2)"
          />
        </div>
      </div>
      <div class="field">
        <customers-picker :customers-value="appointment.customers" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Appointment } from '@/services/AppointmentService';
import { defineComponent, computed } from 'vue';
import CustomersPicker from '@/components/customers/CustomersPicker.vue';
import Datepicker from 'vue3-date-time-picker';

export default defineComponent({
  components: { CustomersPicker, Datepicker },
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
