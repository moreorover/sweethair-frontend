<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import { reactive, ref } from 'vue';
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

type Props = {
  customer: Customer;
};

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const c = reactive<Customer>({ ...props.customer });

const rules = {
  fullName: { required },
  location: {},
  about: {},
  email: { email, val: (v: string | null) => v === null },
  instagram: { val: (v: string | null) => v === null },
};

const submitted = ref(false);

const v$ = useVuelidate(rules, c);

function handleSubmit(isFormValid: boolean) {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  emit('submit', c);
}
</script>
<template>
  <form class="p-fluid" @submit.prevent="handleSubmit(!v$.$invalid)">
    <div class="p-field p-grid">
      <label for="firstName" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Full Name</label>
      <div class="p-col-12 p-md-10">
        <InputText id="firstName" v-model="c.fullName" type="text" />
        <small v-if="v$.fullName.$invalid && submitted" class="p-error">{{
          v$.fullName.required.$message.replace('Value', 'Full Name')
        }}</small>
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="lastName" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Location</label>
      <div class="p-col-12 p-md-10">
        <InputText id="lastName" v-model="c.location" type="text" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="lastName" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">About</label>
      <div class="p-col-12 p-md-10">
        <InputText id="lastName" v-model="c.about" type="text" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="email" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Email</label>
      <div class="p-col-12 p-md-10">
        <InputText id="email" v-model="c.email" type="text" />
        <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{
          v$.email.email.$message.replace('Value', 'Email')
        }}</small>
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="instagram" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Instagram</label>
      <div class="p-col-12 p-md-10">
        <InputText id="instagram" v-model="c.instagram" type="text" />
      </div>
    </div>
    <div class="p-field p-grid pt-2">
      <Button type="submit" label="Submit" class="p-mt-2" />
    </div>
  </form>
</template>
