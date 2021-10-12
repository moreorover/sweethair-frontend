<template>
  <div class="grid">
    <div class="col-12 md:col-6 lg:col-3">
      <div class="surface-card shadow-2 p-3 border-round">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Transactions</span>
            <div class="text-900 font-medium text-xl">{{ tCount }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 md:col-6 lg:col-3">
      <div class="surface-card shadow-2 p-3 border-round">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Appointments</span>
            <div class="text-900 font-medium text-xl">{{ aCount }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-map-marker text-orange-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 md:col-6 lg:col-3">
      <div class="surface-card shadow-2 p-3 border-round">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Customers</span>
            <div class="text-900 font-medium text-xl">{{ cCount }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-inbox text-cyan-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
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
