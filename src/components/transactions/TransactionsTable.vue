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
          <transaction-modal header="Create New Transaction" label="New" />
        </div>
      </div>
    </template>
    <template #empty> No transactions found. </template>
    <Column header="Scheduled">
      <template #body="slotProps"> {{ format(new Date(slotProps.data.date), 'dd/MM/yyyy') }} </template>
    </Column>
    <Column field="isPaid" header="Paid" :sortable="true"></Column>
    <Column field="total" header="Total"></Column>
    <Column header="Customer">
      <template #body="slotProps">
        {{ slotProps.data.customer?.fullName }}
      </template>
    </Column>
    <Column header-style="width: 4rem; text-align: center" body-style="text-align: center; overflow: visible">
      <template #body="slotProps">
        <transaction-modal :transaction="slotProps.data" header="Update Transaction" label="Edit" />
      </template>
    </Column>
    <Column header-style="width: 4rem; text-align: center" body-style="text-align: center; overflow: visible">
      <template #body="slotProps">
        <Button class="p-button-sm" label="Delete" @click="deleteTransaction(slotProps.data)"></Button>
      </template>
    </Column>
  </DataTable>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Transaction } from '@/services/TransactionService';
import { format } from 'date-fns';
import { useTransactionsStore } from '@/store/transactionsStore';
import TransactionModal from './TransactionModal.vue';

export default defineComponent({
  name: 'TransactionsTable',
  components: { TransactionModal },
  props: {
    transactions: {
      type: Object as () => Transaction[],
      required: true,
    },
  },
  setup() {
    const transactionsStore = useTransactionsStore();
    const deleteTransaction = (transaction: Transaction) => {
      transactionsStore.delete(transaction);
    };
    return { format, deleteTransaction };
  },
});
</script>
<style scoped></style>
