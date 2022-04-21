<script setup lang="ts">
import { ref } from 'vue';
import { useSidebar } from '../../hooks/useSidebar';
const dropdownOpen = ref(false);
const { isOpen } = useSidebar();
</script>
<template>
  <header
    class="tw-flex tw-items-center tw-justify-between tw-border-b-4 tw-border-indigo-600 tw-bg-white tw-px-6 tw-py-4"
  >
    <div class="tw-flex tw-items-center">
      <button
        @click="isOpen = true"
        class="tw-text-gray-500 focus:tw-outline-none lg:tw-hidden"
      >
        <svg
          class="tw-h-6 tw-w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="tw-relative tw-mx-4 lg:tw-mx-0">
        <span
          class="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3"
        >
          <svg
            class="tw-h-5 tw-w-5 tw-text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        <input
          class="tw-w-32 tw-rounded-md tw-border-gray-200 tw-pl-10 tw-pr-4 tw-text-indigo-600 focus:tw-border-indigo-600 focus:tw-ring focus:tw-ring-indigo-500 focus:tw-ring-opacity-40 sm:tw-w-64"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>

    <div class="tw-flex tw-items-center">
      <button class="tw-mx-4 tw-flex tw-text-gray-600 focus:tw-outline-none">
        <svg
          class="tw-h-6 tw-w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="tw-relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="tw-relative tw-z-10 tw-block tw-h-8 tw-w-8 tw-overflow-hidden tw-rounded-full tw-shadow focus:tw-outline-none"
        >
          <div class="tw-h-full tw-w-full tw-bg-gray-600 tw-object-cover" />
        </button>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="tw-fixed tw-inset-0 tw-z-10 tw-h-full tw-w-full"
        ></div>

        <transition
          enter-active-class="tw-transition tw-duration-150 tw-ease-out tw-transform"
          enter-from-class="tw-scale-95 tw-opacity-0"
          enter-to-class="tw-scale-100 tw-opacity-100"
          leave-active-class="tw-transition tw-duration-150 tw-ease-in tw-transform"
          leave-from-class="tw-scale-100 tw-opacity-100"
          leave-to-class="tw-scale-95 tw-opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="tw-absolute tw-right-0 tw-z-20 tw-mt-2 tw-w-48 tw-rounded-md tw-bg-white tw-py-2 tw-shadow-xl"
          >
            <a
              href="#"
              class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-indigo-600 hover:tw-text-white"
              >Profile</a
            >
            <a
              href="#"
              class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-indigo-600 hover:tw-text-white"
              >Products</a
            >
            <router-link
              to="/"
              class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-indigo-600 hover:tw-text-white"
              >Log out</router-link
            >
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
