<template>
  <div class="flex justify-between">
    <h3 class="text-3xl font-medium text-gray-700">
      {{ invoiceFormattedDate }} {{ invoice.total }}
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
                @submit="handleCreateTransaction($event)"
              />
            </div>
          </div>
          <TransactionsTable :transactions="invoiceTransactions">
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
          <ItemsTable :items="invoiceItems">
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
import { useInvoicesStore } from '@/store/invoicesStore';
import { Invoice } from '@/services/InvoiceService';
import moment from 'moment';
import TransactionDialog from '@/components/transactions/TransactionDialog.vue';
import { Transaction } from '@/services/TransactionService';
import { useTransactionsStore } from '@/store/transactionsStore';
import TransactionsTable from '@/components/transactions/TransactionsTable.vue';
import { useItemsStore } from '@/store/itemsStore';
import { Item } from '@/services/ItemService';
import ItemsTable from '@/components/items/ItemsTable.vue';
import ItemDialog from '@/components/items/ItemDialog.vue';
import TransactionActions from '@/components/transactions/TransactionActions.vue';

const route = useRoute();
const router = useRouter();
const id: number = +route.params.id;

const invoicesStore = useInvoicesStore();
const transactionsStore = useTransactionsStore();
const itemsStore = useItemsStore();
if (invoicesStore.shouldLoadState) await invoicesStore.fetchAll();
if (!invoicesStore.getIds.includes(id))
  router.replace({ name: 'Transactions' });

if (transactionsStore.shouldLoadState) await transactionsStore.fetchAll();
if (itemsStore.shouldLoadState) await itemsStore.fetchAll();

const invoice = computed<Invoice>(() => invoicesStore.getInvoiceById(id));

const invoiceFormattedDate = computed(() =>
  moment(invoice.value.scheduledAt).format('d MMMM yyyy')
);

const invoiceTransactions = computed<Transaction[]>(() =>
  transactionsStore.getTransactionsByInvoice(invoice.value)
);

const invoiceItems = computed<Item[]>(() =>
  itemsStore.getItemsByInvoice(invoice.value)
);

const transactionsTotal = computed<number>(() =>
  invoiceTransactions.value.reduce(
    (acc, transaction) => acc + transaction.total,
    0
  )
);

const deleteItem = async (item: Item) => {
  console.log({ item });
  await itemsStore.delete(item);
};

const itemsTotal = computed<number>(() =>
  invoiceItems.value.reduce((acc, item) => acc + item.total, 0)
);

const handleCreateTransaction = (transaction: Transaction) => {
  console.log({ transaction });
};
</script>
