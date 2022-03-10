<template>
  <header
    class="
      tw-flex
      tw-items-center
      tw-justify-between
      tw-px-6
      tw-py-4
      tw-bg-white
      tw-border-b-4
      border-indigo-600
    "
  >
    <div class="tw-flex tw-items-center">
      <button
        @click="isOpen = true"
        class="tw-text-gray-500 focus:tw-outline-none lg:tw-hidden"
      >
        <svg
          class="tw-w-6 tw-h-6"
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
    </div>

    <div class="tw-flex tw-items-center">
      <div class="relative">
        <div class="tw-relative tw-z-10 tw-block h-8">
          <div>{{ user?.firstName }} {{ user?.lastName }}</div>
        </div>
      </div>
      <div class="tw-relative">
        <!-- Menu toggle button -->
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="
            tw-relative
            tw-z-10
            tw-block
            tw-p-2
            tw-mx-2
            tw-transition-colors
            tw-duration-200
            tw-transform
            tw-bg-indigo-600
            tw-rounded-md
            hover:tw-bg-indigo-500
            focus:tw-outline-none focus:tw-bg-indigo-500
          "
        >
          <svg
            class="tw-w-6 tw-h-6 tw-text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>

        <!-- Menu list -->
        <div
          class="
            tw-absolute
            tw-right-0
            tw-z-20
            tw-w-48
            tw-mt-2
            tw-overflow-hidden
            tw-bg-white
            tw-rounded-md
            tw-shadow-xl
            dark:tw-bg-gray-700
          "
        ></div>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="tw-fixed tw-inset-0 tw-z-10 tw-w-full tw-h-full"
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
            class="
              tw-absolute
              tw-right-0
              tw-z-20
              tw-w-48
              tw-py-2
              tw-mt-2
              tw-bg-white
              tw-rounded-md
              tw-shadow-xl
            "
          >
            <a
              href="#"
              class="
                tw-block tw-px-4 tw-py-2 tw-text-sm
                text-gray-700
                tw-hover:bg-indigo-600
                hover:text-white
              "
              >Profile</a
            >
            <a
              href="#"
              class="
                tw-block tw-px-4 tw-py-2 tw-text-sm
                text-gray-700
                hover:tw-bg-indigo-600 hover:tw-text-white
              "
              >Products</a
            >
            <a
              @click="logOut()"
              class="
                tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700
                hover:tw-bg-indigo-600 hover:tw-text-white
              "
              >Log out</a
            >
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from '@/store/loggedInUser';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSidebar } from '../hooks/useSidebar';

const dropdownOpen = ref(false);
const { isOpen } = useSidebar();

const router = useRouter();
const userStore = useLoggedInUserStore();
const user = computed(() => userStore.getUser);

const logOut = async () => {
  await userStore.logout();
  router.push('/');
};
</script>
