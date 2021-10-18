<template>
  <button class="button is-small is-warning" @click="open()">{{ action }}</button>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background" @click="show = false"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="show = false" />
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
        <transaction-form :transaction-value="newTransaction" />
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="submit">Submit</button>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref, toRefs } from 'vue';
import TransactionForm from '@/components/transactions/TransactionForm.vue';
import { Customer } from '@/services/CustomerService';
import { Transaction } from '@/services/TransactionService';
import { useTransactionsStore } from '@/store/transactionsStore';
import useTransactionModal from '@/composables/transactionModal';
import { Appointment } from '@/services/AppointmentService';

export default defineComponent({
  name: 'TransactionModal',
  components: { TransactionForm },
  props: {
    transaction: {
      type: Object as PropType<Transaction | null>,
      required: false,
      default: null,
    },
    customer: {
      type: Object as PropType<Customer | null>,
      required: false,
      default: null,
    },
    appointment: {
      type: Object as PropType<Appointment | null>,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const transactionsStore = useTransactionsStore();
    const show = ref<boolean>(false);
    const transactionModal = useTransactionModal();
    const { transaction, customer, appointment, action } = toRefs(props);
    const newTransaction = transaction.value
      ? reactive<Transaction>(transaction.value)
      : reactive<Transaction>({
          ...transactionModal.emptyTransaction,
          customer: customer.value,
          appointment: appointment.value,
        });

    const submit = () => {
      const a: Transaction = transactionModal.cleanTransaction(newTransaction);
      if (!a.id) {
        transactionsStore.create(a);
      } else {
        transactionsStore.update(a);
      }
      show.value = false;
    };

    const open = () => {
      if (action.value === 'Delete') {
        transaction.value && transactionsStore.delete(transaction.value);
      } else {
        show.value = true;
      }
    };
    return { show, submit, newTransaction, open };
  },
});
</script>
<style scoped>
.modal-card {
  width: 80%;
}
</style>
