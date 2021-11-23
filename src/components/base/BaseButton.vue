<template>
  <button :label="props.label" @click="emit('onClick')" :class="`btn btn-${props.size}`" v-bind="attrs">
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
type Props = {
  label?: string;
  size?: string;
};

const props = withDefaults(defineProps<Props>(), { label: '', size: 'small' });
const emit = defineEmits(['onClick']);
</script>
