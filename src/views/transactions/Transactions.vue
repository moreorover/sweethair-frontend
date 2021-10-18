<template>
  <div class="px-0 py-4 md:px-4">
    <div class="border-2 surface-border border-round surface-card">
      <transactions-table :transactions="transactions" />
    </div>
  </div>
  <div class="px-0 py-4 md:px-4">
    <div class="border-2 surface-border border-round surface-card">
      <line-chart :data="objData" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import { isAfter, isBefore, nextSunday, addDays, startOfMonth, endOfMonth, getMonth, setMonth } from 'date-fns';
import LineChart from '@/components/common/LineChart.vue';
import TransactionsTable from '@/components/transactions/TransactionsTable.vue';

type TimePeriod = 'Today' | 'This Week' | 'Next Week' | 'This Month' | 'Next Month' | 'All';

export default defineComponent({
  name: 'Transactions',
  components: { LineChart, TransactionsTable },
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

    // const objData = computed(() => store.getChartData);

    const objData = computed(() => {
      const projected = { name: 'Projected', data: {} };
      const actual = { name: 'Actual', data: {} };

      let rP = 0;
      let rA = 0;

      transactions.value.forEach((t) => {
        if (t) {
          if (t.isPaid) {
            rA = +(rA + t.total).toFixed(2);
          }
          rP = +(rP + t.total).toFixed(2);

          projected.data[t.date] = rP;
          actual.data[t.date] = rA;
        }
      });

      return [projected, actual];
    });

    return { transactions, periods, activePeriod, objData };
  },
});
</script>
<style scoped></style>
