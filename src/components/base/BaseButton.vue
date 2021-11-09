<template>
  <button
    :label="props.label"
    @click="emit('onClick')"
    class="
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
    :class="sizes.get(props.size as Size)"
    v-bind="attrs"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

type Size = 'small' | 'medium' | 'large';

const sizes = new Map<Size, string>([
  ['small', 'px-2 py-0 font-normal'],
  ['medium', 'px-4 py-2 font-medium'],
  ['large', 'px-6 py-4 font-bold'],
]);

const attrs = useAttrs();
type Props = {
  label?: string;
  size?: string;
};

const props = withDefaults(defineProps<Props>(), { label: '', size: 'small' });
const emit = defineEmits(['onClick']);
</script>
