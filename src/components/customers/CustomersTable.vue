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
      <router-link
        v-for="customer in customers"
        :key="customer.id"
        v-slot="{ navigate }"
        :to="`/customers/${customer.id}`"
        custom
      >
        <tr @click="navigate">
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.instagram }}</td>
          <td>
            <div class="buttons">
              <router-link :to="`/customers/${customer.id}/edit`" class="button is-small is-warning">
                Edit
              </router-link>
            </div>
          </td>
        </tr>
      </router-link>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Customer } from '@/services/CustomerService';

export default defineComponent({
  name: 'CustomersTable',
  props: {
    customers: {
      type: Object as () => Customer[],
      required: true,
    },
  },
});
</script>
<style scoped></style>
