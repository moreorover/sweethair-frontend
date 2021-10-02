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
        <customer-modal title="Create New Customer" action="New" />
      </p>

      <div class="level-item">
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
  <!-- <customers-cards :customers="customers" /> -->
  <customers-table :customers="customers" />
  <!-- <customers-table :customers="customers" /> -->
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import CustomersTable from '@/components/customers/CustomersTable.vue';
import CustomerModal from '../../components/customers/CustomerModal.vue';

export default defineComponent({
  name: 'Customers',
  components: { CustomersTable, CustomerModal },
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
        if (customer.email?.toLowerCase().includes(searchKey.value)) {
          return true;
        }
        if (customer.instagram?.toLowerCase().includes(searchKey.value)) {
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
