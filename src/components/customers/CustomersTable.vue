<template>
  <div class="hero is-small welcome is-info my-3">
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

  <section class="info-tiles">
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
      <!-- <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">59k</p>
          <p class="subtitle">Products</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">3.4k</p>
          <p class="subtitle">Open Orders</p>
        </article>
      </div> -->
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">{{ customers.length }}</p>
          <p class="subtitle">Customers</p>
        </article>
      </div>
    </div>
  </section>

  <div class="card-table my-3">
    <div class="content">
      <table class="table is-fullwidth is-striped">
        <tbody>
          <tr v-for="customer in customers" :key="customer.id" @click="navigateToCustomer(customer.id)">
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
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store/';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CustomersTable',
  async setup() {
    const store = useStore();
    const router = useRouter();
    const searchKey = ref('');

    await store.getCustomers().fetchAll();

    const allCustomers = Array.from(store.getCustomers().getState().all.values());

    const customers = computed(() => {
      return allCustomers.filter((customer) => {
        if (customer.firstName.toLowerCase().includes(searchKey.value)) {
          return true;
        }
        if (customer.lastName.toLowerCase().includes(searchKey.value)) {
          return true;
        }
        if (customer.email.toLowerCase().includes(searchKey.value)) {
          return true;
        }
        if (customer.instagram.toLowerCase().includes(searchKey.value)) {
          return true;
        }
        return false;
      });
    });

    const navigateToCustomer = (id: string) => {
      router.push({ name: 'Customer', params: { id } });
    };

    return { customers, searchKey, navigateToCustomer };
  },
});
</script>
<style scoped></style>
