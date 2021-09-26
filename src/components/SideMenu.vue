<template>
  <aside class="menu">
    <p class="menu-label">General</p>
    <ul class="menu-list">
      <li><a>Dashboard</a></li>
      <router-link to="/customers">Customers</router-link>
      <router-link to="/appointments">Appointments</router-link>
      <router-link to="/transactions">Transactions</router-link>
    </ul>
    <p class="menu-label">Administration</p>
    <ul class="menu-list">
      <li><a>Team Settings</a></li>
      <li>
        <a>Manage Your Team</a>
        <ul>
          <li><a>Members</a></li>
          <li><a>Plugins</a></li>
          <li><a>Add a member</a></li>
          <li><a>Remove a member</a></li>
        </ul>
      </li>
      <li><a>Invitations</a></li>
      <li><a>Cloud Storage Environment Settings</a></li>
      <li><a>Authentication</a></li>
      <li><a>Payments</a></li>
    </ul>
    <p class="menu-label">Transactions</p>
    <ul class="menu-list">
      <li><a>Payments</a></li>
      <li><a>Transfers</a></li>
      <li><a>Balance</a></li>
      <li><a>Reports</a></li>
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
