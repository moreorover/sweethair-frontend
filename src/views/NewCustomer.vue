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
import CustomerForm from '@/components/CustomerForm.vue';
import { Customer } from '@/api/customer';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    CustomerForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const newCustomer: Customer = {
      firstName: '',
      lastName: '',
      email: '',
      instagram: '',
    };

    const save = async (customer: Customer) => {
      await store.dispatch('customer/saveCustomer', customer);
      router.push({
        name: 'Customers',
      });
    };

    return { newCustomer, save };
  },
});
</script>
