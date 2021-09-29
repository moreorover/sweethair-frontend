<template>
  <div class="column">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label">Total for Transaction</label>
        <div class="control">
          <input
            v-model="newTransaction.total"
            type="number"
            step="0.01"
            class="input is-medium"
            placeholder="Amount"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">
          <div class="control"><input type="checkbox" /> Is Paid?</div>
        </label>
      </div>
      <div class="field">
        <datepicker v-model="newTransaction.date" />
      </div>
      <button class="button is-block is-primary is-fullwidth is-medium">Submit</button>
    </form>
  </div>
</template>
<script lang="ts">
import { Transaction } from '@/services/TransactionService';
import { defineComponent, reactive } from 'vue';
import Datepicker from 'vue3-date-time-picker';

export default defineComponent({
  components: { Datepicker },
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
  setup(props, ctx) {
    const newTransaction = reactive<Transaction>(props.transaction);

    const onSubmit = () => {
      const transaction: Transaction = {
        ...props.transaction,
        ...newTransaction,
      };

      for (var propName in transaction) {
        if (transaction[propName] === null || transaction[propName] === undefined || transaction[propName] === '') {
          delete transaction[propName];
        }
      }

      ctx.emit('save', transaction);
    };

    return { onSubmit, newTransaction };
  },
});
</script>
<style scoped></style>
