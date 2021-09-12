<template>
  <navigation />

  <div class="container">
    <div class="columns">
      <div class="column is-3 is-hidden-mobile">
        <side-menu />
      </div>
      <div class="column is-9">
        <router-view />
      </div>
    </div>
  </div>
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
