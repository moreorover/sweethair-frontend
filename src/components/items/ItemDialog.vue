<template>
  <BaseButton :label="props.label" @onClick="toggleModal()" v-bind="attrs" />
  <BaseModal :header="props.header" :show-footer="false" v-model:visible="showModal" @toggle-modal="toggleModal()">
    <ItemForm :item="props.item" @submit="submit" />
  </BaseModal>
</template>
<script setup lang="ts">
import useEntityCleaner from '@/hooks/entityCleaner';
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import BaseButton from '@/components/base/BaseButton.vue';
import { Customer } from '@/services/CustomerService';
import { Appointment } from '@/services/AppointmentService';
import { useAttrs } from 'vue';
import { Item } from '@/services/ItemService';
import { useItemsStore } from '@/store/itemsStore';
import ItemForm from '@/components/items/ItemForm.vue';
import { Invoice } from '@/services/InvoiceService';

interface Props {
  item?: Item;
  header: string;
  label: string;
  customer?: Customer;
  appointment?: Appointment;
  invoice?: Invoice;
}

const attrs = useAttrs();
const props = withDefaults(defineProps<Props>(), {
  item: () => {
    return {
      id: -1,
      total: 0.0,
      title: '',
    };
  },
  customer: undefined,
  appointment: undefined,
  invoice: undefined,
});

const itemsStore = useItemsStore();
const entityCleaner = useEntityCleaner();
const { showModal, toggleModal } = useModal();

const submit = async (item: Item) => {
  const cleanItem: Item = entityCleaner.clean(
    {
      ...item,
      customer: props.customer || null,
      appointment: props.appointment || null,
      invoice: props.invoice || null,
    },
    true
  );
  cleanItem.id ? await itemsStore.update(cleanItem) : await itemsStore.create(cleanItem);
  toggleModal();
};
</script>
