<template>
  <BaseButton :label="props.label" @onClick="toggleModal()" v-bind="attrs" />
  <BaseModal
    :header="props.header"
    :show-footer="false"
    v-model:visible="showModal"
    @toggle-modal="toggleModal()"
  >
    <InvoiceForm :invoice="props.invoice" @submit="submit" />
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import BaseButton from '@/components/base/BaseButton.vue';
import InvoiceForm from './InvoiceForm.vue';
import moment from 'moment';
import { useAttrs } from 'vue';
import { Invoice } from '@/services/InvoiceService';

const emit = defineEmits(['submit']);

interface Props {
  invoice?: Invoice;
  header: string;
  label: string;
}

const attrs = useAttrs();
const props = withDefaults(defineProps<Props>(), {
  invoice: () => {
    return {
      id: -1,
      total: 0.0,
      scheduledAt: moment().toISOString(),
      isPaid: false,
      isReceived: false,
    };
  },
});

const { showModal, toggleModal } = useModal();

const submit = async (invoice: Invoice) => {
  emit('submit', invoice);
  toggleModal();
};
</script>
