<template>
  <nav class="level box">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Customers</p>
        <p class="title">{{ cCount }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Appointments</p>
        <p class="title">{{ aCount }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Transactions</p>
        <p class="title">{{ tCount }}</p>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { useAppointmentsStore } from '@/store/appointmentsStore';
import { useCustomersStore } from '@/store/customersStore';
import { useTransactionsStore } from '@/store/transactionsStore';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  setup() {
    const customersStore = useCustomersStore();
    const appointmentsStore = useAppointmentsStore();
    const transactionsStore = useTransactionsStore();

    customersStore.fetchAll();
    appointmentsStore.fetchAll();
    transactionsStore.fetchAll();

    const cCount = computed(() => customersStore.getAll.length);
    const aCount = computed(() => appointmentsStore.getAll.length);
    const tCount = computed(() => transactionsStore.getAll.length);

    return { cCount, aCount, tCount };
  },
});
</script>
