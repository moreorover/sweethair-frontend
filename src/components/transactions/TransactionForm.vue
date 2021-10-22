<template>
  <div class="p-fluid py-2">
    <div class="p-field p-grid">
      <label for="total" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Total</label>
      <div class="p-col-12 p-md-10">
        <InputNumber id="total" v-model="transaction.total" mode="decimal" :min-fraction-digits="2" />
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
    <div v-if="pickCustomer" class="p-field p-grid">
      <label for="isPaid" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Customer</label>
      <div v-if="transaction.customer" class="p-col-2">
        {{ transaction.customer?.fullName }}
      </div>
      <div class="p-col-10 p-md-8">
        <modal title="Select Customer" action="Select Customer">
          <single-customer-picker v-model:selection-value="transaction.customer" />
        </modal>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Transaction } from '@/services/TransactionService';
import { defineComponent, computed } from 'vue';
import SingleCustomerPicker from '../customers/SingleCustomerPicker.vue';
import Modal from '@/components/common/Modal.vue';

export default defineComponent({
  name: 'TransactionForm',
  components: { SingleCustomerPicker, Modal },
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

    const pickCustomer = props.transactionValue.customer ? false : true;

    return { transaction, pickCustomer };
  },
});
</script>
<style scoped></style>
