<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { FilterMatchMode } from 'primevue/api';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Customer } from '../services/CustomersService';
import { useCustomers } from '../store/customersStore';

const router = useRouter();

const customersStore = useCustomers();
const customers = computed(() => customersStore.getAll);

const blankCustomer: Customer = {
  id: -1,
  fullName: '',
  about: '',
  email: '',
  instagram: '',
  location: '',
};

const customer = ref<Customer>({ ...blankCustomer });
const customerDialog = ref(false);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const openNew = () => {
  customer.value = { ...blankCustomer };
  customerDialog.value = true;
};

const editCustomer = (c: Customer) => {
  customer.value = { ...c };
  customerDialog.value = true;
};

const viewCustomer = (customer: Customer) => {
  router.push({ name: 'Customer', params: { id: customer.id } });
};

const rules = {
  fullName: { required, minLength: minLength(3) },
  location: {},
  about: {},
  email: { email },
  instagram: {},
};

const hideDialog = () => {
  customerDialog.value = false;
};

const saveCustomer = async () => {
  const result = await v$.value.$validate();

  if (!result) {
    // notify user form is invalid
    return;
  }

  if (customer.value.id < 0) {
    await customersStore.create(customer.value);
    customerDialog.value = false;
  }
  if (customer.value.id > 0) {
    await customersStore.update(customer.value);
    customerDialog.value = false;
  }
};

const v$ = useVuelidate(rules, customer);

customersStore.fetchAll();
</script>
<template>
  <h3 class="tw-pb-4 tw-text-3xl tw-font-medium tw-text-gray-700">Customers</h3>

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
        :value="customers"
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
            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Customers</h5>
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
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editCustomer(slotProps.data)"
            />
            <Button
              icon="pi pi-search"
              class="p-button-rounded p-button-primary"
              @click="viewCustomer(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="customerDialog"
      :style="{ width: '450px' }"
      header="Supplier Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="customer.fullName"
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
          v-model="customer.about"
          required="false"
          rows="3"
          cols="20"
        />
      </div>

      <div class="field">
        <label for="about">Location</label>
        <InputText id="location" v-model="customer.location" required="false" />
      </div>

      <div class="field">
        <label for="about">Email</label>
        <InputText id="email" v-model="customer.email" required="false" />
        <small class="p-error" v-for="er of v$.email.$errors">{{
          er.$message
        }}</small>
      </div>

      <div class="field">
        <label for="about">Instagram</label>
        <InputText
          id="location"
          v-model="customer.instagram"
          required="false"
        />
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
          @click="saveCustomer"
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
