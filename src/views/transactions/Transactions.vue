<template>
  <h1 class="title">Transactions</h1>

  <nav class="level">
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle is-5">
          <strong>{{ transactions.length }}</strong> transactions
        </p>
      </div>

      <p class="level-item">
        <router-link to="/transactions/new">
          <a class="button is-success">New</a>
        </router-link>
      </p>
      <div v-for="period in periods" :key="period" class="level-item">
        <span
          :class="{ 'is-light': activePeriod !== period }"
          class="tag is-link is-clickable"
          @click="activePeriod = period"
        >
          {{ period }}
        </span>
      </div>
    </div>
  </nav>

  <transactions-table :transactions="transactions" />
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import TransactionsTable from '@/components/transactions/TransactionsTable.vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import { isAfter, isBefore, nextSunday, addDays, startOfMonth, endOfMonth, getMonth, setMonth } from 'date-fns';

type TimePeriod = 'Today' | 'This Week' | 'Next Week' | 'This Month' | 'Next Month' | 'All';

export default defineComponent({
  name: 'Transactions',
  components: { TransactionsTable },
  setup() {
    const periods: TimePeriod[] = ['Today', 'This Week', 'Next Week', 'This Month', 'Next Month', 'All'];
    const activePeriod = ref<TimePeriod>('All');
    const store = useTransactionsStore();

    store.fetchAll();

    const transactions = computed(() => {
      return store.getAll.filter((transaction) => {
        const transactionToBePaidOn: Date = new Date(transaction.date);
        var curr = new Date();

        if (activePeriod.value === 'Today') {
          let firstDay = curr.setHours(0, 0, 0);
          let lastDay = curr.setHours(23, 59, 59);
          if (isAfter(transactionToBePaidOn, firstDay) && isBefore(transactionToBePaidOn, lastDay)) {
            return true;
          }
        }

        if (activePeriod.value === 'This Week') {
          let first = curr.getDate() - curr.getDay();
          let last = first + 6;

          let firstDay = new Date(curr.setDate(first));
          firstDay.setHours(0, 0, 0);
          let lastDay = new Date(curr.setDate(last));
          lastDay.setHours(23, 59, 59);
          if (isAfter(transactionToBePaidOn, firstDay) && isBefore(transactionToBePaidOn, lastDay)) {
            return true;
          }
        }
        if (activePeriod.value === 'Next Week') {
          let firstDay = nextSunday(curr);
          let lastDay = addDays(firstDay, 6);

          firstDay.setHours(0, 0, 0);
          lastDay.setHours(23, 59, 59);
          if (isAfter(transactionToBePaidOn, firstDay) && isBefore(transactionToBePaidOn, lastDay)) {
            return true;
          }
        }
        if (activePeriod.value === 'This Month') {
          if (isAfter(transactionToBePaidOn, startOfMonth(curr)) && isBefore(transactionToBePaidOn, endOfMonth(curr))) {
            return true;
          }
        }
        if (activePeriod.value === 'Next Month') {
          const nextMonth = getMonth(curr) + 1;
          if (
            isAfter(transactionToBePaidOn, startOfMonth(setMonth(curr, nextMonth))) &&
            isBefore(transactionToBePaidOn, endOfMonth(setMonth(curr, nextMonth)))
          ) {
            return true;
          }
        }
        if (activePeriod.value === 'All') {
          return true;
        }
      });
    });

    return { transactions, periods, activePeriod };
  },
});
</script>
<style scoped></style>
