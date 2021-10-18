<template>
  <div class="p-fluid py-2">
    <div class="p-field p-grid">
      <label for="total" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Total</label>
      <div class="p-col-12 p-md-10">
        <InputNumber id="total" v-model="transaction.total" mode="currency" currency="GBP" locale="en-UK" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="isPaid" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Paid</label>
      <div class="p-col-12 p-md-10">
        <InputSwitch id="isPaid" v-model="transaction.isPaid" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label for="scheduled" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Scheduled at</label>
      <div class="p-col-12 p-md-10">
        <Calendar
          id="scheduled"
          v-model="transaction.date"
          :touch-u-i="true"
          :show-time="true"
          date-format="mm-dd-yy"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Transaction } from '@/services/TransactionService';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'TransactionForm',
  props: {
    transactionValue: {
      type: Object as () => Transaction,
      required: true,
    },
  },
  emits: ['update:transactionValue'],
  setup(props, { emit }) {
    const transaction = computed({
      get: () => props.transactionValue,
      set: (val) => emit('update:transactionValue', val),
    });

    // watchEffect(() => (newTransaction.date = dateInput.value.toISOString()));

    return { transaction };
  },
});
</script>
<style scoped></style>
