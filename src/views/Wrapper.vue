<template>
  <navigation />

  <section class="section">
    <div class="columns is-tablet">
      <div class="column is-2 is-hidden-touch">
        <side-menu />
      </div>
      <div class="column">
        <router-view />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from '@/components/Navigation.vue';
import SideMenu from '@/components/SideMenu.vue';

export default defineComponent({
  components: { Navigation, SideMenu },
});
</script>
<style></style>
