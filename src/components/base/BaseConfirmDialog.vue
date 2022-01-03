<template>
  <BaseButton :label="props.label" @onClick="toggleModal()" v-bind="attrs" />
  <BaseModal
    :header="props.header"
    :show-footer="true"
    v-model:visible="showModal"
    @submit="submit"
    @toggle-modal="toggleModal()"
    @cancel="toggleModal()"
  >
    <slot></slot>
  </BaseModal>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import useModal from '@/hooks/useModal';

const attrs = useAttrs();
const emit = defineEmits(['confirm']);

type Props = {
  header: string;
  label: string;
};

const props = defineProps<Props>();

const { showModal, toggleModal } = useModal();

const submit = () => {
  emit('confirm');
  toggleModal();
};
</script>
