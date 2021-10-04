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
            <input
              :id="customer.id"
              :checked="selectedId === customer.id"
              type="radio"
              @click="onSelect(customer.id)"
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
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { Customer } from '@/services/CustomerService';
import { useCustomersStore } from '@/store/customersStore';

export default defineComponent({
  name: 'CustomerPicker',
  props: {
    customerValue: {
      type: Object as PropType<Customer | null>,
      required: false,
      default: null,
    },
  },
  emits: ['update:customerValue'],
  setup(props, { emit }) {
    const customerStore = useCustomersStore();
    const customers = computed(() => customerStore.getAll);
    const searchKey = ref('');

    const selectedId = ref(props.customerValue ? props.customerValue.id : '');

    const onSelect = (customerId: string | undefined) => {
      if (customerId === selectedId.value) {
        selectedId.value = '';
      } else {
        selectedId.value = customerId;
      }
    };

    watch(selectedId, (s) => {
      emit(
        'update:customerValue',
        customers.value.find((c) => c.id === s)
      );
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

    return { filteredCustomers, searchKey, customers, onSelect, selectedId };
  },
});
</script>
<style scoped></style>
