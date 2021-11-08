<template>
  <button
    :label="props.label"
    @click="emit('onClick')"
    class="
      px-4
      py-2
      font-medium
      tracking-wide
      text-white
      capitalize
      transition-colors
      duration-200
      transform
      bg-indigo-600
      rounded-md
      hover:bg-indigo-500
      focus:outline-none focus:bg-indigo-500
    "
    v-bind="attrs"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
type Props = {
  label?: string;
};

const props = withDefaults(defineProps<Props>(), { label: '' });
const emit = defineEmits(['onClick']);
</script>
