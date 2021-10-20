<template>
  <modal title="Create New" :action="action" @submit="submit">
    <transaction-form :transaction-value="newTransaction" />
    {{ newTransaction }}
  </modal>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import TransactionForm from '@/components/transactions/TransactionForm.vue';
import { useTransactionsStore } from '@/store/transactionsStore';
import { Transaction } from '@/services/TransactionService';
import Modal from '@/components/common/Modal.vue';
import useEntityCleaner from '@/composables/entityCleaner';
import { Customer } from '@/services/CustomerService';
import { Appointment } from '@/services/AppointmentService';

export default defineComponent({
  components: {
    TransactionForm,
    Modal,
  },
  props: {
    action: {
      type: String,
      required: false,
      default: 'New',
    },
    customer: {
      type: Object as () => Customer,
      required: false,
      default: null,
    },
    appoointment: {
      type: Object as () => Appointment,
      required: false,
      default: null,
    },
  },
  setup(props) {
    const transactionsStore = useTransactionsStore();
    const entityCleaner = useEntityCleaner();

    const newTransaction = reactive<Transaction>({
      id: '',
      total: 0,
      date: new Date().toISOString(),
      isPaid: false,
      customer: props.customer,
      appointment: props.appoointment,
    });

    const submit = () => {
      const cleanTransaction: Transaction = entityCleaner.clean(newTransaction);
      transactionsStore.create(cleanTransaction);
      newTransaction.id = '';
      newTransaction.total = 0;
      newTransaction.date = new Date().toISOString();
      newTransaction.isPaid = false;
      newTransaction.customer = null;
      newTransaction.appointment = null;
    };

    return { newTransaction, submit };
  },
});
</script>
