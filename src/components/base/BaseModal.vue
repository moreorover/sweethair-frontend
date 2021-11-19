<template>
  <Dialog
    :draggable="false"
    :modal="true"
    :dismissable-mask="true"
    :header="props.header"
    v-model:visible="showModal"
    :breakpoints="{ '960px': '75vw' }"
    :style="{ width: '50vw' }"
  >
    <slot />
    <template #footer v-if="props.showFooter">
      <Button label="No" icon="pi pi-times" @click="emit('cancel')" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="emit('submit')" autofocus />
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
const emit = defineEmits(['update:visible', 'toggleModal', 'cancel', 'submit']);

const showModal = computed({
  get: () => props.visible,
  set: (val) => {
    emit('update:visible', val);
  },
});

const slots = useSlots();
</script>
