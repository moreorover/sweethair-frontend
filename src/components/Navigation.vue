<template>
  <!-- <nav class="navbar is-white has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item brand-text" to="/">Sweet Hair</router-link>
        <a class="navbar-burger" data-target="navMenu" :class="{ 'is-active': isOpen }" @click="isOpen = !isOpen">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <div id="navMenu" class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start" :class="{ 'is-hidden': !isOpen }">
          <side-menu />
        </div>
        <div class="navbar-end">
          <div v-if="isLoggedIn" class="navbar-item">Hello {{ user?.firstName }} {{ user?.lastName }}</div>
          <router-link v-if="isLoggedIn" class="navbar-item" to="/logout">Logout</router-link>

          <router-link v-else class="navbar-item" to="/login">Log In</router-link>
        </div>
      </div>
    </div>
  </nav> -->

  <div
    class="surface-overlay py-3 px-6 shadow-2 flex align-items-center justify-content-between relative lg:static"
    style="min-height: 80px"
  >
    <img src="images/blocks/logos/bastion-700.svg" alt="Image" height="40" class="mr-0 lg:mr-6" />
    <a
      v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }"
      class="cursor-pointer block lg:hidden text-700"
    >
      >
      <i class="pi pi-bars text-4xl"></i>
    </a>
    <div
      class="
        align-items-center
        flex-grow-1
        justify-content-between
        hidden
        lg:flex
        absolute
        lg:static
        w-full
        surface-overlay
        left-0
        top-100
        z-1
        shadow-2
        lg:shadow-none
      "
    >
      <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row">
        <li>
          <a
            class="
              flex
              px-6
              p-3
              lg:px-3 lg:py-2
              align-items-center
              text-600
              hover:text-900 hover:surface-100
              font-medium
              border-round
              cursor-pointer
              transition-colors transition-duration-150
            "
          >
            <i class="pi pi-home mr-2"></i>
            <span>Home</span>
          </a>
        </li>
        <li class="lg:relative">
          <a
            v-styleclass="{
              selector: '@next',
              enterClass: 'hidden',
              enterActiveClass: 'scalein',
              leaveToClass: 'hidden',
              leaveActiveClass: 'fadeout',
              hideOnOutsideClick: true,
            }"
            class="
              flex
              px-6
              p-3
              lg:px-3 lg:py-2
              align-items-center
              text-600
              hover:text-900 hover:surface-100
              font-medium
              border-round
              cursor-pointer
              transition-colors transition-duration-150
            "
          >
            <i class="pi pi-users mr-2"></i>
            <span>Customers</span>
            <i class="pi pi-angle-down ml-auto lg:ml-3"></i>
          </a>
          <ul
            class="
              list-none
              py-3
              px-6
              m-0
              lg:px-0 lg:py-0
              border-round
              shadow-0
              lg:shadow-2 lg:border-1
              border-50
              lg:absolute
              surface-overlay
              hidden
              origin-top
              w-full
              lg:w-15rem
              cursor-pointer
            "
          >
            <li>
              <a
                class="
                  flex
                  p-3
                  align-items-center
                  text-600
                  hover:text-900 hover:surface-100
                  transition-colors transition-duration-150
                "
              >
                <i class="pi pi-user-plus mr-2"></i>
                <span class="font-medium">Add New</span>
              </a>
            </li>
            <li class="relative">
              <a
                v-styleclass="{
                  selector: '@next',
                  enterClass: 'hidden',
                  enterActiveClass: 'scalein',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'fadeout',
                  hideOnOutsideClick: true,
                }"
                class="
                  flex
                  p-3
                  align-items-center
                  text-600
                  hover:text-900 hover:surface-100
                  transition-colors transition-duration-150
                "
              >
                <i class="pi pi-search mr-2"></i>
                <span class="font-medium">Search</span>
                <i class="pi pi-angle-down ml-auto lg:-rotate-90"></i>
              </a>
              <ul
                class="
                  list-none
                  py-3
                  pl-3
                  m-0
                  lg:px-0 lg:py-0
                  border-round
                  shadow-0
                  lg:shadow-2 lg:border-1
                  border-50
                  lg:absolute
                  surface-overlay
                  hidden
                  origin-top
                  w-full
                  lg:w-15rem
                  cursor-pointer
                  left-100
                  top-0
                "
              >
                <li>
                  <a
                    class="
                      flex
                      p-3
                      align-items-center
                      text-600
                      hover:text-900 hover:surface-100
                      transition-colors transition-duration-150
                    "
                  >
                    <i class="pi pi-shopping-cart mr-2"></i>
                    <span class="font-medium">Purchases</span>
                  </a>
                </li>
                <li class="relative">
                  <a
                    class="
                      flex
                      p-3
                      align-items-center
                      text-600
                      hover:text-900 hover:surface-100
                      transition-colors transition-duration-150
                    "
                  >
                    <i class="pi pi-comments mr-2"></i>
                    <span class="font-medium">Messages</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a
            class="
              flex
              px-6
              p-3
              lg:px-3 lg:py-2
              align-items-center
              text-600
              hover:text-900 hover:surface-100
              font-medium
              border-round
              cursor-pointer
              transition-colors transition-duration-150
            "
          >
            <i class="pi pi-calendar mr-2"></i>
            <span>Calendar</span>
          </a>
        </li>
        <li>
          <a
            class="
              flex
              px-6
              p-3
              lg:px-3 lg:py-2
              align-items-center
              text-600
              hover:text-900 hover:surface-100
              font-medium
              border-round
              cursor-pointer
              transition-colors transition-duration-150
            "
          >
            <i class="pi pi-chart-line mr-2"></i>
            <span>Stats</span>
          </a>
        </li>
      </ul>
      <ul
        class="
          list-none
          p-0
          m-0
          flex
          lg:align-items-center
          select-none
          flex-column
          lg:flex-row
          border-top-1
          surface-border
          lg:border-top-none
        "
      >
        <li>
          <a
            class="
              flex
              px-6
              p-3
              lg:px-3 lg:py-2
              align-items-center
              text-600
              hover:text-900 hover:surface-100
              font-medium
              border-round
              cursor-pointer
              transition-colors transition-duration-150
            "
          >
            <i class="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
            <span class="block lg:hidden font-medium">Inbox</span>
          </a>
        </li>
        <li>
          <a
            class="
              flex
              px-6
              p-3
              lg:px-3 lg:py-2
              align-items-center
              text-600
              hover:text-900 hover:surface-100
              font-medium
              border-round
              cursor-pointer
              transition-colors transition-duration-150
            "
          >
            <i v-badge.danger class="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0"></i>
            <span class="block lg:hidden font-medium">Notifications</span>
          </a>
        </li>
        <li class="border-top-1 surface-border lg:border-top-none">
          <a
            class="
              flex
              px-6
              p-3
              lg:px-3 lg:py-2
              align-items-center
              hover:surface-100
              font-medium
              border-round
              cursor-pointer
              transition-colors transition-duration-150
            "
          >
            <img
              src="images/blocks/avatars/circle/avatar-f-1.png"
              class="mr-3 lg:mr-0"
              style="width: 32px; height: 32px"
            />
            <div class="block lg:hidden">
              <div class="text-900 font-medium">Josephine Lillard</div>
              <span class="text-600 font-medium text-sm">Marketing Specialist</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
// import SideMenu from '@/components/SideMenu.vue';
import { useLoggedInUserStore } from '@/store/loggedInUser';

export default defineComponent({
  name: 'Navigation',
  // components: { SideMenu },
  setup() {
    const isOpen = ref<boolean>(false);
    const store = useLoggedInUserStore();

    return { isOpen, user: computed(() => store.getUser), isLoggedIn: computed(() => store.getIsLoggedIn) };
  },
});
</script>
<style scoped></style>
