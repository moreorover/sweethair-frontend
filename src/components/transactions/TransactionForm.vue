<template>
  <form @submit.prevent="submit">
    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <label for="time24">Scheduled Date</label>
        <Calendar
          id="time24"
          class="
            w-full
            border-gray-200
            rounded-md
            focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500
          "
          v-model="scheduledAt"
          :manualInput="true"
          dateFormat="d MM yy"
        />
        <p v-if="errors.scheduledAt" class="text-xs font-bold text-red-500">{{ errors.scheduledAt }}</p>
      </div>
      <div>
        <BaseInput label="Total amount" v-model="total" type="number" :error="errors.total" step=".01" />
      </div>
      <div>
        <label class="mr-4">Is it paid?</label>
        <InputSwitch v-model="isPaid" />
        <p v-if="errors.scheduledAt" class="text-xs font-bold text-red-500">{{ errors.scheduledAt }}</p>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <BaseButton label="Submit" size="large" />
    </div>
  </form>
</template>
<script setup lang="ts">
import { Transaction } from '@/services/TransactionService';
import { useField, useForm } from 'vee-validate';
import { object, string, number, boolean } from 'yup';
import BaseInput from '../base/BaseInput.vue';

type Props = {
  transaction: Transaction;
};

const props = defineProps<Props>();

const emit = defineEmits(['submit']);

const validationSchema = object({
  scheduledAt: string().trim().required('Scheduled Date is required'),
  total: number().required(),
  isPaid: boolean(),
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: scheduledAt } = useField('scheduledAt');
const { value: total } = useField('total');
const { value: isPaid } = useField('isPaid');

scheduledAt.value = props.transaction.scheduledAt;
total.value = props.transaction.total;
isPaid.value = props.transaction.isPaid;

const submit = handleSubmit((values) => {
  props.transaction.id > 0 ? emit('submit', { id: props.transaction.id, ...values }) : emit('submit', { ...values });
});
</script>
