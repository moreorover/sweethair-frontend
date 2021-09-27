<template>
  <section class="hero is-small is-link">
    <div class="hero-body">
      <p class="title">Edit Customer</p>
    </div>
  </section>
  <customer-form :customer="customer" @save="update" />
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import CustomerForm from '@/components/customers/CustomerForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { Customer } from '@/services/CustomerService';
import { useCustomersStore } from '@/store/customersStore';

export default defineComponent({
  components: {
    CustomerForm,
  },
  setup() {
    const store = useCustomersStore();
    const router = useRouter();
    const id = useRoute().params.id as string;

    store.fetchAll();

    const customer = computed(() => store.getCustomerById(id));

    if (!customer.value) {
      throw Error('Customer was not found.');
    }

    const update = async (customer: Customer) => {
      await store.update(customer);
      router.push({
        name: 'Customers',
      });
    };

    return { customer, update };
  },
});
</script>
