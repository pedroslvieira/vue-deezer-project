<script setup>
import { RouterView } from "vue-router";

const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
  const requireHTTPS = document.getElementById('requireHTTPS');
  const link = requireHTTPS.querySelector('a');
  link.href = window.location.href.replace('http://', 'https://');
  requireHTTPS.classList.remove('hidden');
}

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
