<template>
  <label v-if="label" class="text-gray-700">{{ label }}</label>
  <input
    class="
      w-full
      mt-2
      border-gray-200
      rounded-md
      focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500
    "
    v-bind="attrs"
    :placeholder="label"
    v-model="value"
  />
</template>

<script setup lang="ts">
import { useModelWrapper } from '@/hooks/modelWrapper';
import { useAttrs } from 'vue';

const attrs = useAttrs();
type Props = {
  label?: string;
  modelValue: string | number | null;
};

const props = withDefaults(defineProps<Props>(), { label: '' });
const emit = defineEmits(['update:modelValue']);

const value = useModelWrapper(props, emit);
</script>
