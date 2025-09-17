<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['header', { 'header-scrolled': scrolled }]">
    <div class="header-content">
      <router-link to="/" class="logo">
        <span class="logo-text">K.Mazurek</span>
        <span class="logo-dot"></span>
      </router-link>

      <nav class="nav">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/about" class="nav-link">Обо мне</router-link>
      </nav>

      <div class="header-actions">
        <a href="#contact" class="contact-button">Связаться</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 0;
  z-index: 100;
  transition: all 0.3s ease;
  background: transparent;
  backdrop-filter: blur(10px);
}

.header-scrolled {
  background: rgba(15, 23, 42, 0.8);
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  position: relative;
}

.logo-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  margin-left: 4px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.7;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: white;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.contact-button {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.contact-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}
</style>
