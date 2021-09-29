<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import 'vue3-date-time-picker/dist/main.css';
export default defineComponent({});
</script>

<style>
html,
body {
  font-family: Karla, Rubik;
  height: 100%;
  background-color: whitesmoke;
}

.hero.welcome.is-info {
  background: -webkit-linear-gradient(to right, #a059a0, #e900a3);
  background: linear-gradient(to right, #a059a0, #e900a3);
}

textarea {
  font-family: 'Karla', BlinkMacSystemFont, -apple-system, 'Helvetica', 'Arial', sans-serif;
}
</style>
