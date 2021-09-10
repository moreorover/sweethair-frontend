<template>
  <section class="hero is-small is-link">
    <div class="hero-body">
      <p class="title">Edit Customer</p>
    </div>
  </section>
  <customer-form :customer="customer" @save="update" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CustomerForm from '@/components/customers/CustomerForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store/index';
import { Customer } from '@/services/CustomerService';

export default defineComponent({
  components: {
    CustomerForm,
  },
  async setup() {
    const store = useStore();
    const router = useRouter();
    const id = useRoute().params.id as string;

    await store.getCustomers().fetchAll();

    const customer = store.getCustomers().getState().all.get(id);

    if (!customer) {
      throw Error('Customer was not found.');
    }

    const update = async (customer: Customer) => {
      await store.getCustomers().update(customer);
      router.push({
        name: 'Customers',
      });
    };

    return { customer, update };
  },
});
</script>
