<template>
  <form @submit.prevent="onSubmit">
    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <BaseInput label="Full Name" v-model="c.fullName" type="text" />
      </div>
      <div>
        <BaseInput label="Location" v-model="c.location" type="text" />
      </div>
      <div>
        <BaseInput label="About" v-model="c.about" type="text" />
      </div>
      <div>
        <BaseInput label="Email Address" v-model="c.email" type="email" />
      </div>
      <div>
        <BaseInput label="Instagram" v-model="c.instagram" type="text" />
      </div>
    </div>

    <div class="flex justify-end mt-4">
      <button
        class="
          px-4
          py-2
          font-medium
          tracking-wide
          text-white
          capitalize
          transition-colors
          duration-200
          transform
          bg-indigo-600
          rounded-md
          hover:bg-indigo-500
          focus:outline-none focus:bg-indigo-500
        "
      >
        Submit
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import { reactive } from 'vue';

type Props = {
  customer: Customer;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'submit', customer: Customer): void;
}>();

const c = reactive<Customer>({ ...props.customer });

const onSubmit = () => {
  emit('submit', c);
};
</script>
