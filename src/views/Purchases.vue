<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { format, isValid } from 'date-fns';
import { FilterMatchMode } from 'primevue/api';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Purchase } from '../services/PurchasesService';
import { usePurchases } from '../store/purchasesStore';
import { useSuppliers } from '../store/suppliersStore';

const router = useRouter();

const purchasesStore = usePurchases();
const suppliersStore = useSuppliers();
const purchases = computed(() => purchasesStore.getAll);
const suppliers = computed(() => suppliersStore.getAll);

const blankPurchase: Purchase = {
  id: -1,
  orderedAt: new Date(),
  arrivesAt: new Date(),
  arrived: false,
  total: 0,
  supplierId: -1,
};

const purchase = ref<Purchase>({ ...blankPurchase });
const purchaseDialog = ref(false);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const openNew = () => {
  purchase.value = { ...blankPurchase };
  purchaseDialog.value = true;
};

const editPurchase = (c: Purchase) => {
  purchase.value = { ...c };
  purchaseDialog.value = true;
};

const viewPurchase = (purchase: Purchase) => {
  router.push({ name: 'Purchase', params: { id: purchase.id } });
};

const totalRule = (value: any) => value >= 0;
const isDate = (value: any) => isValid(new Date(value));
const formatDate = (value: string) => format(new Date(value), 'MM/dd/yyyy');
const supplierRule = (value: any) => value > 0;

const rules = {
  orderedAt: { required, isDate },
  arrivesAt: { required, isDate },
  arrived: { required },
  total: { totalRule },
  supplierId: { required, supplierRule },
};

const hideDialog = () => {
  purchaseDialog.value = false;
};

const savePurchase = async () => {
  const result = await v$.value.$validate();

  if (!result) {
    console.log({ result });
    // notify user form is invalid
    return;
  }

  if (purchase.value.id < 0) {
    await purchasesStore.create(purchase.value);
    purchaseDialog.value = false;
  }
  if (purchase.value.id > 0) {
    await purchasesStore.update(purchase.value);
    purchaseDialog.value = false;
  }
};

const v$ = useVuelidate(rules, purchase);

const supplierById = (id: number) =>
  computed(
    () => suppliers.value.length > 0 && suppliers.value.find((s) => s.id === id)
  );

purchasesStore.fetchAll();
suppliersStore.fetchAll();
</script>
<template>
  <h3 class="tw-pb-4 tw-text-3xl tw-font-medium tw-text-gray-700">Purchases</h3>

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
        :value="purchases"
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
            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Purchases</h5>
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
          field="orderedAt"
          header="Ordered"
          :sortable="true"
          style="min-width: 16rem"
        >
          <template #body="slotProps">
            {{ formatDate(slotProps.data.orderedAt) }}
          </template>
        </Column>
        <Column
          field="arrivesAt"
          header="Arrives"
          :sortable="true"
          style="min-width: 8rem"
        >
          <template #body="slotProps">
            {{ formatDate(slotProps.data.arrivesAt) }}
          </template>
        </Column>
        <Column
          field="arrived"
          header="Arrived"
          :sortable="true"
          style="min-width: 10rem"
        >
          <template #body="slotProps">
            <div
              :class="[
                slotProps.data.arrived
                  ? 'tw-border-green-700 tw-bg-green-700'
                  : 'tw-border-red-700 tw-bg-red-700',
              ]"
              class="tw-m-1 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-border tw-bg-white tw-py-1 tw-px-2 tw-font-medium tw-text-red-100"
            >
              <div
                class="tw-h-3 tw-max-w-full tw-flex-initial tw-text-xs tw-font-normal tw-leading-none"
              ></div>
            </div>
          </template>
        </Column>
        <Column
          field="total"
          header="Total"
          :sortable="true"
          style="min-width: 12rem"
        >
          <template #body="slotProps"> £ {{ slotProps.data.total }} </template>
        </Column>
        <Column
          field="supplierId"
          header="Supplier"
          :sortable="true"
          style="min-width: 12rem"
        >
          <template #body="slotProps">
            {{ supplierById(slotProps.data.supplierId).value.fullName }}
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editPurchase(slotProps.data)"
            />
            <Button
              icon="pi pi-search"
              class="p-button-rounded p-button-primary"
              @click="viewPurchase(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="purchaseDialog"
      :style="{ width: '450px' }"
      header="Purchase Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Supplier</label>
        <Dropdown
          v-model="purchase.supplierId"
          :options="suppliers"
          optionLabel="fullName"
          optionValue="id"
          placeholder="Select a Supplier"
        />
        <small class="p-error" v-for="er of v$.supplierId.$errors">{{
          er.$message
        }}</small>
      </div>

      <div class="field">
        <label for="name">When Ordered?</label>
        <Calendar
          id="orderedAt"
          v-model="purchase.orderedAt"
          autocomplete="off"
        />
        <small class="p-error" v-for="er of v$.orderedAt.$errors">{{
          er.$message
        }}</small>
      </div>
      <div class="field">
        <label for="name">When Arrives?</label>
        <Calendar
          id="arrivesAt"
          v-model="purchase.arrivesAt"
          autocomplete="off"
        />
        <small class="p-error" v-for="er of v$.arrivesAt.$errors">{{
          er.$message
        }}</small>
      </div>

      <div class="field">
        <label for="about" class="tw-mr-4">Arrived?</label>
        <InputSwitch v-model="purchase.arrived" />
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
          @click="savePurchase"
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
