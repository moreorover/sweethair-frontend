<template>
  <div class="px-0 py-4 md:px-4">
    <div class="border-2 surface-border border-round surface-card">
      <div class="surface-section p-5">
        <div class="flex align-items-start flex-column lg:flex-row lg:justify-content-between">
          <div class="flex align-items-start flex-column md:flex-row">
            <div>
              <span class="text-900 font-medium text-3xl">{{ customer?.firstName }} {{ customer?.lastName }}</span>
              <div class="flex align-items-center flex-wrap text-sm">
                <div class="mr-5 mt-3">
                  <span class="font-medium text-500">EMAIL</span>
                  <div class="text-700 mt-2">{{ customer?.email }}</div>
                </div>
                <div class="mr-5 mt-3">
                  <span class="font-medium text-500">INSTAGRAM</span>
                  <div class="text-700 mt-2">{{ customer?.instagram }}</div>
                </div>
                <div class="mr-5 mt-3">
                  <span class="font-medium text-500">Transactions</span>
                  <div class="text-700 mt-2">{{ customer?.transactions?.length }}</div>
                </div>
                <div class="mr-5 mt-3">
                  <span class="font-medium text-500">Appointments</span>
                  <div class="text-700 mt-2">{{ customer?.appointments?.length }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCustomersStore } from '@/store/customersStore';

export default defineComponent({
  components: {},
  setup() {
    const store = useCustomersStore();
    const id = useRoute().params.id as string;

    store.fetchAll();

    const customer = computed(() => store.getCustomerById(id));

    if (!customer.value) {
      throw Error('Customer was not found.');
    }

    return { customer };
  },
});
</script>
