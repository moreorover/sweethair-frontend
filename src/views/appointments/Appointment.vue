<template>
  <h1 class="title">Appointment</h1>
  <h1 class="subtitle">{{ appointment?.start && format(new Date(appointment?.start), 'dd MMMM yyyy HH:mm') }}</h1>
  <section class="section">
    <customers-cards :customers="appointment?.customers" />
  </section>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { format } from 'date-fns';
import CustomersCards from '@/components/customers/CustomersCards.vue';

export default defineComponent({
  components: { CustomersCards },
  setup() {
    const store = useAppointmentsStore();
    const id = useRoute().params.id as string;

    store.fetchAll();

    const appointment = computed(() => store.getCustomerById(id));

    if (!appointment.value) {
      throw Error('Appointment was not found.');
    }

    store.setSelected(appointment.value);

    return { appointment, format };
  },
});
</script>
