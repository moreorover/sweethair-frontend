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
    @input="emit('update:modelValue', $event.target.value)"
    v-model="props.modelValue"
  />
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
type Props = {
  label?: string;
  modelValue: string | number | null;
};

const props = withDefaults(defineProps<Props>(), { label: '' });
const emit = defineEmits(['update:modelValue']);
</script>
