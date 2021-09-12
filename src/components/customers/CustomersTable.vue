<template>
  <table class="table is-fullwidth is-striped is-hoverable">
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Instagram</th>
        <th></th>
      </tr>
    </thead>
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
          <td class="level-right">
            <router-link :to="`/customers/${customer.id}/edit`" class="button is-small is-warning"> Edit </router-link>
          </td>
        </tr>
      </router-link>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Customer } from '@/services/CustomerService';

export default defineComponent({
  name: 'CustomersTable',
  props: {
    customers: {
      type: Object as () => Customer[],
      required: true,
    },
  },
  async setup() {
    const router = useRouter();

    const navigateToCustomer = (id: string) => {
      router.push({ name: 'Customer', params: { id } });
    };

    return { navigateToCustomer };
  },
});
</script>
<style scoped></style>
