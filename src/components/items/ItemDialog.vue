<template>
  <BaseButton :label="props.label" @onClick="toggleModal()" v-bind="attrs" />
  <BaseModal
    :header="props.header"
    :show-footer="false"
    v-model:visible="showModal"
    @toggle-modal="toggleModal()"
  >
    <ItemForm :item="props.item" @submit="submit" />
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/hooks/useModal';
import BaseButton from '@/components/base/BaseButton.vue';
import { useAttrs } from 'vue';
import { Item } from '@/services/ItemService';
import ItemForm from '@/components/items/ItemForm.vue';

const emit = defineEmits(['submit']);

interface Props {
  item?: Item;
  header: string;
  label: string;
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

const { showModal, toggleModal } = useModal();

const submit = async (item: Item) => {
  emit('submit', item);
  toggleModal();
};
</script>
