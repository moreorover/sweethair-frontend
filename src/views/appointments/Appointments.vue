<template>
  <div class="hero is-small welcome is-info my-3">
    <div class="hero-body">
      <p class="title">Appointments</p>
      <p class="subtitle">Menage your Appointments here...</p>
    </div>
    <div class="hero-foot">
      <nav class="tabs">
        <div class="container end">
          <ul>
            <router-link to="/appointments/new">Create Appointment</router-link>
          </ul>
        </div>
      </nav>
    </div>
  </div>

  <div class="info-tiles">
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="field">
            <div class="control">
              <input v-model="searchKey" type="text" class="input is-medium" placeholder="Search" disabled />
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">{{ appointments.length }}</p>
          <p class="subtitle">Appointments</p>
        </article>
      </div>
    </div>
  </div>

  <appointments-table :appointments="appointments" />
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useAppointmentsStore } from '@/store/appointmentsStore';
import AppointmentsTable from '@/components/appointments/AppointmentsTable.vue';

export default defineComponent({
  name: 'Appointments',
  components: { AppointmentsTable },
  setup() {
    const store = useAppointmentsStore();
    const searchKey = ref('');

    store.fetchAll();

    const allAppointments = computed(() => store.getAll);

    return { appointments: allAppointments, searchKey };
  },
});
</script>
<style scoped></style>
