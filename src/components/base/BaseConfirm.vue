<template>
  <BaseButton
    v-if="!confirmClicked"
    @onClick="confirmClicked = !confirmClicked"
    :label="props.label"
    class="btn btn-small"
  />

  <div v-else class="flex space-x-1">
    <BaseButton
      @onClick="confirm"
      class="btn btn-small bg-red-800 hover:bg-red-500"
      label="Yes"
    />
    <BaseButton
      @onClick="confirmClicked = !confirmClicked"
      class="btn btn-small"
      label="No"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from 'lodash';

interface Props {
  label: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['confirm']);

const confirmClicked = ref(false);

watch(
  confirmClicked,
  debounce((newVal) => {
    if (newVal) confirmClicked.value = false;
  }, 2000),
  { immediate: false }
);

const confirm = () => {
  emit('confirm');
  confirmClicked.value = false;
};
</script>
