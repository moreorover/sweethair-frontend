<template>
  <BaseButton v-if="!delPressed" @onClick="delPressed = !delPressed" label="Delete" />

  <div v-else class="flex space-x-1">
    <BaseButton @onClick="emit('delete')" class="bg-red-800 hover:bg-red-500" label="Yes" />
    <BaseButton @onClick="delPressed = !delPressed" label="No" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from 'lodash';

const emit = defineEmits(['delete']);

const delPressed = ref(false);

watch(
  delPressed,
  debounce((newVal) => {
    if (newVal) delPressed.value = false;
  }, 2000),
  { immediate: false }
);
</script>
