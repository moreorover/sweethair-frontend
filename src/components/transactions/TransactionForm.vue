<template>
  <section class="section card has-text-centered">
    <form @submit.prevent="onSubmit">
      <div class="field">
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
        <label class="checkbox">
          <input type="checkbox" />
          Is Paid
        </label>
      </div>
      <div class="field">
        <datepicker v-model="newTransaction.date" />
      </div>
      <button class="button is-block is-primary is-fullwidth is-medium">Submit</button>
    </form>
  </section>
  {{ newTransaction }}
</template>
<script lang="ts">
import { Transaction } from '@/services/TransactionService';
import { defineComponent, reactive } from 'vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';

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
