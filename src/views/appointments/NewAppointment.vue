<template>
  <h1 class="title">Create New Appointment</h1>
  <appointment-form :appointment="newAppointment" @save="save" />
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import AppointmentForm from '@/components/appointments/AppointmentForm.vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { Appointment } from '@/services/AppointmentService';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { Customer } from '@/services/CustomerService';
import { useCustomersStore } from '@/store/customersStore';

export default defineComponent({
  name: 'NewAppointment',
  components: {
    AppointmentForm,
  },
  setup() {
    const appointmentsStore = useAppointmentsStore();
    const customersStore = useCustomersStore();
    const selectedCustomer = computed<Customer | null>(() => customersStore.getSelectedCustomer);
    const router = useRouter();
    const newAppointment: Appointment = reactive({
      id: '',
      start: new Date().toISOString(),
      customers: selectedCustomer.value ? [selectedCustomer.value] : [],
      transactions: [],
    });

    const save = async (appointment: Appointment) => {
      await appointmentsStore.create(appointment);
      const newAppointment = computed<Appointment>(() => appointmentsStore.newAppointment);
      router.push({
        name: 'Appointment',
        params: { id: newAppointment.value.id },
      });
    };

    onBeforeRouteLeave(() => {
      selectedCustomer.value && customersStore.selectCustomer(null);
    });

    return { newAppointment, save };
  },
});
</script>
