<template>
  <line-chart :data="data" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
});
</script>
