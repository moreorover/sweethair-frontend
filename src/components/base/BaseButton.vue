<template>
  <button :label="props.label" @click="emit('onClick')" v-bind="attrs">
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
