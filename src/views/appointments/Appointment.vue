<template>
  <suspense>
    <template #default>
      <appointment />
    </template>
    <template #fallback>
      <progress class="progress is-snall is-info" max="100"></progress>
    </template>
  </suspense>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Appointment from '@/components/appointments/Appointment.vue';

export default defineComponent({
  components: { Appointment },
});
</script>
<style scoped></style>
