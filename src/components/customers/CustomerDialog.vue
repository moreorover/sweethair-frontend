<template>
  <BaseButton :label="props.label" @onClick="toggleModal()" v-bind="attrs" />
  <BaseModal :header="props.header" :show-footer="false" v-model:visible="showModal" @toggle-modal="toggleModal">
    <customer-form :customer="props.customer" @submit="submit($event)" />
  </BaseModal>
</template>
<script setup lang="ts">
import { useCustomersStore } from '@/store/customersStore';
import useEntityCleaner from '@/hooks/entityCleaner';
import { Customer } from '@/services/CustomerService';
import CustomerForm from '@/components/customers/CustomerForm.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import BaseButton from '@/components/base/BaseButton.vue';
import { useAttrs } from 'vue';

interface Props {
  customer?: Customer;
  header: string;
  label: string;
}

const attrs = useAttrs();
const props = withDefaults(defineProps<Props>(), {
  customer: () => {
    return {
      id: -1,
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

const submit = async (customer: Customer) => {
  const cleanCustomer: Customer = entityCleaner.clean(customer, true);
  cleanCustomer.id ? await store.update(cleanCustomer) : await store.create(cleanCustomer);
  toggleModal();
};
</script>
