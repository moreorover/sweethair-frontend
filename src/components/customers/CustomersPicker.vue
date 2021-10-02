<template>
  <div class="box">
    <h1 class="title">Pick Customers</h1>
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
            <input
              type="checkbox"
              :checked="selection.find((c) => c.id === customer.id) ? true : false"
              @click="toggleCustomer(customer)"
            />
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
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { Customer } from '@/services/CustomerService';
import { useCustomersStore } from '@/store/customersStore';

export default defineComponent({
  name: 'CustomersPicker',
  // components: { BaseCheckbox },
  props: {
    customersValue: {
      type: Object as () => Customer[],
      required: true,
    },
  },
  emits: ['update:customersValue'],
  setup(props, { emit }) {
    const customerStore = useCustomersStore();
    const customers = computed(() => customerStore.getAll);
    const searchKey = ref('');
    const selection = computed({
      get: () => props.customersValue,
      set: (val) => emit('update:customersValue', val),
    });

    customerStore.fetchAll();

    const filteredCustomers = computed(() => {
      return customers.value.filter((customer) => {
        if (searchKey.value === '' && !selection.value.find((c) => c.id === customer.id)) {
          return false;
        }
        if (
          customer.firstName.toLowerCase().includes(searchKey.value) ||
          customer.lastName.toLowerCase().includes(searchKey.value) ||
          customer.email?.toLowerCase().includes(searchKey.value) ||
          customer.instagram?.toLowerCase().includes(searchKey.value) ||
          selection.value.find((c) => c.id === customer.id)
        ) {
          return true;
        }
        return false;
      });
    });

    const toggleCustomer = (customer: Customer) => {
      if (selection.value.find((c) => c.id === customer.id)) {
        selection.value = selection.value.filter((c) => c.id !== customer.id);
      } else {
        selection.value.push(customer);
      }
    };

    return { filteredCustomers, searchKey, toggleCustomer, customers, selection };
  },
});
</script>
<style scoped></style>
