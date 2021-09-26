<template>
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
  <table class="table is-fullwidth is-striped is-hoverable">
    <thead>
      <tr>
        <th></th>
        <th>Full Name</th>
        <th>Email</th>
        <th>Instagram</th>
        <th>Appointments</th>
      </tr>
    </thead>
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
        <td>{{ customer.appointments?.length }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { Customer } from '@/services/CustomerService';
import { useCustomersStore } from '@/store/customersStore';

export default defineComponent({
  name: 'CustomersPicker',
  // components: { BaseCheckbox },
  props: {
    customersSelection: {
      type: Object as () => Customer[],
      required: true,
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const customerStore = useCustomersStore();
    const customers = computed(() => customerStore.getAll);
    const searchKey = ref('');
    const selection = ref<Customer[]>(props.customersSelection);

    customerStore.fetchAll();

    const filteredCustomers = computed(() => {
      return customers.value.filter((customer) => {
        if (
          customer.firstName.toLowerCase().includes(searchKey.value) ||
          customer.lastName.toLowerCase().includes(searchKey.value) ||
          customer.email.toLowerCase().includes(searchKey.value) ||
          customer.instagram.toLowerCase().includes(searchKey.value) ||
          props.customersSelection.find((c) => c.id === customer.id)
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
      emit('selected', selection.value);
    };

    return { filteredCustomers, searchKey, toggleCustomer, customers, selection };
  },
});
</script>
<style scoped></style>
