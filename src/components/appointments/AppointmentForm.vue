<template>
  <div class="column">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <div class="field">
          <label class="label">Scheduled Date and Time</label>
          <datepicker v-model="dateInput" />
        </div>
      </div>
      <div class="field">
        <div class="field">
          <customers-picker :customers-selection="newAppointment.customers" @selected="toggle" />
        </div>
      </div>

      <button class="button is-block is-primary is-fullwidth is-medium">Submit</button>
    </form>
  </div>
</template>
<script lang="ts">
import { Appointment } from '@/services/AppointmentService';
import { useCustomersStore } from '@/store/customersStore';
import { defineComponent, reactive, computed, watchEffect, ref } from 'vue';
import CustomersPicker from '@/components/customers/CustomersPicker.vue';
import { Customer } from '@/services/CustomerService';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';

export default defineComponent({
  components: { CustomersPicker, Datepicker },
  props: {
    appointment: {
      type: Object as () => Appointment,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    save: (appointment: Appointment) => {
      return true;
    },
  },
  setup(props, { emit }) {
    const customersStore = useCustomersStore();
    const customers = computed(() => customersStore.getAll);
    const newAppointment = reactive<Appointment>(props.appointment);
    const dateInput = ref<Date>(new Date(props.appointment.start));
    const onSubmit = () => {
      for (var propName in newAppointment) {
        if (
          newAppointment[propName] === null ||
          newAppointment[propName] === undefined ||
          newAppointment[propName] === '' ||
          newAppointment[propName] === []
        ) {
          delete newAppointment[propName];
        }
      }

      emit('save', newAppointment);
    };

    watchEffect(() => (newAppointment.start = dateInput.value.toISOString()));

    const toggle = (customers: Customer[]) => {
      newAppointment.customers = customers;
    };

    return { newAppointment, onSubmit, customers, toggle, dateInput };
  },
});
</script>
<style scoped></style>
