<template>
  <h1 class="title">New Customer</h1>
  <customer-form :customer="newCustomer" @save="save" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CustomerForm from '@/components/customers/CustomerForm.vue';
import { useRouter } from 'vue-router';
import { useCustomersStore } from '@/store/customersStore';
import { Customer } from '@/services/CustomerService';

export default defineComponent({
  components: {
    CustomerForm,
  },
  setup() {
    const store = useCustomersStore();
    const router = useRouter();
    const newCustomer: Customer = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      instagram: '',
    };

    const save = async (customer: Customer) => {
      await store.create(customer);
      router.push({
        name: 'Customers',
      });
    };

    return { newCustomer, save };
  },
});
</script>
