<script setup lang="ts">
import { computed } from '@vue/reactivity';
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Product } from '../services/ProductsService';
import { PurchaseDetail } from '../services/PurchaseDetailsService';
import { useProducts } from '../store/productsStore';
import { usePurchase } from '../store/purchaseStore';

const purchaseStore = usePurchase();
const route = useRoute();
const id: number = +route.params.id;
purchaseStore.setId(id);
const purchase = computed(() => purchaseStore.purchase);

const productsStore = useProducts();
const products = computed(() => productsStore.getAll);

const blankPurchaseDetail: PurchaseDetail = {
  id: -1,
  quantity: 0,
  total: 0,
  purchaseId: id,
  productId: -1,
};

const purchaseDetail = ref<PurchaseDetail>({ ...blankPurchaseDetail });
const purchaseDetailDialog = ref(false);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const openNew = () => {
  purchaseDetail.value = { ...blankPurchaseDetail };
  purchaseDetailDialog.value = true;
  optionMade.value = false;
};

const editPurchaseDetail = (c: PurchaseDetail) => {
  purchaseDetail.value = { ...c };
  purchaseDetailDialog.value = true;
};

const rules = {
  quantity: { required },
  total: { required },
  productId: { required },
};

const hideDialog = () => {
  purchaseDetailDialog.value = false;
};

const savePurchaseDetail = async () => {
  const result = await v$.value.$validate();
  const result2 = await vProduct$.value.$validate();

  if (!result && !result2) {
    // notify user form is invalid
    return;
  }

  if (purchaseDetail.value.id < 0) {
    if (optionMade.value && existingProduct.value) {
      await purchaseStore.createPurchaseDetail(purchaseDetail.value);
      purchaseDetailDialog.value = false;
    }

    if (optionMade.value && !existingProduct.value) {
      const newProduct = await productsStore.create(product.value);
      productsStore.fetchAll();

      if (!newProduct) return;

      await purchaseStore.createPurchaseDetail({
        id: -1,
        quantity: purchaseDetail.value.quantity,
        total: purchaseDetail.value.total,
        purchaseId: id,
        productId: newProduct.id,
      });
      purchaseDetailDialog.value = false;
    }
  }

  //   if (purchaseDetail.value.id > 0) {
  //     await productsStore.update(purchaseDetail.value);
  //     purchaseDetailDialog.value = false;
  //   }
};

const v$ = useVuelidate(rules, purchaseDetail);

const optionMade = ref(false);
const existingProduct = ref(true);

const optionCreateNewProduct = () => {
  optionMade.value = true;
  existingProduct.value = false;
};

const optionExistingProduct = () => {
  optionMade.value = true;
  existingProduct.value = true;
};

const blankProduct: Product = {
  id: -1,
  title: '',
  description: '',
  unique: false,
  currentStock: 0,
  startingStock: 0,
  measurement: 'G',
};

const product = ref<Product>({ ...blankProduct });

const productRules = {
  title: { required, minLength: minLength(3) },
  description: { required, minLength: minLength(3) },
};

const vProduct$ = useVuelidate(productRules, product);

purchaseStore.fetchPurchase();
productsStore.fetchAll();
</script>
<template>
  <h3 class="tw-pb-4 tw-text-3xl tw-font-medium tw-text-gray-700">Purchase</h3>
  Purchase id: {{ $route.params.id }} {{ purchase }}
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
        :value="purchase?.purchaseDetails"
        dataKey="id"
        class="p-datatable-sm"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 100]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        responsiveLayout="stack"
      >
        <template #header>
          <div
            class="table-header tw-flex-column md:tw-justiify-content-between tw-flex md:tw-flex-row"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Purchase</h5>
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
          field="productId"
          header="Product"
          :sortable="true"
          style="min-width: 4rem"
        ></Column>
        <Column
          field="quantity"
          header="Quantity"
          :sortable="true"
          style="min-width: 8rem"
        ></Column>
        <Column
          field="total"
          header="Total"
          :sortable="true"
          style="min-width: 16rem"
        >
        </Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editPurchaseDetail(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="purchaseDetailDialog"
      :style="{ width: '450px' }"
      header="Product Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field" v-show="!optionMade">
        <label for="name">Pick Product instance?</label>
        <div class="tw-flex tw-flex tw-justify-around tw-space-x-4">
          <Button
            @click="optionExistingProduct"
            label="Pick existing Product"
            class="p-button-outlined"
          />
          <Button
            @click="optionCreateNewProduct"
            label="Create new Product"
            class="p-button-outlined"
          />
        </div>
      </div>
      <div class="field" v-show="optionMade && existingProduct">
        <label for="name">Product</label>
        <Dropdown
          v-model="purchaseDetail.productId"
          :options="products"
          optionLabel="title"
          optionValue="id"
          placeholder="Select a Product"
        />
        <small class="p-error" v-for="er of v$.productId.$errors">{{
          er.$message
        }}</small>
      </div>
      <div class="field" v-show="optionMade && !existingProduct">
        <label for="name">Create New Product</label>
        <div class="field">
          <label for="name">Title</label>
          <InputText
            id="name"
            v-model.trim="product.title"
            required="true"
            autofocus
            :class="{ 'p-invalid': vProduct$.title.$errors.length > 1 }"
          />
          <small class="p-error" v-for="er of vProduct$.title.$errors">{{
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
          <InputSwitch v-model="product.unique" />
        </div>

        <div class="field">
          <label for="about">Unit Measurement</label>
          <Dropdown
            v-model="product.measurement"
            :options="[
              { name: 'KG', title: 'Kilogram' },
              { name: 'G', title: 'Grams' },
              { name: 'L', title: 'Litres' },
              { name: 'ML', title: 'Millilitres' },
              { name: 'UNIT', title: 'Units' },
            ]"
            optionLabel="title"
            optionValue="name"
            placeholder="Select a Measurement"
          />
        </div>
      </div>
      <div class="field">
        <label for="name">Quantity</label>
        <InputNumber
          id="quantity"
          v-model="purchaseDetail.quantity"
          mode="decimal"
          :useGrouping="false"
        />
        <small class="p-error" v-for="er of v$.quantity.$errors">{{
          er.$message
        }}</small>
      </div>
      <div class="field">
        <label for="name">Total</label>
        <InputNumber
          id="quantity"
          v-model="purchaseDetail.total"
          mode="decimal"
          :useGrouping="false"
        />
        <small class="p-error" v-for="er of v$.total.$errors">{{
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
          @click="savePurchaseDetail"
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
