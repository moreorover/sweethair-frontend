<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, minLength, required, url } from '@vuelidate/validators';
import { FilterMatchMode } from 'primevue/api';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Supplier } from '../services/SuppliersService';
import { useSuppliers } from '../store/suppliersStore';

const router = useRouter();

const suppliersStore = useSuppliers();
const suppliers = computed(() => suppliersStore.getAll);

const blankSupplier: Supplier = {
  id: -1,
  fullName: '',
  about: '',
  email: '',
  instagram: '',
  location: '',
  url: '',
};

const supplier = ref<Supplier>({ ...blankSupplier });
const supplierDialog = ref(false);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const openNew = () => {
  supplier.value = { ...blankSupplier };
  supplierDialog.value = true;
};

const editSupplier = (s: Supplier) => {
  supplier.value = { ...s };
  supplierDialog.value = true;
};

const viewSupplier = (supplier: Supplier) => {
  router.push({ name: 'Supplier', params: { id: supplier.id } });
};

const rules = {
  fullName: { required, minLength: minLength(3) },
  location: {},
  about: {},
  email: { email },
  instagram: {},
  url: { url },
};

const hideDialog = () => {
  supplierDialog.value = false;
};

const saveSupplier = async () => {
  const result = await v$.value.$validate();

  if (!result) {
    // notify user form is invalid
    return;
  }

  if (supplier.value.id < 0) {
    await suppliersStore.create(supplier.value);
    supplierDialog.value = false;
  }
  if (supplier.value.id > 0) {
    await suppliersStore.update(supplier.value);
    supplierDialog.value = false;
  }
};

const v$ = useVuelidate(rules, supplier);

suppliersStore.fetchAll();
</script>
<template>
  <h3 class="tw-pb-4 tw-text-3xl tw-font-medium tw-text-gray-700">Suppliers</h3>

  <div>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="suppliers"
        dataKey="id"
        class="p-datatable-sm"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        responsiveLayout="stack"
      >
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justiify-content-between"
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
        <Column
          field="email"
          header="Email"
          :sortable="true"
          style="min-width: 10rem"
        ></Column>
        <Column
          field="instagram"
          header="Instagram"
          :sortable="true"
          style="min-width: 12rem"
        >
        </Column>
        <Column
          field="url"
          header="Url"
          :sortable="true"
          style="min-width: 12rem"
        >
        </Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editSupplier(slotProps.data)"
            />
            <Button
              icon="pi pi-search"
              class="p-button-rounded p-button-primary"
              @click="viewSupplier(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="supplierDialog"
      :style="{ width: '450px' }"
      header="Supplier Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="supplier.fullName"
          required="true"
          autofocus
          :class="{ 'p-invalid': v$.fullName.$errors.length > 1 }"
        />
        <small class="p-error" v-for="er of v$.fullName.$errors">{{
          er.$message
        }}</small>
      </div>
      <div class="field">
        <label for="about">About</label>
        <Textarea
          id="description"
          v-model="supplier.about"
          required="false"
          rows="3"
          cols="20"
        />
      </div>

      <div class="field">
        <label for="about">Location</label>
        <InputText id="location" v-model="supplier.location" required="false" />
      </div>

      <div class="field">
        <label for="about">Email</label>
        <InputText id="email" v-model="supplier.email" required="false" />
        <small class="p-error" v-for="er of v$.email.$errors">{{
          er.$message
        }}</small>
      </div>

      <div class="field">
        <label for="about">Instagram</label>
        <InputText
          id="location"
          v-model="supplier.instagram"
          required="false"
        />
      </div>

      <div class="field">
        <label for="about">Website URL</label>
        <InputText id="location" v-model="supplier.url" required="false" />
        <small class="p-error" v-for="er of v$.url.$errors">{{
          er.$message
        }}</small>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveSupplier"
        />
      </template>
    </Dialog>
  </div>
</template>

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
