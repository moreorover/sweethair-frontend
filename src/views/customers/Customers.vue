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
        <modal title="Create New" action="New" @submit="submit">
          <customer-form :customer-value="customerModal.emptyCustomer" />
        </modal>
        <span class="ml-2 p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model="searchKey" type="text" placeholder="Search" />
        </span>
      </div>
    </div>
  </div>
  <customers-table :customers="customers" />
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import CustomersTable from '@/components/customers/CustomersTable.vue';
import Modal from '@/components/common/Modal.vue';
import useCustomerModal from '@/composables/customerModal';
import CustomerForm from '@/components/customers/CustomerForm.vue';

export default defineComponent({
  name: 'Customers',
  components: { CustomersTable, Modal, CustomerForm },
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
