<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { FilterMatchMode } from 'primevue/api';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Product } from '../services/ProductsService';
import { useProducts } from '../store/productsStore';

const router = useRouter();

const productsStore = useProducts();
const products = computed(() => productsStore.getAll);

const blankProduct: Product = {
  id: -1,
  title: '',
  description: '',
  canReorder: false,
  currentStock: 0,
  startingStock: 0,
  measurement: 'UNIT',
};

const product = ref<Product>({ ...blankProduct });
const productDialog = ref(false);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const openNew = () => {
  product.value = { ...blankProduct };
  productDialog.value = true;
};

const editProduct = (c: Product) => {
  product.value = { ...c };
  productDialog.value = true;
};

const viewProduct = (product: Product) => {
  router.push({ name: 'Product', params: { id: product.id } });
};

const rules = {
  title: { required, minLength: minLength(3) },
  description: { required, minLength: minLength(3) },
};

const hideDialog = () => {
  productDialog.value = false;
};

const saveProduct = async () => {
  const result = await v$.value.$validate();

  if (!result) {
    // notify user form is invalid
    return;
  }

  if (product.value.id < 0) {
    await productsStore.create(product.value);
    productDialog.value = false;
  }
  if (product.value.id > 0) {
    await productsStore.update(product.value);
    productDialog.value = false;
  }
};

const v$ = useVuelidate(rules, product);

productsStore.fetchAll();
</script>
<template>
  <h3 class="tw-pb-4 tw-text-3xl tw-font-medium tw-text-gray-700">Products</h3>

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
        :value="products"
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
            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Products</h5>
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
          style="min-width: 4rem"
        ></Column>
        <Column
          field="title"
          header="Title"
          :sortable="true"
          style="min-width: 8rem"
        ></Column>
        <Column
          field="description"
          header="Description"
          :sortable="true"
          style="min-width: 16rem"
        >
        </Column>
        <Column
          field="canReorder"
          header="Unique?"
          :sortable="true"
          style="min-width: 6rem"
        ></Column>
        <Column
          field="startingStock"
          header="Initial Stock Count"
          :sortable="true"
          style="min-width: 6rem"
        >
        </Column>
        <Column
          field="currentStock"
          header="Current Stock Count"
          :sortable="true"
          style="min-width: 6rem"
        >
        </Column>
        <Column
          field="measurement"
          header="Measurement"
          :sortable="true"
          style="min-width: 6rem"
        >
        </Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-search"
              class="p-button-rounded p-button-primary"
              @click="viewProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Product Details"
      :modal="true"
      class="p-fluid"
    >
      {{ product }}
      <div class="field">
        <label for="name">Title</label>
        <InputText
          id="name"
          v-model.trim="product.title"
          required="true"
          autofocus
          :class="{ 'p-invalid': v$.title.$errors.length > 1 }"
        />
        <small class="p-error" v-for="er of v$.title.$errors">{{
          er.$message
        }}</small>
      </div>
      <div class="field">
        <label for="about">Description</label>
        <Textarea
          id="description"
          v-model="product.description"
          required="false"
          rows="3"
          cols="20"
        />
      </div>

      <div class="field">
        <label for="about" class="tw-mr-4">Can be reordered?</label>
        <InputSwitch v-model="product.canReorder" />
      </div>

      <div class="field">
        <label for="about">Starting stock</label>
        <InputNumber
          id="startingStock"
          v-model="product.startingStock"
          mode="decimal"
          :useGrouping="false"
        />
      </div>

      <div class="field">
        <label for="about">Current stock</label>
        <InputNumber
          id="currentStock"
          v-model="product.currentStock"
          mode="decimal"
          :useGrouping="false"
        />
      </div>

      <div class="field">
        <label for="about">Unit Measurement</label>
        <Dropdown
          v-model="product.measurement"
          :options="[
            { name: 'KG' },
            { name: 'G' },
            { name: 'L' },
            { name: 'ML' },
            { name: 'UNIT' },
          ]"
          optionLabel="name"
          optionValue="name"
          placeholder="Select a Measurement"
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
          @click="saveProduct"
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
