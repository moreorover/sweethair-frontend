<template>
  <div class="hero is-small welcome is-info my-3">
    <div class="hero-body">
      <div class="columns">
        <div class="column has-text-left my-auto">
          <p class="title is-3">{{ customer?.firstName }} {{ customer?.lastName }}</p>
        </div>
        <div class="column has-text-right my-auto">
          <p class="subtitle">{{ customer?.email }}</p>
          <p class="subtitle">{{ customer?.instagram }}</p>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <nav class="tabs">
        <div class="container end">
          <ul>
            <!-- <router-link to="/customers/new">Create Customer</router-link> -->
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCustomersStore } from '@/store/pinia/customersStore';

export default defineComponent({
  components: {},
  setup() {
    const store = useCustomersStore();
    const id = useRoute().params.id as string;

    store.fetchCustomers();

    const customer = computed(() => store.getCustomerById(id));

    if (!customer.value) {
      throw Error('Customer was not found.');
    }

    return { customer };
  },
});
</script>
