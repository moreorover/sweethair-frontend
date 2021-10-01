<template>
  <div class="column">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input v-model="firstName" class="input is-large" type="text" placeholder="e.g. Jane" required />
          </div>
        </div>
      </div>

      <div class="field">
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input v-model="lastName" class="input is-large" type="text" placeholder="e.g. Smith" required />
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input v-model="email" class="input" type="email" placeholder="e.g. janesmith@gmail.com" />
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Instagram</label>
        <div class="control">
          <input v-model="instagram" class="input" type="text" placeholder="janesmith" />
        </div>
      </div>

      <div class="field">
        <div class="buttons">
          <button class="button is-medium is-success">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Customer } from '@/services/CustomerService';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    customer: {
      type: Object as () => Customer,
      required: true,
    },
  },
  emits: ['save'],
  setup(props, ctx) {
    const firstName = ref(props.customer.firstName);
    const lastName = ref(props.customer.lastName);
    const email = ref(props.customer.email);
    const instagram = ref(props.customer.instagram);

    const onSubmit = () => {
      const newCustomer: Customer = {
        ...props.customer,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        instagram: instagram.value,
      };

      for (var propName in newCustomer) {
        if (newCustomer[propName] === null || newCustomer[propName] === undefined || newCustomer[propName] === '') {
          delete newCustomer[propName];
        }
      }

      ctx.emit('save', newCustomer);
    };

    return { firstName, lastName, email, instagram, onSubmit };
  },
});
</script>
<style scoped></style>
