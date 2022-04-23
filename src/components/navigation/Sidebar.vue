<script setup lang="ts">
import { ref } from 'vue';
import { useSidebar } from '../../hooks/useSidebar';

const activeClass = ref(
  'tw-bg-gray-600 tw-bg-opacity-25 tw-text-gray-100 tw-border-gray-100'
);
const inactiveClass = ref(
  'tw-border-gray-900 tw-text-gray-500 hover:tw-bg-gray-600 hover:tw-bg-opacity-25 hover:tw-text-gray-100'
);

const { isOpen } = useSidebar();

const routes = [
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Customers', link: '/customers' },
  { title: 'Suppliers', link: '/suppliers' },
  { title: 'Purchases', link: '/purchases' },
  { title: 'Products', link: '/products' },
];
</script>

<template>
  <div class="tw-flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'tw-block' : 'tw-hidden'"
      @click="isOpen = false"
      class="tw-fixed tw-inset-0 tw-z-20 tw-bg-black tw-opacity-50 tw-transition-opacity lg:tw-hidden"
    ></div>
    <!-- End Backdrop -->

    <div
      :class="
        isOpen
          ? 'tw-translate-x-0 tw-ease-out'
          : 'tw--translate-x-full tw-ease-in'
      "
      class="tw-fixed tw-inset-y-0 tw-left-0 tw-z-30 tw-w-64 tw-transform tw-overflow-y-auto tw-bg-gray-900 tw-transition tw-duration-300 lg:tw-static lg:tw-inset-0 lg:tw-translate-x-0"
    >
      <div class="tw-mt-8 tw-flex tw-items-center tw-justify-center">
        <div class="tw-flex tw-items-center">
          <svg
            class="tw-h-12 tw-w-12"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
              fill="#4C51BF"
              stroke="#4C51BF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
              fill="white"
            />
          </svg>

          <span class="tw-mx-2 tw-text-2xl tw-font-semibold tw-text-white"
            >Salooner</span
          >
        </div>
      </div>

      <nav class="tw-mt-10">
        <router-link
          v-for="route of routes"
          class="tw-mt-4 tw-flex tw-items-center tw-border-l-4 tw-px-6 tw-py-2 tw-duration-200"
          :class="[$route.name === route.title ? activeClass : inactiveClass]"
          :to="route.link"
        >
          <span class="tw-mx-4">{{ route.title }}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>
