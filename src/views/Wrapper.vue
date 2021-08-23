<template>
  <navigation />

  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/Navigation.vue";

export default defineComponent({
  components: { Navigation },
});
</script>

Navigation
