<script setup lang="ts">
interface Props {
  title: string;
  showFooter?: boolean;
  showModal?: boolean;
}

const props = withDefaults(defineProps<Props>(), { showFooter: false, showModal: false });
const emit = defineEmits(['submit', 'hide']);

// const s = computed(() => props.showModal);

// const { toggle } = useModal();

// watch(s, (ss) => {
//   console.log('sss ', ss);
// });

const submit = () => {
  emit('submit');
};
</script>

<template>
  <Dialog
    :visible="props.showModal"
    :dismissable-mask="true"
    :modal="true"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '80%' }"
    @hide="emit('hide')"
  >
    <template #header>
      <div class="flex align-items-center">
        <span class="font-medium text-2xl text-900">{{ props.title }}</span>
      </div>
    </template>
    <slot />
    <template #footer>
      <div v-if="props.showFooter" class="border-top-1 surface-border pt-3">
        <Button icon="pi pi-times" label="Cancel" class="p-button-text" @click="emit('hide')"></Button>
        <Button icon="pi pi-check" label="Save" @click="submit"></Button>
      </div>
    </template>
  </Dialog>
</template>
