<template>
  <div class="p-fluid">
    <div class="p-field p-grid">
      <label for="firstname4" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Firstname</label>
      <div class="p-col-12 p-md-10">
        <InputText id="firstname4" v-model="customer.firstName" type="text" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="lastname4" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Lastname</label>
      <div class="p-col-12 p-md-10">
        <InputText id="lastname4" v-model="customer.lastName" type="text" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="lastname4" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Email</label>
      <div class="p-col-12 p-md-10">
        <InputText id="lastname4" v-model="customer.email" type="text" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="lastname4" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Instagram</label>
      <div class="p-col-12 p-md-10">
        <InputText id="lastname4" v-model="customer.instagram" type="text" />
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

    // const onSubmit = () => {
    //   const newCustomer: Customer = {
    //     ...props.customer,
    //     firstName: firstName.value,
    //     lastName: lastName.value,
    //     email: email.value,
    //     instagram: instagram.value,
    //   };

    //   for (var propName in newCustomer) {
    //     if (newCustomer[propName] === null || newCustomer[propName] === undefined || newCustomer[propName] === '') {
    //       delete newCustomer[propName];
    //     }
    //   }
    // };
  },
});
</script>
<style scoped></style>
