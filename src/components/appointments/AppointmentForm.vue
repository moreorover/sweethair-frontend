<template>
  <section class="section card has-text-centered">
    <form @submit.prevent="onSubmit">
      <div class="container">
        <customers-picker
          :customers="customers"
          :customers-selection="newAppointment.customers"
          @toggle-customer="toggle"
        />
      </div>
      <datepicker v-model="dateInput" />
      <button class="button is-block is-primary is-fullwidth is-medium">Submit</button>
    </form>
  </section>

  <div>newAppointment: {{ newAppointment }}</div>
  <div>appointment: {{ appointment }}</div>
  <div>{{ dateInput }}</div>
</template>
<script lang="ts">
import { Appointment } from '@/services/AppointmentService';
import { useCustomersStore } from '@/store/pinia/customersStore';
import { defineComponent, reactive, computed, watchEffect, ref } from 'vue';
import CustomersPicker from '@/components/customers/CustomersPicker.vue';
import { Customer } from '@/services/CustomerService';
// import Datepicker from 'vue3-datepicker';

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
    const newAppointment: Appointment = reactive(props.appointment);
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

    const toggle = (customer: Customer) => {
      if (newAppointment.customers.find((c) => c.id === customer.id)) {
        newAppointment.customers = newAppointment.customers.filter((c) => c.id !== customer.id);
      } else {
        newAppointment.customers.push(customer);
      }
    };

    return { newAppointment, onSubmit, customers, toggle, dateInput };
  },
});
</script>
<style scoped></style>
