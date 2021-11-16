<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">{{ appointment?.title }}</h3>
    <AppointmentDialog :appointment="appointment" header="Edit Appointment" label="Edit" buttonSize="large" />
    <MultipleCustomerPickerDialog
      :preSelection="appointment?.customers"
      header="Pick customers"
      label="Pick Customers"
      buttonSize="medium"
      @submit="pickedCustomers($event)"
    />
  </div>
  <div class="flex justify-center">
    <div class="rounded-lg w-full">
      <ul class="divide-y divide-gray-300">
        <li v-for="customer in appointment?.customers">{{ customer.fullName }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { Appointment } from '@/services/AppointmentService';
import AppointmentDialog from '@/components/appointments/AppointmentDialog.vue';
import MultipleCustomerPickerDialog from '@/components/customers/MultipleCustomerPickerDialog.vue';
import { Customer } from '@/services/CustomerService';

type Props = {
  id: string;
};

const props = defineProps<Props>();

const appointmentsStore = useAppointmentsStore();

const all = appointmentsStore.all;

const appointment = computed<Appointment | undefined>(() => all.find((a) => a.id === props.id));

const pickedCustomers = (customers: Customer[]) => {
  if (appointment.value) {
    appointment.value?.customers?.push(...customers);
    appointmentsStore.update(appointment.value);
  }
};
</script>
