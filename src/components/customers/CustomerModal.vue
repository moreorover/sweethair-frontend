<template>
  <Button class="p-button-sm mr-2" :label="props.label" @click="toggleModal()"></Button>

  <Dialog
    v-model:visible="showModal"
    :modal="true"
    :dismissable-mask="true"
    :header="props.header"
    :style="{ width: '50vw' }"
  >
    <customer-form :customer="c" @submit="submit" />
  </Dialog>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import CustomerForm from '@/components/customers/CustomerForm.vue';
import useEntityCleaner from '@/composables/entityCleaner';
import { Customer } from '@/services/CustomerService';
import useModal from '@/composables/useModal';

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

const submit = (data: Customer) => {
  const cleanCustomer: Customer = entityCleaner.clean(data);
  cleanCustomer.id ? store.update(cleanCustomer) : store.create(cleanCustomer);
  toggleModal();
};
</script>
