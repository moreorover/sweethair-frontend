<template>
  <div class="column">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label">Total for Transaction</label>
        <div class="control">
          <input
            v-model.number="newTransaction.total"
            type="number"
            step="0.01"
            class="input is-medium"
            placeholder="Amount"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">
          <div class="control"><input v-model="newTransaction.isPaid" type="checkbox" /> Is Paid?</div>
        </label>
      </div>
      <div class="field">
        <label class="label">Scheduled Date</label>
        <datepicker v-model="newTransaction.date" />
      </div>
      <div class="field">
        <div class="field">
          <customer-picker :customer-selection="newTransaction.customer" @selected="toggle" />
        </div>
      </div>
      <button class="button is-block is-primary is-fullwidth is-medium">Submit</button>
    </form>
  </div>
</template>
<script lang="ts">
import { Transaction } from '@/services/TransactionService';
import { defineComponent, reactive, watchEffect, ref } from 'vue';
import Datepicker from 'vue3-date-time-picker';
import CustomerPicker from '@/components/customers/CustomerPicker.vue';
import { Customer } from '@/services/CustomerService';

export default defineComponent({
  components: { Datepicker, CustomerPicker },
  props: {
    transaction: {
      type: Object as () => Transaction,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    save: (transaction: Transaction) => {
      return true;
    },
  },
  setup(props, { emit }) {
    const newTransaction = reactive<Transaction>(props.transaction);
    const dateInput = ref<Date>(new Date(props.transaction.date));

    const onSubmit = () => {
      for (var propName in newTransaction) {
        if (
          newTransaction[propName] === null ||
          newTransaction[propName] === undefined ||
          newTransaction[propName] === '' ||
          newTransaction[propName] === []
        ) {
          delete newTransaction[propName];
        }
      }
      // delete newTransaction.customer?.appointments;
      // delete newTransaction.customer?.transactions;
      emit('save', newTransaction);
    };

    watchEffect(() => (newTransaction.date = dateInput.value.toISOString()));

    const toggle = (customer: Customer) => {
      newTransaction.customer = customer;
    };

    return { onSubmit, newTransaction, toggle };
  },
});
</script>
<style scoped></style>
