<template>
  <h3 class="text-3xl font-medium text-gray-700">Invoices</h3>

  <div class="flex flex-col mx-auto gap-4 pt-3">
    <div class="container flex flex-col mx-auto" v-if="invoices.length > 0">
      <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <span class="font-bold text-md text-black ml-2">Invoices</span>
          </div>
        </div>
        <div class="container flex flex-col mx-auto gap-4 pl-8">
          <div class="flex text-center justify-between">
            <div class="flex items-center">
              <!-- <TransactionDialog
                header="Book a Transaction"
                label="Book Transaction"
                :appointment="appointment"
                class="btn btn-small"
              /> -->
            </div>
          </div>
          <InvoicesTable :invoices="invoices" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Invoice } from '@/services/InvoiceService';
import { useInvoicesStore } from '@/store/invoicesStore';
import { computed } from 'vue';
import InvoicesTable from '@/components/invoices/InvoicesTable.vue';

const invoicesStore = useInvoicesStore();
if (invoicesStore.shouldLoadState) await invoicesStore.fetchAll();
const invoices = computed<Invoice[]>(() => invoicesStore.getAll);
</script>
