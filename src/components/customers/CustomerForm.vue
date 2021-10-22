<template>
  <div class="p-fluid">
    <div class="p-field p-grid">
      <label for="firstName" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Full Name</label>
      <div class="p-col-12 p-md-10">
        <InputText id="firstName" v-model="customer.fullName" type="text" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="lastName" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Location</label>
      <div class="p-col-12 p-md-10">
        <InputText id="lastName" v-model="customer.location" type="text" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="lastName" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">About</label>
      <div class="p-col-12 p-md-10">
        <InputText id="lastName" v-model="customer.about" type="text" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="email" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Email</label>
      <div class="p-col-12 p-md-10">
        <InputText id="email" v-model="customer.email" type="text" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="instagram" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Instagram</label>
      <div class="p-col-12 p-md-10">
        <InputText id="instagram" v-model="customer.instagram" type="text" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Customer } from '@/services/CustomerService';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    customerValue: {
      type: Object as () => Customer,
      required: true,
    },
  },
  emits: ['update:customerValue'],
  setup(props, { emit }) {
    const customer = computed({
      get: () => props.customerValue,
      set: (val) => emit('update:customerValue', val),
    });

    return { customer };
  },
});
</script>
<style scoped></style>
