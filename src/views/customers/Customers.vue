<template>
  <div class="surface-section">
    <div
      class="
        flex
        md:align-items-center md:justify-content-between
        flex-column
        md:flex-row
        pb-2
        pt-2
        border-bottom-1
        surface-border
      "
    >
      <div class="flex align-items-center">
        <i class="pi pi-users text-2xl mr-3 text-500"></i>
        <span class="text-3xl font-medium text-900 mr-3">{{ customers.length }}</span>
        <span class="text-3xl font-medium text-900 mr-3">Customers</span>
      </div>
      <div class="mt-3 md:mt-0">
        <new-customer />
        <span class="ml-2 p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model="searchKey" type="text" placeholder="Search" />
        </span>
      </div>
    </div>
  </div>
  <!-- <customers-table :customers="customers" /> -->

  <div class="grid grid-nogutter">
    <div v-for="customer in customers" :key="customer.id" class="col-12 md:col-6 xl:col-3 p-3">
      <div class="surface-card shadow-2 border-rounded p-3">
        <div class="flex flex-column align-items-center border-bottom-1 surface-border pb-3">
          <!-- <img src="images/blocks/burgers/1.png" style="width: 70px; height: 70px" class="mb-3" /> -->
          <span class="text-lg text-900 font-medium mb-2"> {{ customer.firstName }} {{ customer.lastName }} </span>
          <span v-if="customer.email" class="text-600 font-medium mb-2">Email: {{ customer.email }}</span>
          <div>
            <!-- <span class="inline-block text-sm text-pink-500 mr-1">$</span> -->
            <span v-if="customer.instagram" class="text-sm text-900">Instagram: {{ customer.instagram }}</span>
          </div>
        </div>
        <div class="flex pt-3">
          <div class="w-6 pr-2">
            <edit-customer :customer-value="customer" />
          </div>
          <div class="w-6 pl-2">
            <Button icon="pi pi-shopping-cart" class="p-button-outlined p-button-secondary w-full"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import useCustomerModal from '@/composables/customerModal';
import NewCustomer from '@/components/customers/NewCustomer.vue';
import EditCustomer from '@/components/customers/EditCustomer.vue';

export default defineComponent({
  name: 'Customers',
  components: { NewCustomer, EditCustomer },
  setup() {
    const store = useCustomersStore();
    const searchKey = ref('');
    const customerModal = useCustomerModal();

    store.fetchAll();

    const customers = computed(() => {
      return store.all.filter((customer) => {
        if (customer.firstName.toLowerCase().includes(searchKey.value)) {
          return true;
        }
        if (customer.lastName.toLowerCase().includes(searchKey.value)) {
          return true;
        }
        if (customer.email?.toLowerCase().includes(searchKey.value)) {
          return true;
        }
        if (customer.instagram?.toLowerCase().includes(searchKey.value)) {
          return true;
        }
        return false;
      });
    });

    const submit = () => {
      console.log('submited');
    };

    return { customers, searchKey, customerModal, submit };
  },
});
</script>
<style scoped></style>
