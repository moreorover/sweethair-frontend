<template>
  <section class="section card has-text-centered">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <div class="control">
          <input v-model="firstName" type="text" class="input is-medium" placeholder="First Name" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="lastName" type="text" class="input is-medium" placeholder="Last Name" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="email" type="email" class="input is-medium" placeholder="email" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="instagram" type="text" class="input is-medium" placeholder="instgram" />
        </div>
      </div>
      <button class="button is-block is-primary is-fullwidth is-medium">Submit</button>
    </form>
  </section>
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
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    save: (customer: Customer) => {
      return true;
    },
  },
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
