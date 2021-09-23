<template>
  <appointments />
  <!-- <suspense>
    <template #default>
      <appointments />
    </template>
    <template #fallback>
      <progress class="progress is-snall is-info" max="100"></progress>
    </template>
  </suspense> -->
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Appointments from '@/components/appointments/Appointments.vue';

export default defineComponent({
  components: { Appointments },
});
</script>
<style scoped></style>
