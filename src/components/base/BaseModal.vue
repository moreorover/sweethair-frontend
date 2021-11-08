<template>
  <Dialog :draggable="false" :modal="true" :dismissable-mask="true" :header="props.header" v-model:visible="showModal">
    <slot />
    <template #footer v-if="props.showFooter">
      <Button label="No" icon="pi pi-times" @click="emit('toggleModal')" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="emit('toggleModal')" autofocus />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue';

interface Props {
  visible: boolean;
  header: string;
  showFooter: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'toggleModal']);

const showModal = computed({
  get: () => props.visible,
  set: (val) => {
    emit('update:visible', val);
  },
});

const slots = useSlots();
</script>
