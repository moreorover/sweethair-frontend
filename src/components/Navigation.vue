<template>
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item brand-text" to="/">Home</router-link>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/about">About</router-link>
          <router-link class="navbar-item" to="/Login">Login</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navigation',
});
</script>
