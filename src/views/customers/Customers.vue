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
          <p class="title">{{ customers.length }}</p>
          <p class="subtitle">Customers</p>
        </article>
      </div>
    </div>
  </div>

  <customers-table :customers="customers" />
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import CustomersTable from '@/components/customers/CustomersTable.vue';

export default defineComponent({
  name: 'Customers',
  components: { CustomersTable },
  setup() {
    const store = useCustomersStore();
    const searchKey = ref('');

    store.fetchAll();

    const customers = computed(() => {
      return store.all.filter((customer) => {
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

    return { customers, searchKey };
  },
});
</script>
<style scoped></style>
