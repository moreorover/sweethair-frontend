<template>
  <modal title="Edit Customer" action="Edit" @submit="submit">
    <customer-form :customer-value="customer" />
  </modal>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useCustomersStore } from '@/store/customersStore';
import Modal from '@/components/common/Modal.vue';
import CustomerForm from '@/components/customers/CustomerForm.vue';
import useEntityCleaner from '@/composables/entityCleaner';
import { Customer } from '@/services/CustomerService';

export default defineComponent({
  name: 'EditCustomerModal',
  components: { Modal, CustomerForm },
  props: {
    customerValue: {
      type: Object as () => Customer,
      required: true,
    },
  },
  setup(props) {
    const store = useCustomersStore();
    const entityCleaner = useEntityCleaner();

    const customer: Customer = reactive({ ...props.customerValue });

    const submit = () => {
      const cleanCustomer: Customer = entityCleaner.clean(customer);
      store.update(cleanCustomer);
    };

    return { customer, submit };
  },
});
</script>
<style scoped></style>
