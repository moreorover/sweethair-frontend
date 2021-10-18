<template>
  <div class="px-0 py-4 md:px-4">
    <div class="border-2 surface-border border-round surface-card">
      <DataTable
        v-model:filters="filters"
        :value="customers"
        responsive-layout="scroll"
        class="p-datatable-sm"
        :paginator="true"
        :rows="10"
        filter-display="menu"
        :global-filter-fields="['firstName', 'lastName', 'email', 'instagram']"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
        @row-click="rowClicked"
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
            <edit-customer :customer-value="slotProps.data" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import NewCustomer from '@/components/customers/NewCustomer.vue';
import EditCustomer from '@/components/customers/EditCustomer.vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import router from '@/router';

export default defineComponent({
  name: 'Customers',
  components: { NewCustomer, EditCustomer },
  setup() {
    const store = useCustomersStore();

    store.fetchAll();

    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });

    const customers = computed(() => store.getAll);

    const rowClicked = (data) => {
      router.push({ name: 'Customer', params: { id: data.data.id } });
    };

    return { customers, filters, rowClicked };
  },
});
</script>
<style scoped></style>
