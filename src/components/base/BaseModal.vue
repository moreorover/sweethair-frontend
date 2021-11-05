<template>
  <Dialog
    :draggable="false"
    :modal="true"
    :dismissable-mask="true"
    header="Header"
    v-model:visible="showModal"
    :style="{ width: '50vw' }"
  >
    <slot />
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="emit('toggleModal')" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="emit('toggleModal')" autofocus />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue';

interface Props {
  visible: boolean;
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
