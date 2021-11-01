<script setup lang="ts">
import { Transaction } from '@/services/TransactionService';
import { reactive, ref } from 'vue';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import CustomerPicker from '@/components/customers/CustomerPicker.vue';

type Props = {
  transaction: Transaction;
};

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const t = reactive<Transaction>({ ...props.transaction });

const rules = {
  total: { val: (v: number) => v > 0 || v < 0 },
  date: { required },
  isPaid: { required },
  customer: { required },
};

const submitted = ref(false);

const v$ = useVuelidate(rules, t);

function handleSubmit(isFormValid: boolean) {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  emit('submit', t);
}
const pickCustomer: boolean = props.transaction.customer ? false : true;
</script>
<template>
  <form class="p-fluid" @submit.prevent="handleSubmit(!v$.$invalid)">
    <div class="p-field p-grid">
      <label for="total" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Total</label>
      <div class="p-col-12 p-md-10">
        <InputNumber id="total" v-model="t.total" mode="decimal" :min-fraction-digits="2" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="isPaid" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Paid</label>
      <div class="p-col-12 p-md-10">
        <InputSwitch id="isPaid" v-model="t.isPaid" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="scheduled" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Scheduled at</label>
      <div class="p-col-12 p-md-10">
        <Calendar id="scheduled" v-model="t.date" date-format="dd MM yy" :manual-input="false" />
      </div>
    </div>
    <div v-if="pickCustomer" class="p-field p-grid">
      <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Customer</label>
      <div class="p-col-10 p-md-8">
        <customer-picker @selected="t.customer = $event" />
        <small v-if="v$.customer.$invalid && submitted" class="p-error">{{
          v$.customer.required.$message.replace('Value', 'Customer')
        }}</small>
      </div>
    </div>
    <div class="p-field p-grid pt-2">
      <Button type="submit" label="Submit" class="p-mt-2" />
    </div>
  </form>
  {{ t }}
</template>
