<template>
  <div class="column">
    <form @submit.prevent="">
      <div class="field">
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input v-model="customer.firstName" class="input is-large" type="text" placeholder="e.g. Jane" required />
          </div>
        </div>
      </div>

      <div class="field">
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input v-model="customer.lastName" class="input is-large" type="text" placeholder="e.g. Smith" required />
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input v-model="customer.email" class="input" type="email" placeholder="e.g. janesmith@gmail.com" />
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Instagram</label>
        <div class="control">
          <input v-model="customer.instagram" class="input" type="text" placeholder="janesmith" />
        </div>
      </div>

      <!-- <div class="field">
        <div class="buttons">
          <button class="button is-medium is-success">Save</button>
        </div>
      </div> -->
    </form>
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
