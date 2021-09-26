<template>
  <div class="hero is-small welcome is-info my-3">
    <div class="hero-body">
      <div class="columns">
        <div class="column has-text-left my-auto">
          <p class="title is-3">{{ appointment?.start }}</p>
        </div>
        <div class="column has-text-right my-auto">
          <p class="subtitle">{{ appointment?.start }}</p>
          <p class="subtitle">{{ appointment?.start }}</p>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <nav class="tabs">
        <div class="container end">
          <ul>
            <!-- <router-link to="/customers/new">Create Customer</router-link> -->
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppointmentsStore } from '@/store/appointmentsStore';

export default defineComponent({
  components: {},
  setup() {
    const store = useAppointmentsStore();
    const id = useRoute().params.id as string;

    store.fetchAll();

    const appointment = computed(() => store.getCustomerById(id));

    if (!appointment.value) {
      throw Error('Appointment was not found.');
    }

    return { appointment };
  },
});
</script>
