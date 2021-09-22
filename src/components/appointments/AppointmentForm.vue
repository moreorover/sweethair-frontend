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
      <div class="field">
        <div class="control">
          <input v-model="newAppointment.start" type="date" class="input is-medium" placeholder="Apointment start" />
        </div>
      </div>
      <button class="button is-block is-primary is-fullwidth is-medium">Submit</button>
    </form>
  </section>
  <div>newAppointment: {{ newAppointment }}</div>
  <div>appointment: {{ appointment }}</div>
</template>
<script lang="ts">
import { Appointment } from '@/services/AppointmentService';
import { useStore } from '@/store';
import { defineComponent, reactive } from 'vue';
import CustomersPicker from '@/components/customers/CustomersPicker.vue';
import { Customer } from '@/services/CustomerService';

export default defineComponent({
  components: { CustomersPicker },
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
    const store = useStore();
    const customers = Array.from(store.getCustomers().getState().all.values());
    const newAppointment: Appointment = reactive(props.appointment);
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

    const toggle = (customer: Customer) => {
      if (newAppointment.customers.find((c) => c.id === customer.id)) {
        newAppointment.customers = newAppointment.customers.filter((c) => c.id !== customer.id);
      } else {
        newAppointment.customers.push(customer);
      }
    };

    return { newAppointment, onSubmit, customers, toggle };
  },
});
</script>
<style scoped></style>
