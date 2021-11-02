<template>
  <form class="p-fluid" @submit.prevent="submit()">
    <div class="p-field p-grid">
      <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Customers</label>
      <div class="p-col-12 p-md-10">
        <customer-picker :selected-customers="cs" :multiple="true" @selected="onSelected($event)" />
      </div>
    </div>
    <div class="p-field p-grid pt-2">
      <Button
        type="submit"
        label="Submit"
        class="p-mt-2"
        :disabled="_.isEqual(props.appointment.customers, a.customers)"
      />
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import CustomerPicker from '@/components/customers/CustomerPicker.vue';
import _ from 'lodash';
import { Customer } from '@/services/CustomerService';
import { Appointment } from '@/services/AppointmentService';

interface Props {
  appointment: Appointment;
}

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const cs = ref<Customer[] | null>(props.appointment.customers ? props.appointment.customers : []);

const a = reactive({ ...props.appointment });

const submit = () => {
  emit('submit', a);
};

const onSelected = (event) => {
  if (event) {
    console.log('event true');
    if (cs.value) {
      a.customers = [...cs.value, ...event];
    } else {
      a.customers = [...event];
    }
  } else {
    console.log('event else');
    a.customers = cs.value;
  }
};
</script>
