<template>
  <table class="table is-fullwidth is-striped is-hoverable">
    <thead>
      <tr>
        <th>Scheduled At</th>
        <th>is Paid</th>
        <th>Customer</th>
        <th>Total</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in transactions" :key="transaction.id">
        <router-link v-slot="{ navigate }" :to="`/transactions/${transaction.id}`" custom>
          <td @click="navigate">{{ format(new Date(transaction.date), 'dd MMMM yyyy') }}</td>
        </router-link>
        <td>
          <div v-if="transaction.isPaid" class="tile notification is-success"></div>
          <div v-else class="tile notification is-danger"></div>
        </td>
        <td>{{ transaction.customer?.firstName }} {{ transaction.customer?.lastName }}</td>
        <td>{{ transaction.total }}</td>
        <td>
          <router-link :to="`/transactions/${transaction.id}/edit`" class="button is-small is-warning">
            Edit
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { format } from 'date-fns';
import { Transaction } from '@/services/TransactionService';
import { useTransactionsStore } from '@/store/transactionsStore';

export default defineComponent({
  name: 'AppointmentsTable',
  props: {
    transactions: {
      type: Object as () => Transaction[],
      required: true,
    },
  },
  setup() {
    const transactionsStore = useTransactionsStore();
    transactionsStore.fetchAll();
    return { format };
  },
});
</script>
<style scoped></style>
