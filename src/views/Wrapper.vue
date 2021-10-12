<template>
  <div class="min-h-screen flex relative lg:static surface-ground">
    <side-menu />
    <div class="min-h-screen flex flex-column relative flex-auto">
      <div
        class="
          flex
          justify-content-between
          align-items-center
          px-5
          surface-0
          border-bottom-1
          surface-border
          relative
          lg:static
        "
        style="height: 60px"
      >
        <div class="flex">
          <a
            v-styleclass="{
              selector: '#app-sidebar',
              enterClass: 'hidden',
              enterActiveClass: 'fadeinleft',
              leaveToClass: 'hidden',
              leaveActiveClass: 'fadeoutleft',
              hideOnOutsideClick: true,
            }"
            class="cursor-pointer block lg:hidden text-700 mr-3"
          >
            <i class="pi pi-bars text-4xl"></i>
          </a>
        </div>
      </div>
      <div class="flex flex-column flex-auto">
        <div class="px-4 py-5 md:px-6 lg:px-8">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideMenu from '@/components/SideMenu.vue';

export default defineComponent({
  components: { SideMenu },
});
</script>
<style></style>
