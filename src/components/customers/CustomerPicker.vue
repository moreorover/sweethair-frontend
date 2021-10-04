<template>
  <div class="box">
    <h1 class="title">Pick Customer</h1>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ customers.length }}</strong> customers
          </p>
        </div>

        <div class="level-item is-hidden-tablet-only">
          <div class="field">
            <p class="control">
              <input v-model="searchKey" class="input" type="text" placeholder="Customer name, email..." />
            </p>
          </div>
        </div>
      </div>
    </nav>
    <table v-if="filteredCustomers.length > 0" class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th></th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Instagram</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th></th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Instagram</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="customer in filteredCustomers" :key="customer.id">
          <td>
            <input :id="customer.id" v-model="selection" type="radio" :value="customer.id" />
            <!-- <input
              :id="customer.id"
              v-model="selection"
              :value="customer"
              :checked="selection.id? == customer.id"
              type="radio"
            /> -->
          </td>
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.instagram }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else-if="searchKey === ''" class="title has-text-info has-text-centered">
      Search Customers by typing in search field.
    </p>
    <p v-else class="title has-text-danger has-text-centered">No Customers found, try something else.</p>
  </div>
  <div class="section">
    <h1 class="title">Selection</h1>
    {{ customerValue }}
    <!-- {{ sel }} -->
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { Customer } from '@/services/CustomerService';
import { useCustomersStore } from '@/store/customersStore';

export default defineComponent({
  name: 'CustomerPicker',
  props: {
    customerValue: {
      type: Object as () => Customer,
      required: false,
      default: null,
    },
  },
  emits: ['update:customerValue'],
  setup(props, { emit }) {
    const customerStore = useCustomersStore();
    const customers = computed(() => customerStore.getAll);
    const searchKey = ref('');

    const selection = computed({
      get: () => props.customerValue.id,
      set: (val) => {
        emit(
          'update:customerValue',
          customers.value.find((c) => c.id === val)
        );
      },
    });

    customerStore.fetchAll();

    const filteredCustomers = computed(() => {
      return customers.value.filter((customer) => {
        if (searchKey.value === '' && !(props.customerValue?.id === customer.id)) {
          return false;
        }
        if (
          customer.firstName.toLowerCase().includes(searchKey.value) ||
          customer.lastName.toLowerCase().includes(searchKey.value) ||
          customer.email?.toLowerCase().includes(searchKey.value) ||
          customer.instagram?.toLowerCase().includes(searchKey.value) ||
          props.customerValue?.id === customer.id
        ) {
          return true;
        }
        return false;
      });
    });

    return { filteredCustomers, searchKey, customers, selection };
  },
});
</script>
<style scoped></style>
