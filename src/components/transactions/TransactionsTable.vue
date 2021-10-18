<template>
  <DataTable
    :value="transactions"
    responsive-layout="stack"
    class="p-datatable-sm"
    :paginator="true"
    :rows="10"
    paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rows-per-page-options="[10, 25, 50]"
    current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
  >
    <template #header>
      <div class="p-d-flex p-jc-between p-ai-center">
        <h5 class="p-m-0">Transactions</h5>

        <div class="flex">
          <new-transaction />
        </div>
      </div>
    </template>
    <template #empty> No transactions found. </template>
    <Column field="date" header="Scheduled" :sortable="true"></Column>
    <Column field="isPaid" header="Paid" :sortable="true"></Column>
    <Column field="total" header="Total"></Column>
    <Column header-style="width: 4rem; text-align: center" body-style="text-align: center; overflow: visible">
      <template #body="slotProps">
        <edit-transaction :transaction-value="slotProps.data" />
      </template>
    </Column>
  </DataTable>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import NewTransaction from '@/views/transactions/NewTransaction.vue';
import EditTransaction from '@/views/transactions/EditTransaction.vue';
import { Transaction } from '@/services/TransactionService';

export default defineComponent({
  name: 'TransactionsTable',
  components: { NewTransaction, EditTransaction },
  props: {
    transactions: {
      type: Object as () => Transaction[],
      required: true,
    },
  },
});
</script>
<style scoped></style>
