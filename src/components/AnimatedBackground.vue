<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const shapes = document.querySelectorAll<HTMLElement>('.floating-shape')
  shapes.forEach((shape, index) => {
    const delay = index * 0.7
    const duration = 3 + Math.random() * 2
    shape.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`
  })
})
</script>

<template>
  <div class="animated-background">
    <div class="floating-shape shape-1"></div>
    <div class="floating-shape shape-2"></div>
    <div class="floating-shape shape-3"></div>
    <div class="floating-shape shape-4"></div>
    <div class="floating-shape shape-5"></div>
  </div>
</template>

<style scoped>
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(40px);
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  top: 10%;
  left: 5%;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(45deg, #ec4899, #f59e0b);
  bottom: 15%;
  right: 5%;
}

.shape-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(45deg, #10b981, #3b82f6);
  top: 50%;
  left: 70%;
}

.shape-4 {
  width: 350px;
  height: 350px;
  background: linear-gradient(45deg, #f97316, #ef4444);
  bottom: 5%;
  left: 20%;
}

.shape-5 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #06b6d4, #a855f7);
  top: 20%;
  right: 15%;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}
</style>
