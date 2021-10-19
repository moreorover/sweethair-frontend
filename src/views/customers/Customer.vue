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

  <div class="px-0 py-4 md:px-4">
    <div class="border-2 surface-border border-round surface-card">
      <DataTable
        :value="customerTransactions"
        responsive-layout="scroll"
        class="p-datatable-sm"
        :paginator="true"
        :rows="10"
        filter-display="menu"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
      >
        <template #header>
          <div class="p-d-flex p-jc-between p-ai-center">
            <h5 class="p-m-0">Transactions</h5>

            <div class="flex">
              <new-transaction :customer="customer" />
            </div>
          </div>
        </template>
        <template #empty> No transactions found. </template>
        <Column field="total" header="Total" :sortable="true"></Column>
        <Column field="isPaid" header="Paid" :sortable="true">
          <template #body="slotProps">
            <Tag v-if="slotProps.data.isPaid" class="p-mr-2" severity="success" value="Paid"></Tag>
            <Tag v-else class="p-mr-2" severity="warning" value="Waiting"></Tag>
          </template>
        </Column>
        <Column header="Scheduled">
          <template #body="slotProps"> {{ format(new Date(slotProps.data.date), 'dd/mm/yyyy') }} </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <edit-transaction :transaction-value="slotProps.data" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCustomersStore } from '@/store/customersStore';
import { format } from 'date-fns';
import NewTransaction from '../transactions/NewTransaction.vue';
import EditTransaction from '../transactions/EditTransaction.vue';
import { useTransactionsStore } from '@/store/transactionsStore';

export default defineComponent({
  components: { NewTransaction, EditTransaction },
  setup() {
    const customersStore = useCustomersStore();
    const transactionsStore = useTransactionsStore();
    const id = useRoute().params.id as string;

    customersStore.fetchAll();
    transactionsStore.fetchAll();

    const customer = computed(() => customersStore.getCustomerById(id));
    const customerTransactions = computed(() => transactionsStore.getTransactionsByCustomer(customer.value));

    if (!customer.value) {
      throw Error('Customer was not found.');
    }

    return { customer, customerTransactions, format };
  },
});
</script>
