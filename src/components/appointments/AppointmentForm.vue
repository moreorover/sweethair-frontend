<template>
  <div class="column">
    <form @submit.prevent="">
      <div class="field">
        <div class="field">
          <label class="label">Scheduled Date and Time</label>
          <datepicker v-model="appointment.start" />
        </div>
      </div>
      <div class="field">
        <div class="field">
          <customers-picker :customers-value="appointment.customers" />
        </div>
      </div>
    </form>
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

    // const toggle = (customers: Customer[]) => {

    // }

    return { appointment };
  },
});
</script>
<style scoped></style>
