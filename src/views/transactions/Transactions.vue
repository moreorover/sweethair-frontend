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
  <div class="px-0 py-4 md:px-4">
    <div class="border-2 surface-border border-round surface-card">
      <Chart :height="50" type="line" :data="chartData" :options="basicOptions" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import LineChart from '@/components/common/LineChart.vue';
import TransactionsTable from '@/components/transactions/TransactionsTable.vue';
import format from 'date-fns/format';

export default defineComponent({
  name: 'Transactions',
  components: { LineChart, TransactionsTable },
  setup() {
    const store = useTransactionsStore();

    store.fetchAll();

    const transactions = computed(() => store.getAll);

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

    const chartDataAll = computed(() => {
      const x = {
        labels: [] as string[],
        datasets: [
          {
            label: 'Projected',
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4,
            data: [] as number[],
          },
          {
            label: 'Actual',
            fill: false,
            borderColor: '#00bb7e',
            tension: 0.4,
            data: [] as number[],
          },
        ],
      };

      let rP = 0;
      let rA = 0;

      transactions.value.forEach((t) => {
        if (t) {
          if (t.isPaid) {
            rA = +(rA + t.total).toFixed(2);
          }
          rP = +(rP + t.total).toFixed(2);

          const i = format(new Date(t.date), 'dd/MMM/yyyy');

          x.labels.push(i);
          x.datasets[0].data.push(rP);
          x.datasets[1].data.push(rA);
        }
      });

      return x;
    });

    const chartDataDay = computed(() => {
      const x = {
        labels: [] as string[],
        datasets: [
          {
            label: 'Projected',
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4,
            data: [] as number[],
          },
          {
            label: 'Actual',
            fill: false,
            borderColor: '#00bb7e',
            tension: 0.4,
            data: [] as number[],
          },
        ],
      };

      let rP = 0;
      let rA = 0;

      let lastDate = '';

      transactions.value.forEach((t) => {
        if (t) {
          if (t.isPaid) {
            rA = +(rA + t.total).toFixed(2);
          }
          rP = +(rP + t.total).toFixed(2);

          const i = format(new Date(t.date), 'dd/MMM/yyyy');

          if (i !== lastDate) {
            lastDate = i;
            x.labels.push(i);
            x.datasets[0].data.push(rP);
            x.datasets[1].data.push(rA);
          }
        }
      });

      return x;
    });

    const basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };

    return { transactions, objData, chartData: chartDataAll, chartDataDay, basicOptions };
  },
});
</script>
<style scoped></style>
