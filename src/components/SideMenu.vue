<template>
  <div
    id="app-sidebar"
    class="
      surface-section
      h-full
      lg:h-auto
      hidden
      lg:block
      flex-shrink-0
      absolute
      lg:static
      left-0
      top-0
      z-1
      border-right-1
      surface-border
      select-none
    "
    style="width: 280px"
  >
    <div class="flex flex-column h-full">
      <div class="flex align-items-center px-5 flex-shrink-0" style="height: 60px">
        <!-- <img src="images/blocks/logos/hyper-700.svg" alt="Image" height="30" /> -->
      </div>
      <div class="overflow-y-auto">
        <ul class="list-none p-3 m-0">
          <li>
            <div
              v-styleclass="{
                selector: '@next',
                enterClass: 'hidden',
                enterActiveClass: 'slidedown',
                leaveToClass: 'hidden',
                leaveActiveClass: 'slideup',
              }"
              class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer"
            >
              <span class="font-medium">FAVORITES</span>
              <i class="pi pi-chevron-down"></i>
            </div>
            <ul class="list-none p-0 m-0 overflow-hidden">
              <router-link v-slot="{ navigate }" to="/" custom>
                <li @click="navigate">
                  <a
                    class="
                      flex
                      align-items-center
                      cursor-pointer
                      p-3
                      border-round
                      text-700
                      hover:surface-100
                      transition-duration-150 transition-colors
                    "
                  >
                    <i class="pi pi-home mr-2"></i>
                    <span class="font-medium">Dashboard</span>
                  </a>
                </li>
              </router-link>
              <router-link v-slot="{ navigate }" to="/customers" custom>
                <li @click="navigate">
                  <a
                    class="
                      flex
                      align-items-center
                      cursor-pointer
                      p-3
                      border-round
                      text-700
                      hover:surface-100
                      transition-duration-150 transition-colors
                    "
                  >
                    <i class="pi pi-users mr-2"></i>
                    <span class="font-medium">Customers</span>
                  </a>
                </li>
              </router-link>
              <router-link v-slot="{ navigate }" to="/appointments" custom>
                <li @click="navigate">
                  <a
                    class="
                      flex
                      align-items-center
                      cursor-pointer
                      p-3
                      border-round
                      text-700
                      hover:surface-100
                      transition-duration-150 transition-colors
                    "
                  >
                    <i class="pi pi-calendar mr-2"></i>
                    <span class="font-medium">Appointments</span>
                  </a>
                </li>
              </router-link>
              <router-link v-slot="{ navigate }" to="/transactions" custom>
                <li @click="navigate">
                  <a
                    class="
                      flex
                      align-items-center
                      cursor-pointer
                      p-3
                      border-round
                      text-700
                      hover:surface-100
                      transition-duration-150 transition-colors
                    "
                  >
                    <i class="pi pi-wallet mr-2"></i>
                    <span class="font-medium">Transactions</span>
                  </a>
                </li>
              </router-link>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SideMenu',
});
</script>

<style></style>
