<template>
  <span
    @click="emit('select')"
    class="
      hover:cursor-pointer
      flex
      justify-center
      items-center
      m-1
      font-medium
      py-1
      px-2
      rounded-full
      text-purple-700
      bg-purple-100
      border border-purple-300
    "
  >
    <span class="text-xs font-normal leading-none max-w-full flex-initial">{{
      props.text
    }}</span>
    <span class="flex flex-auto flex-row-reverse"></span>
    <span v-if="props.showAction" class="flex flex-auto flex-row-reverse">
      <span @click="emit('remove')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="
            feather feather-x
            cursor-pointer
            hover:text-indigo-400
            rounded-full
            w-4
            h-4
            ml-2
          "
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    </span>
  </span>
</template>
<script setup lang="ts">
type Props = {
  text: string;
  showAction: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits(['select', 'remove']);
</script>
