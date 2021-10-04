<template>
  <div v-if="filteredTransactions.length > 0" class="box">
    <h1 class="title">Pick Transactions</h1>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ filteredTransactions.length }}</strong> transactions
          </p>
        </div>
      </div>
    </nav>
    <table v-if="filteredTransactions.length > 0" class="table is-fullwidth is-hoverable">
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
        <tr v-for="transaction in filteredTransactions" :key="transaction.id">
          <td>
            <input
              type="checkbox"
              :checked="selection.find((c) => c.id === transaction.id) ? true : false"
              @click="toggleTransaction(transaction)"
            />
          </td>
          <td>{{ format(new Date(transaction.date), 'dd MMMM yyyy HH:mm') }}</td>
          <td>{{ transaction.isPaid }}</td>
          <td>{{ transaction.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Transaction } from '@/services/TransactionService';
import { useTransactionsStore } from '@/store/transactionsStore';
import format from 'date-fns/format';

export default defineComponent({
  name: 'TransactionsPicker',
  props: {
    transactionsValue: {
      type: Object as () => Transaction[],
      required: true,
    },
  },
  emits: ['update:transactionsValue'],
  setup(props, { emit }) {
    const transactionsStore = useTransactionsStore();
    const transactions = computed(() => transactionsStore.getAll);
    const selection = computed({
      get: () => props.transactionsValue,
      set: (val) => emit('update:transactionsValue', val),
    });

    transactionsStore.fetchAll();

    const filteredTransactions = computed(() => {
      return transactions.value.filter((transaction) => {
        if (transaction.customer) {
          return false;
        }
        return true;
      });
    });

    const toggleTransaction = (transaction: Transaction) => {
      if (selection.value.find((c) => c.id === transaction.id)) {
        selection.value = selection.value.filter((c) => c.id !== transaction.id);
      } else {
        selection.value.push(transaction);
      }
    };

    return { selection, toggleTransaction, transactions, format, filteredTransactions };
  },
});
</script>
<style scoped></style>
