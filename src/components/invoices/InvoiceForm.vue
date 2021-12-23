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
            focus:border-indigo-600
            focus:ring
            focus:ring-opacity-40
            focus:ring-indigo-500
          "
          v-model="scheduledAt"
          :manualInput="true"
          dateFormat="d MM yy"
        />
        <p v-if="errors.scheduledAt" class="text-xs font-bold text-red-500">
          {{ errors.scheduledAt }}
        </p>
      </div>
      <div>
        <label class="mr-4">Is it paid?</label>
        <InputSwitch v-model="isPaid" />
        <p v-if="errors.scheduledAt" class="text-xs font-bold text-red-500">
          {{ errors.scheduledAt }}
        </p>
      </div>
      <div>
        <label class="mr-4">Is it received?</label>
        <InputSwitch v-model="isReceived" />
        <p v-if="errors.scheduledAt" class="text-xs font-bold text-red-500">
          {{ errors.isReceived }}
        </p>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <BaseButton label="Submit" size="large" />
    </div>
  </form>
</template>
<script setup lang="ts">
import { Invoice } from '@/services/InvoiceService';
import { useField, useForm } from 'vee-validate';
import { object, string, number, boolean } from 'yup';

type Props = {
  invoice: Invoice;
};

const props = defineProps<Props>();

const emit = defineEmits(['submit']);

const validationSchema = object({
  scheduledAt: string().trim().required('Scheduled Date is required'),
  isPaid: boolean(),
  isReceived: boolean(),
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: scheduledAt } = useField('scheduledAt');
const { value: isPaid } = useField('isPaid');
const { value: isReceived } = useField('isReceived');

scheduledAt.value = props.invoice.scheduledAt;
isPaid.value = props.invoice.isPaid;
isReceived.value = props.invoice.isReceived;

const submit = handleSubmit((values) => {
  props.invoice.id > 0
    ? emit('submit', {
        id: props.invoice.id,
        total: 0,
        ...values,
      })
    : emit('submit', { total: 0, ...values });
});
</script>
