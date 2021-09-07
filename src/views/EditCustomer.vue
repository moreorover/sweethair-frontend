<template>
  <section class="hero is-small is-link">
    <div class="hero-body">
      <p class="title">Edit Customer</p>
    </div>
  </section>
  <customer-form :customer="editCustomer" @save="update" />
  {{ editCustomer }}
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CustomerForm from '@/components/CustomerForm.vue';
import { Customer } from '@/api/customer';
import { useRoute, useRouter } from 'vue-router';
import { getById } from '@/api/customer';
import CustomerService from '@/services/CustomerService';

export default defineComponent({
  components: {
    CustomerForm,
  },
  async setup() {
    const router = useRouter();
    const id = useRoute().params.id as string;

    const editCustomer: Customer = await getById(id);

    const update = async (customer: Customer) => {
      CustomerService.update(customer)
        .then(() => {
          router.push({
            name: 'Customers',
          });
        })
        .catch((error) => console.log(error));
    };

    return { editCustomer, update };
  },
});
</script>
