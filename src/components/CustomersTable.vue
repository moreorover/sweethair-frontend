<template>
  <div>
    <div class="hero is-small is-link">
      <div class="hero-body">
        <p class="title">Customers</p>
        <p class="subtitle">Menage your Customers here...</p>
      </div>
      <div class="hero-foot">
        <nav class="tabs">
          <div class="container end">
            <ul>
              <router-link to="/customers/new">Create Customer</router-link>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div class="card-table">
      <div class="content">
        <table class="table is-fullwidth is-striped">
          <tbody>
            <tr v-for="customer in customers" :key="customer.id">
              <td>{{ customer.firstName }} {{ customer.lastName }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.instagram }}</td>
              <td class="level-right">
                <router-link :to="`/customers/${customer.id}/edit`" class="button is-small is-warning">
                  Edit
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <footer class="card-footer">
            <a href="#" class="card-footer-item">View All</a>
          </footer> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store/';

export default defineComponent({
  name: 'CustomersTable',
  async setup() {
    const store = useStore();

    if (!store.getState().customers.loaded) {
      await store.fetchCustomers();
    }

    const cs = store.getState().customers.all.values();

    return { customers: cs };
  },
});
</script>
<style scoped></style>
