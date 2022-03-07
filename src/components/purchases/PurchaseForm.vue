<template>
  Purchase Form
  <FormKit type="form" @submit="register" v-model="purchase">
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
  </FormKit>
</template>

<script setup lang="ts">
import { Purchase } from '@/types';
import moment from 'moment';
import { reactive } from 'vue';
import { formatISO } from 'date-fns';

type Props = {
  purchase: Purchase;
};

const props = defineProps<Props>();

const emit = defineEmits(['submit']);

const purchase = reactive<Purchase>({
  ...props.purchase,
  orderedAt: moment(props.purchase.orderedAt).format('YYYY-MM-DD'),
  arrivesAt: moment(props.purchase.arrivesAt).format('YYYY-MM-DD'),
});

const register = () => {
  emit('submit', {
    ...purchase,
    // orderedAt: moment(purchase.orderedAt).toISOString(),
    orderedAt: formatISO(new Date(purchase.orderedAt)),
    // arrivesAt: moment(purchase.arrivesAt).toISOString(),
    arrivesAt: formatISO(new Date(purchase.arrivesAt)),
  });
};
</script>
