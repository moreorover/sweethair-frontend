<template>
  <table class="table is-fullwidth is-hoverable">
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Instagram</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Instagram</th>
        <th>Actions</th>
      </tr>
    </tfoot>
    <tbody>
      <tr v-for="customer in customers" :key="customer.id">
        <router-link v-slot="{ navigate }" :to="`/customers/${customer.id}`" custom>
          <td @click="navigate()">{{ customer.firstName }} {{ customer.lastName }}</td>
          <td @click="navigate()">{{ customer.email }}</td>
          <td @click="navigate()">{{ customer.instagram }}</td>
        </router-link>
        <td>
          <div class="buttons">
            <customer-modal title="Edit Customer" action="Edit" :customer="customer" />
            <appointment-modal title="Book Appointment" action="Book Appointment" :customers="[customer]" />
            <transaction-modal title="Book New Transaction" action="New Transaction" :customer="customer" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Customer } from '@/services/CustomerService';
import { useCustomersStore } from '@/store/customersStore';
import CustomerModal from '@/components/customers/CustomerModal.vue';
import AppointmentModal from '../appointments/AppointmentModal.vue';
import TransactionModal from '@/components/transactions/TransactionModal.vue';

export default defineComponent({
  name: 'CustomersTable',
  components: { AppointmentModal, CustomerModal, TransactionModal },
  props: {
    customers: {
      type: Object as () => Customer[],
      required: true,
    },
  },
  setup() {
    const customersStore = useCustomersStore();
    const selectCustomer = (customer: Customer) => {
      customersStore.selectCustomer(customer);
    };
    return { selectCustomer };
  },
});
</script>
<style scoped></style>
