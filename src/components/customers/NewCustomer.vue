<template>
  <modal title="Create New" action="New" @submit="submit">
    <customer-form :customer-value="newCustomer" />
  </modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import Modal from '@/components/common/Modal.vue';
import CustomerForm from '@/components/customers/CustomerForm.vue';
import useEntityCleaner from '@/composables/entityCleaner';
import { Customer } from '@/services/CustomerService';

export default defineComponent({
  name: 'NewCustomerModal',
  components: { Modal, CustomerForm },
  setup() {
    const store = useCustomersStore();
    const entityCleaner = useEntityCleaner();

    const newCustomer: Customer = {
      id: '',
      fullName: '',
      location: '',
      about: '',
      email: '',
      instagram: '',
    };

    const submit = () => {
      const cleanCustomer: Customer = entityCleaner.clean(newCustomer);
      store.create(cleanCustomer);
      newCustomer.id = '';
      newCustomer.fullName = '';
      newCustomer.location = '';
      newCustomer.about = '';
      newCustomer.email = '';
      newCustomer.instagram = '';
    };

    return { newCustomer, submit };
  },
});
</script>
<style scoped></style>
