<template>
  <h1 class="title">Customers</h1>

  <nav class="level">
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle is-5">
          <strong>{{ customers.length }}</strong> customers
        </p>
      </div>

      <p class="level-item">
        <router-link to="/customers/new">
          <a class="button is-success">New</a>
        </router-link>
      </p>

      <div class="level-item is-hidden-tablet-only">
        <div class="field has-addons">
          <p class="control">
            <input v-model="searchKey" class="input" type="text" placeholder="Customer name, email..." />
          </p>
        </div>
      </div>
    </div>

    <!-- <div class="level-right">
      <div class="level-item">Order by</div>
      <div class="level-item">
        <div class="select">
          <select>
            <option>Publish date</option>
            <option>Price</option>
            <option>Page count</option>
          </select>
        </div>
      </div>
    </div> -->
  </nav>

  <div class="columns is-multiline">
    <router-link
      v-for="customer in customers"
      :key="customer.id"
      v-slot="{ navigate }"
      :to="`/customers/${customer.id}`"
      custom
    >
      <div class="column is-12-tablet is-6-desktop is-4-widescreen" @click="navigate">
        <article class="box">
          <div class="media">
            <div class="media-content">
              <p class="title is-5 is-spaced is-marginless">{{ customer.firstName }} {{ customer.lastName }}</p>
              <p class="subtitle is-marginless">{{ customer.email }}</p>
              <p class="subtitle is-marginless">{{ customer.instagram }}</p>
              <div class="content is-small">
                Created on: {{ customer.createdOn && format(new Date(customer.createdOn), 'dd MMMM yyyy') }}
                <br />
                Modified on: {{ customer.modifiedOn && format(new Date(customer.modifiedOn), 'dd MMMM yyyy') }}
                <br />
                <router-link :to="`/customers/${customer.id}/edit`" class="subtitle is-marginless"> Edit </router-link>
                <span class="subtitle is-marginless"> / </span>
                <router-link :to="`/customers/${customer.id}/edit`" class="subtitle is-marginless">
                  Book Appointment
                </router-link>
                <p></p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </router-link>

    <customers-table :customers="customers" />
  </div>

  <!-- <customers-table :customers="customers" /> -->
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import CustomersTable from '@/components/customers/CustomersTable.vue';
import { format } from 'date-fns';

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

    return { customers, searchKey, format };
  },
});
</script>
<style scoped></style>
