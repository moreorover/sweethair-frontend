<template>
  <h3 class="text-3xl font-medium text-gray-700">Invoices</h3>

  <div class="mt-8">
    <div class="mt-6">
      <div class="flex flex-col mt-3 lg:flex-row pb-4">
        <InvoiceDialog
          header="Create new Invoice"
          label="New"
          class="btn btn-medium"
          @submit="handleCreateInvoice($event)"
        />
      </div>

      <InvoicesTable :invoices="invoices" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InvoicesTable from '@/components/invoices/InvoicesTable.vue';
import {
  useCreateInvoiceMutation,
  useInvoicesQuery,
} from '@/generated/graphql';
import { Invoice } from '@/services/InvoiceService';
import { computed } from 'vue';
import InvoiceDialog from '@/components/invoices/InvoiceDialog.vue';
import router from '@/router';

const { data, error } = await useInvoicesQuery();

const invoices = computed<Invoice[]>(() => data.value?.invoices as Invoice[]);
const createInvoiceMutation = useCreateInvoiceMutation();

const handleCreateInvoice = async (invoice: Invoice) => {
  await createInvoiceMutation
    .executeMutation({
      invoice: {
        total: invoice.total,
        isReceived: invoice.isReceived,
        isPaid: invoice.isPaid,
        scheduledAt: invoice.scheduledAt,
      },
    })
    .then((result) =>
      router.push(`/invoices/${result.data?.createInvoice.id}`)
    );
};
</script>
