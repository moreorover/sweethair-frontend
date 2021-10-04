<template>
  <div class="columns is-centered">
    <div class="column">
      <div class="field">
        <label class="label">Total for Transaction</label>
        <div class="control">
          <input
            v-model.number="transaction.total"
            type="number"
            step="0.01"
            class="input is-medium"
            placeholder="Amount"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">
          <div class="control"><input v-model="transaction.isPaid" type="checkbox" /> Is Paid?</div>
        </label>
      </div>
      <div class="field">
        <label class="label">Scheduled Date</label>
        <datepicker v-model="transaction.date" />
      </div>
      <div class="field">
        <customer-picker v-model:customer-value="transaction.customer" />
      </div>
    </div>
  </div>
  <div class="section">
    <h1 class="title">transaction form</h1>
    <div>{{ transaction }}</div>
  </div>
</template>
<script lang="ts">
import { Transaction } from '@/services/TransactionService';
import { defineComponent, computed } from 'vue';
import Datepicker from 'vue3-date-time-picker';
import CustomerPicker from '@/components/customers/CustomerPicker.vue';

export default defineComponent({
  components: { Datepicker, CustomerPicker },
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
