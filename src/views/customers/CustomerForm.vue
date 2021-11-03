<template>
  <div class="mt-8">
    <div class="mt-4">
      <div class="p-6 bg-white rounded-md shadow-md">
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
                text-gray-200
                bg-gray-800
                rounded-md
                hover:bg-gray-700
                focus:outline-none focus:bg-gray-700
              "
            >
              Submit
            </button>
          </div>
        </form>
        {{ c }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Customer } from '@/services/CustomerService';
import { reactive } from 'vue';
// import BaseInput from '@/components/base/BaseInput.vue';

type Props = {
  customer: Customer;
};

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const c = reactive<Customer>({ ...props.customer });

const onSubmit = () => {
  emit('submit', c);
};
</script>
