<template>
  <table class="table is-fullwidth is-striped is-hoverable">
    <thead>
      <tr>
        <th>Total</th>
        <th>is Paid</th>
        <th>Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <router-link
        v-for="transaction in transactions"
        :key="transaction.id"
        v-slot="{ navigate }"
        :to="`/transactions/${transaction.id}`"
        custom
      >
        <tr @click="navigate">
          <td>{{ transaction.total }}</td>
          <td>{{ transaction.isPaid }}</td>
          <td>{{ format(new Date(transaction.date), 'dd MMMM yyyy') }}</td>
          <td class="level-right">
            <router-link :to="`/transactions/${transaction.id}/edit`" class="button is-small is-warning">
              Edit
            </router-link>
          </td>
        </tr>
      </router-link>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { format } from 'date-fns';
import { Transaction } from '@/services/TransactionService';

export default defineComponent({
  name: 'AppointmentsTable',
  props: {
    transactions: {
      type: Object as () => Transaction[],
      required: true,
    },
  },
  setup() {
    return { format };
  },
});
</script>
<style scoped></style>
