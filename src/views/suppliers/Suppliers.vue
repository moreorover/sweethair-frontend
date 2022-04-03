<template>
  <Toolbar class="mb-4">
    <template #start>
      <span class="font-medium text-2xl text-900">Suppliers</span>
    </template>
    <template #end>
      <SupplierFormDialog />
    </template>
  </Toolbar>

  <DataTable
    ref="dt"
    :value="suppliers"
    dataKey="id"
    :paginator="true"
    :rows="10"
    :filters="filters"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 25]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
    responsiveLayout="scroll"
  >
    <template #header>
      <div
        class="
          table-header
          flex flex-column
          md:flex-row md:justiify-content-between
        "
      >
        <h5 class="mb-2 md:m-0 p-as-md-center">Manage Suppliers</h5>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters['global'].value"
            placeholder="Search..."
          />
        </span>
      </div>
    </template>

    <Column
      field="id"
      header="ID"
      :sortable="true"
      style="min-width: 12rem"
    ></Column>
    <Column
      field="fullName"
      header="Name"
      :sortable="true"
      style="min-width: 16rem"
    ></Column>
    <Column
      field="location"
      header="Location"
      :sortable="true"
      style="min-width: 8rem"
    >
    </Column>
    <Column :exportable="false" style="min-width: 8rem">
      <template #body="slotProps">
        <div class="flex flex-nowrap justify-content-start space-x-4">
          <Button
            label=""
            icon="pi pi-search"
            class="p-button-rounded p-button-success p-button-outlined m-2"
            @click="viewSupplier(slotProps.data)"
          />
          <SupplierFormDialog
            :supplier="slotProps.data"
            :button="{
              class: 'p-button-rounded p-button-success mr-2 pr-2 m-2',
              icon: 'pi pi-pencil',
              label: 'Edit',
            }"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSuppliersStore } from '@/store/suppliersStore';
import SupplierFormDialog from '@/components/suppliers/SupplierFormDialog.vue';
import { FilterMatchMode } from 'primevue/api';
import { Supplier } from '@/types';
import { useRouter } from 'vue-router';

const store = useSuppliersStore();
const router = useRouter();

await store.fetchAll();

const suppliers = computed(() => store.getAll);

const filters = ref<{
  global: {
    value: null;
    matchMode: string;
  };
}>({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const viewSupplier = (supplier: Supplier) => {
  router.push({ name: 'Supplier', params: { id: supplier.id } });
};
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
