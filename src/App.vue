<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import AnimatedBackground from "./components/AnimatedBackground.vue";
</script>

<template>
  <div id="app">
    <AnimatedBackground />
    <TheHeader />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.main-content {
  position: relative;
  z-index: 1;
}
</style>
