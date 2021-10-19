<template>
  <div class="px-0 py-4 md:px-4">
    <div class="border-2 surface-border border-round surface-card">
      <appointments-table :appointments="appointments" :view-appointment="true" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import AppointmentsTable from '@/components/appointments/AppointmentsTable.vue';

export default defineComponent({
  name: 'Appointments',
  components: { AppointmentsTable },
  setup() {
    const store = useAppointmentsStore();

    store.fetchAll();

    const appointments = computed(() => store.getAll);

    return { appointments };
  },
});
</script>
<style scoped></style>
