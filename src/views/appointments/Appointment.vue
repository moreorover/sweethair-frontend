<template>
  <h1 class="title block">Appointment</h1>

  <h1 class="subtitle block">{{ appointment?.start && format(new Date(appointment?.start), 'dd MMMM yyyy HH:mm') }}</h1>
  <router-link :to="`/appointments/${appointment?.id}/edit`" class="button is-small is-warning block">
    Edit
  </router-link>
  <div class="columns is-desktop">
    <div v-for="customer in customers" :key="customer.id" class="column">
      <customer-card :customer="customer" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { format } from 'date-fns';
import CustomerCard from '@/components/customers/CustomerCard.vue';
import { useCustomersStore } from '@/store/customersStore';

export default defineComponent({
  components: { CustomerCard },
  setup() {
    const appointmentsStore = useAppointmentsStore();
    const customersStore = useCustomersStore();
    const id = useRoute().params.id as string;

    appointmentsStore.fetchAll();
    customersStore.fetchAll();

    const appointment = computed(() => appointmentsStore.getCustomerById(id));
    const customers = computed(() => customersStore.getCustomersByAppointment(appointment.value));
    if (!appointment.value) {
      throw Error('Appointment was not found.');
    }

    appointmentsStore.setSelected(appointment.value);

    return { appointment, format, customers };
  },
});
</script>
