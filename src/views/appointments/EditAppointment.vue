<template>
  <suspense>
    <template #default>
      <edit-appointment />
    </template>

    <template #fallback> Loading... </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EditAppointment from '@/components/appointments/EditAppointment.vue';
export default defineComponent({
  components: {
    EditAppointment,
  },
});
</script>
