<template>
  <Button :label="action" @click="show = true"></Button>

  <Dialog
    v-model:visible="show"
    :dismissable-mask="true"
    :modal="true"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '80%' }"
  >
    <template #header>
      <div class="flex align-items-center">
        <span class="font-medium text-2xl text-900">{{ title }}</span>
      </div>
    </template>
    <slot />
    <template #footer>
      <div class="border-top-1 surface-border pt-3">
        <Button icon="pi pi-times" label="Cancel" class="p-button-text" @click="show = false"></Button>
        <Button icon="pi pi-check" label="Save" @click="submit"></Button>
      </div>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CustomerModal',
  props: {
    title: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const show = ref<boolean>(false);

    const submit = () => {
      show.value = false;
      emit('submit');
    };
    return { show, submit };
  },
});
</script>
