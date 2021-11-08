<template>
  <form @submit.prevent="handleSubmit(!v$.$invalid)">
    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <BaseInput
          label="Full Name"
          v-model="c.fullName"
          type="text"
          :showError="v$.fullName.$invalid && submitted"
          :error="v$.fullName.required.$message.replace('Value', 'Full Name')"
        />
      </div>
      <div>
        <BaseInput label="Location" v-model="c.location" type="text" />
      </div>
      <div>
        <BaseInput label="About" v-model="c.about" type="text" />
      </div>
      <div>
        <BaseInput
          label="Email Address"
          v-model="c.email"
          type="email"
          :showError="v$.email.$invalid && submitted"
          :error="v$.email.email.$message.replace('Value', 'Full Name')"
        />
      </div>
      <div>
        <BaseInput label="Instagram" v-model="c.instagram" type="text" />
      </div>
    </div>

    <div class="flex justify-end mt-4">
      <BaseButton label="Submit" />
    </div>
  </form>
</template>
<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import { reactive, ref } from 'vue';
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

type Props = {
  customer: Customer;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'submit', customer: Customer): void;
}>();

const submitted = ref(false);

const c = reactive<Customer>({ ...props.customer });

const rules = {
  fullName: { required },
  email: { email },
};

const v$ = useVuelidate(rules, c);

const handleSubmit = (isFormValid: boolean) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  emit('submit', c);
};
</script>
