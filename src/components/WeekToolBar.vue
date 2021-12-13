<template>
  <div class="flex items-center justify-center mb-4">
    <button
      v-if="weekNumber != currentWeek"
      @click="reset"
      class="
        text-purple-500
        bg-transparent
        border-l border-t border-b border-purple-500
        hover:bg-purple-500 hover:text-white
        active:bg-purple-600
        font-bold
        uppercase
        text-xs
        px-4
        py-2
        rounded-l
        outline-none
        focus:outline-none
        mb-1
        ease-linear
        transition-all
        duration-150
      "
      type="button"
    >
      Reset
    </button>
    <button
      @click="decreaseWeek"
      class="
        text-purple-500
        bg-transparent
        border-l border-t border-b border-purple-500
        hover:bg-purple-500 hover:text-white
        active:bg-purple-600
        font-bold
        uppercase
        text-xs
        px-4
        py-2
        rounded-l
        outline-none
        focus:outline-none
        mb-1
        ease-linear
        transition-all
        duration-150
      "
      type="button"
    >
      - Week
    </button>
    <button
      class="
        border border-solid border-purple-500
        text-white
        bg-purple-500
        font-bold
        uppercase
        text-xs
        px-4
        py-2
        outline-none
        focus:outline-none
        mb-1
        ease-linearp
        transition-all
        duration-150
      "
      type="button"
    >
      {{ weekStart.format('DD MMM yyyy') }} -
      {{ weekEnd.format('DD MMM yyyy') }}
    </button>

    <button
      @click="increaseWeek"
      class="
        text-purple-500
        bg-transparent
        border-t border-b border-r border-purple-500
        hover:bg-purple-500 hover:text-white
        active:bg-purple-600
        font-bold
        uppercase
        text-xs
        px-4
        py-2
        rounded-r
        outline-none
        focus:outline-none
        mb-1
        ease-linear
        transition-all
        duration-150
      "
      type="button"
    >
      + Week
    </button>
  </div>
</template>
<script setup lang="ts">
import { useWeek } from '@/hooks/useWeek';

const {
  currentWeek,
  weekNumber,
  weekStart,
  weekEnd,
  increaseWeek,
  decreaseWeek,
  reset,
} = useWeek();
</script>
