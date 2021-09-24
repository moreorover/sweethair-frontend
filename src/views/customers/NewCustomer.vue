<template>
  <section class="hero is-small is-link">
    <div class="hero-body">
      <p class="title">Create New Customer</p>
    </div>
  </section>
  <customer-form :customer="newCustomer" @save="save" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CustomerForm from '@/components/customers/CustomerForm.vue';
import { useRouter } from 'vue-router';
import { useCustomersStore } from '@/store/pinia/customersStore';
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
