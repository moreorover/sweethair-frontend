<template>
  <DataTable
    v-model:filters="filters"
    v-model:selection="selected"
    :value="customers"
    :meta-key-selection="false"
    responsive-layout="scroll"
    selection-mode="multiple"
    data-key="id"
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
  </DataTable>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { Customer } from '@/services/CustomerService';

export default defineComponent({
  name: 'MultipleCustomerPicker',
  props: {
    selectionValue: {
      type: Object as PropType<Customer[] | null | undefined>,
      required: true,
      default: () => null,
    },
  },
  emits: ['update:selectionValue'],
  setup(props, { emit }) {
    const customerStore = useCustomersStore();
    const customers = computed(() => customerStore.getAll);
    const selected = computed({
      get: () => props.selectionValue,
      set: (val) => emit('update:selectionValue', val),
    });

    customerStore.fetchAll();

    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });

    return { customers, filters, selected };
  },
});
</script>
<style scoped></style>
