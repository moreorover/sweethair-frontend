<template>
  <Suspense>
    <template #default>
      <Appointment />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Appointment from '@/views/appointments/Appointment.vue';
</script>
