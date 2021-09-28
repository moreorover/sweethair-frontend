<template>
  <aside class="menu">
    <ul class="menu-list">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/customers">Customers</router-link>
      <router-link to="/appointments">Appointments</router-link>
      <router-link to="/transactions">Transactions</router-link>
    </ul>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SideMenu',
});
</script>

<style></style>
