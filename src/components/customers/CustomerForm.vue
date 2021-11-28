<template>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <BaseInput label="Full Name" v-model="fullName" type="text" :error="errors.fullName" />
      </div>
      <div>
        <BaseInput label="Location" v-model="location" type="text" :error="errors.location" />
      </div>
      <div>
        <BaseInput label="About" v-model="about" type="text" :error="errors.about" />
      </div>
      <div>
        <BaseInput label="Email Address" :modelValue="email" @change="emailChange" type="text" :error="errors.email" />
      </div>
      <div>
        <BaseInput label="Instagram" v-model="instagram" type="text" :error="errors.instagram" />
      </div>
    </div>

    <div class="flex justify-end mt-4">
      <BaseButton label="Submit" size="large" />
    </div>
  </form>
</template>
<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';

type Props = {
  customer: Customer;
};

const props = defineProps<Props>();

const emit = defineEmits(['submit']);

const validationSchema = object({
  fullName: string().required('Full name is required').trim(),
  location: string().trim(),
  about: string().max(254, 'Can not be longer than 254 characters').trim(),
  email: string().email('Email must be valid').nullable().trim(),
  instagram: string().nullable().trim(),
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: fullName } = useField('fullName');
const { value: location } = useField('location');
const { value: about } = useField('about');
const { value: email, handleChange: emailChange } = useField('email');
const { value: instagram } = useField('instagram');

fullName.value = props.customer.fullName;
location.value = props.customer.location;
about.value = props.customer.about;
email.value = props.customer.email;
instagram.value = props.customer.instagram;

const submit = handleSubmit((values) => {
  props.customer.id > 0 ? emit('submit', { id: props.customer.id, ...values }) : emit('submit', { ...values });
});
</script>
