<template>
  <button
    :label="props.label"
    @click="toggleModal()"
    class="
      px-4
      py-2
      font-medium
      tracking-wide
      text-white
      capitalize
      transition-colors
      duration-200
      transform
      bg-indigo-600
      rounded-md
      hover:bg-indigo-500
      focus:outline-none focus:bg-indigo-500
    "
  >
    {{ props.label }}
  </button>
  <BaseModal :header="props.header" :show-footer="false" v-model:visible="showModal" @toggle-modal="toggleModal()">
    <customer-form :customer="c" @submit="submit($event)" />
  </BaseModal>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import useEntityCleaner from '@/hooks/entityCleaner';
import { Customer } from '@/services/CustomerService';
import CustomerForm from '@/views/customers/CustomerForm.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';

interface Props {
  customer?: Customer;
  header: string;
  label: string;
}

const props = withDefaults(defineProps<Props>(), {
  customer: () => {
    return {
      id: '',
      fullName: '',
      location: '',
      about: '',
      email: '',
      instagram: '',
    };
  },
});

const store = useCustomersStore();
const entityCleaner = useEntityCleaner();
const { showModal, toggleModal } = useModal();

const c: Customer = reactive({ ...props.customer });

const submit = (customer: Customer) => {
  const cleanCustomer: Customer = entityCleaner.clean(customer);
  cleanCustomer.id ? store.update(cleanCustomer) : store.create(cleanCustomer);
  toggleModal();
};
</script>
