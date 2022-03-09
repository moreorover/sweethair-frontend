<template>
  <FormKit type="form" @submit="register" v-model="purchase">
    <h1>Purchase Form</h1>
    <FormKit
      type="date"
      name="orderedAt"
      label="Ordered at"
      help="Enter a date when purchase was made"
      validation="required"
      validation-visibility="live"
    />
    <FormKit
      type="date"
      name="arrivesAt"
      label="Arrives at"
      help="Enter a date when purchase should arrive"
      validation="required"
      validation-visibility="live"
    />
    <FormKit
      type="checkbox"
      name="arrived"
      label="Has the shipment already arrived?"
      help="Check if shipment delivered."
      validation-visibility="dirty"
    />
    <PickSupplier
      class="py-2"
      :supplier="purchase.supplier ? purchase.supplier : null"
      @picked="pickedSupplier($event)"
    />
  </FormKit>
</template>

<script setup lang="ts">
import { Purchase, Supplier } from '@/types';
import moment from 'moment';
import { reactive } from 'vue';
import { formatISO } from 'date-fns';
import PickSupplier from '@/components/suppliers/PickSupplier.vue';

type Props = {
  purchase: Purchase;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'submit', purchase: Purchase): void;
}>();

const purchase = reactive<Purchase>({
  ...props.purchase,
  orderedAt: moment(props.purchase.orderedAt).format('YYYY-MM-DD'),
  arrivesAt: moment(props.purchase.arrivesAt).format('YYYY-MM-DD'),
});

const register = () => {
  emit('submit', {
    arrived: purchase.arrived,
    id: purchase.id,
    total: purchase.total,
    supplierId: purchase.supplierId,
    orderedAt: formatISO(new Date(purchase.orderedAt)),
    arrivesAt: formatISO(new Date(purchase.arrivesAt)),
  });
};

const pickedSupplier = (supplier: Supplier): void => {
  purchase.supplierId = supplier.id;
};
</script>
