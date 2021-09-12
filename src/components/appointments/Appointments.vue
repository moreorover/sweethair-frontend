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
              <input v-model="searchKey" type="text" class="input is-medium" placeholder="Search" />
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
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store/';
import AppointmentsTable from '@/components/appointments/AppointmentsTable.vue';

export default defineComponent({
  name: 'Appointments',
  components: { AppointmentsTable },
  async setup() {
    const store = useStore();
    const searchKey = ref('');

    await store.getAppointments().fetchAll();

    const allAppointments = Array.from(store.getAppointments().getState().all.values());

    // const customers = computed(() => {
    //   return allCustomers.filter((customer) => {
    //     if (customer.firstName.toLowerCase().includes(searchKey.value)) {
    //       return true;
    //     }
    //     if (customer.lastName.toLowerCase().includes(searchKey.value)) {
    //       return true;
    //     }
    //     if (customer.email.toLowerCase().includes(searchKey.value)) {
    //       return true;
    //     }
    //     if (customer.instagram.toLowerCase().includes(searchKey.value)) {
    //       return true;
    //     }
    //     return false;
    //   });
    // });

    return { appointments: allAppointments, searchKey };
  },
});
</script>
<style scoped></style>
