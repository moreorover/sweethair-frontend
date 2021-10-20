<template>
  <DataTable
    v-model:filters="filters"
    :value="customers"
    responsive-layout="stack"
    class="p-datatable-sm"
    :paginator="true"
    :rows="10"
    filter-display="menu"
    :global-filter-fields="['firstName', 'lastName', 'email', 'instagram']"
    paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rows-per-page-options="[10, 25, 50]"
    current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
  >
    <template #header>
      <div class="p-d-flex p-jc-between p-ai-center">
        <h5 class="p-m-0">Customers</h5>

        <div class="flex">
          <new-customer />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </span>
        </div>
      </div>
    </template>
    <template #empty> No customers found. </template>
    <Column field="firstName" header="First Name" :sortable="true"></Column>
    <Column field="lastName" header="Last Name" :sortable="true"></Column>
    <Column field="email" header="Email"></Column>
    <Column field="instagram" header="Instagram"></Column>
    <Column header-style="width: 4rem; text-align: center" body-style="text-align: center; overflow: visible">
      <template #body="slotProps">
        <edit-customer :customer-value="slotProps.data" action="Edit" />
      </template>
    </Column>
    <Column header-style="width: 4rem; text-align: center" body-style="text-align: center; overflow: visible">
      <template #body="slotProps">
        <new-transaction :customer="slotProps.data" action="+Transaction" />
      </template>
    </Column>
    <Column
      v-if="viewCustomer"
      header-style="width: 4rem; text-align: center"
      body-style="text-align: center; overflow: visible"
    >
      <template #body="slotProps">
        <router-link v-slot="{ navigate }" :to="{ name: `Customer`, params: { id: slotProps.data.id } }" custom>
          <Button class="p-button-sm" type="button" icon="pi pi-search" @click="navigate" />
        </router-link>
      </template>
    </Column>
  </DataTable>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Customer } from '@/services/CustomerService';
import NewCustomer from '@/components/customers/NewCustomer.vue';
import EditCustomer from '@/components/customers/EditCustomer.vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import NewTransaction from '@/components/transactions/NewTransaction.vue';

export default defineComponent({
  name: 'CustomersTable',
  components: { NewCustomer, EditCustomer, NewTransaction },
  props: {
    customers: {
      type: Object as () => Customer[],
      required: true,
    },
    viewCustomer: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['rowClicked'],
  setup() {
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });

    return { filters };
  },
});
</script>
<style scoped></style>
