<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">
      {{ invoiceFormattedDate }}
    </h3>
  </div>

  <div class="flex flex-col mx-auto gap-4 pt-3">
    <div class="grid grid-cols-2 gap-4">
      <div class="container flex flex-col max-w text-center">
        <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
          <span class="font-bold text-md text-black ml-2"
            >Transactions total: {{ transactionsTotal.toFixed(2) }}</span
          >
        </div>
      </div>
      <div class="container flex flex-col max-w text-center">
        <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
          <span class="font-bold text-md text-black ml-2"
            >Items total: {{ itemsTotal.toFixed(2) }}</span
          >
        </div>
      </div>
    </div>
    <div class="container flex flex-col mx-auto">
      <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <span class="font-bold text-md text-black ml-2">Transactions</span>
          </div>
        </div>
        <div class="container flex flex-col mx-auto gap-4 pl-8">
          <div class="flex text-center justify-between">
            <div class="flex items-center">
              <span class="font-semibold text-md text-black">Transactions</span>
            </div>
            <div class="flex items-center">
              <TransactionDialog
                header="Book a Transaction"
                label="Book Transaction"
                :invoice="invoice"
                class="btn btn-small"
              />
            </div>
          </div>
          <TransactionsTable :transactions="invoice.transactions || []">
            <template v-slot:actions="slotProps">
              <TransactionActions
                :transaction="slotProps.transaction"
                :customer="slotProps.customer"
                :appointment="slotProps.appointment"
              />
            </template>
          </TransactionsTable>
        </div>
      </div>
    </div>

    <div class="container flex flex-col mx-auto">
      <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <span class="font-bold text-md text-black ml-2">Items</span>
          </div>
        </div>
        <div class="container flex flex-col mx-auto gap-4 pl-8">
          <div class="flex text-center justify-between">
            <div class="flex items-center">
              <span class="font-semibold text-md text-black">Items</span>
            </div>
            <div class="flex items-center">
              <ItemDialog
                header="Book a Item"
                label="Book Item"
                :invoice="invoice"
                class="btn btn-small"
              />
            </div>
          </div>
          <ItemsTable :items="invoice.items || []">
            <template v-slot:actions="slotProps">
              <ItemDialog
                header="Edit Item"
                label="Edit"
                class="text-link"
                :item="slotProps.item"
                :invoice="invoice"
              />
              <BaseConfirmDialog
                header="Confirm to Delete Item"
                label="Delete"
                @confirm="deleteItem(slotProps.item)"
                class="text-link px-1"
              />
            </template>
          </ItemsTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Invoice } from '@/services/InvoiceService';
import moment from 'moment';
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';
import TransactionsTable from '@/components/transactions/TransactionsTable.vue';
import { Item } from '@/services/ItemService';
import ItemsTable from '@/components/items/ItemsTable.vue';
import ItemDialog from '@/components/items/ItemDialog.vue';
import TransactionActions from '@/components/transactions/TransactionActions.vue';
import { useInvoiceQuery } from '@/generated/graphql';

const route = useRoute();
const router = useRouter();
const id: number = +route.params.id;

const { data, error } = await useInvoiceQuery({
  variables: { invoiceId: id },
});

if (data.value?.invoice == null) router.replace({ name: 'Invoices' });

const invoice = computed<Invoice>(() => data.value?.invoice as Invoice);

const invoiceFormattedDate = computed(() =>
  moment(invoice.value.scheduledAt).format('DD MMMM yyyy')
);

const transactionsTotal = computed<number>(
  () =>
    invoice.value.transactions?.reduce(
      (acc, transaction) =>
        transaction.type === 'IN'
          ? acc + transaction.total
          : acc - transaction.total,
      0
    ) || 0
);

const deleteItem = async (item: Item) => {
  console.log('deleteItem', { item });
};

const itemsTotal = computed<number>(
  () => invoice.value.items?.reduce((acc, item) => acc + item.total, 0) || 0
);
</script>
