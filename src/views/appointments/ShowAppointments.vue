<template>
  <Suspense>
    <template #default>
      <Appointments />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Appointments from '@/views/appointments/Appointments.vue';
</script>
