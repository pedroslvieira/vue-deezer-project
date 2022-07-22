<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :enter-active-class="route.meta.enterClass"
      :leave-active-class="route.meta.leaveClass"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
@import "@/assets/base.css";

/* .app-fade-enter-from,
.app-fade-leave-to {
  opacity: 0;
}

.app-fade-enter-active,
.app-fade-leave-active {
  transition: opacity 0.5s ease-out;
} */

#app {
  max-width: 1280px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

a {
  text-decoration: none;
}

</style>
