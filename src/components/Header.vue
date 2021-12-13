<template>
  <header
    class="
      flex
      items-center
      justify-between
      px-6
      py-4
      bg-white
      border-b-4 border-indigo-600
    "
  >
    <div class="flex items-center">
      <button
        @click="isOpen = true"
        class="text-gray-500 focus:outline-none lg:hidden"
      >
        <svg
          class="w-6 h-6"
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

    <div class="flex items-center">
      <div class="relative">
        <div class="relative z-10 block h-8">
          <div>{{ user?.firstName }} {{ user?.lastName }}</div>
        </div>
      </div>
      <div class="relative">
        <!-- Menu toggle button -->
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="
            relative
            z-10
            block
            p-2
            mx-2
            transition-colors
            duration-200
            transform
            bg-indigo-600
            rounded-md
            hover:bg-indigo-500
            focus:outline-none focus:bg-indigo-500
          "
        >
          <svg
            class="w-6 h-6 text-white"
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
            absolute
            right-0
            z-20
            w-48
            mt-2
            overflow-hidden
            bg-white
            rounded-md
            shadow-xl
            dark:bg-gray-700
          "
        ></div>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 z-10 w-full h-full"
        ></div>

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="
              absolute
              right-0
              z-20
              w-48
              py-2
              mt-2
              bg-white
              rounded-md
              shadow-xl
            "
          >
            <a
              href="#"
              class="
                block
                px-4
                py-2
                text-sm text-gray-700
                hover:bg-indigo-600 hover:text-white
              "
              >Profile</a
            >
            <a
              href="#"
              class="
                block
                px-4
                py-2
                text-sm text-gray-700
                hover:bg-indigo-600 hover:text-white
              "
              >Products</a
            >
            <a
              @click="logOut()"
              class="
                block
                px-4
                py-2
                text-sm text-gray-700
                hover:bg-indigo-600 hover:text-white
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
