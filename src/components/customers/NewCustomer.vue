<template>
  <Button class="p-button-sm mr-2" label="New" @click="toggleModal()"></Button>

  <Dialog
    v-model:visible="showModal"
    :modal="true"
    :dismissable-mask="true"
    header="Create New Customer"
    :style="{ width: '50vw' }"
  >
    <customer-form :customer="newCustomer" @submit="submit" />
  </Dialog>
</template>

<script setup lang="ts">
import { useCustomersStore } from '@/store/customersStore';
import useEntityCleaner from '@/composables/entityCleaner';
import { Customer } from '@/services/CustomerService';
import CustomerForm from './CustomerForm.vue';
import useModal from '@/composables/useModal';

const store = useCustomersStore();

const entityCleaner = useEntityCleaner();
const { showModal, toggleModal } = useModal();

const newCustomer: Customer = {
  id: '',
  fullName: '',
  location: '',
  about: '',
  email: '',
  instagram: '',
};

const submit = (data: Customer) => {
  const cleanCustomer: Customer = entityCleaner.clean(data);
  store.create(cleanCustomer);
  toggleModal();
};
</script>
