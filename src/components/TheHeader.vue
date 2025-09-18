<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 768)

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

function handleResize() {
  windowWidth.value = window.innerWidth
  if (windowWidth.value >= 768) {
    mobileMenuOpen.value = false
  }
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header :class="['header', { 'header--scrolled': scrolled, 'header--mobile': isMobile }]">
    <div class="header__content">
      <router-link to="/" class="header__logo">
        <span class="header__logo-text">K.Mazurek</span>
        <span class="header__logo-dot"></span>
      </router-link>

      <button class="header__mobile-menu-button" @click="toggleMobileMenu"
        :class="{ 'header__mobile-menu-button--active': mobileMenuOpen }" v-if="isMobile" aria-label="Меню">
        <span class="header__mobile-menu-line"></span>
        <span class="header__mobile-menu-line"></span>
        <span class="header__mobile-menu-line"></span>
      </button>

      <nav class="header__nav" :class="{ 'header__nav--open': mobileMenuOpen }">
        <router-link to="/" class="header__nav-link" @click="closeMobileMenu">Главная</router-link>
        <router-link to="/about" class="header__nav-link" @click="closeMobileMenu">Обо мне</router-link>
      </nav>

      <div class="header__actions" v-if="!isMobile">
        <a href="#contact" class="header__contact-button">Связаться</a>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
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

  &--scrolled {
    background: rgba(15, 23, 42, 0.8);
    padding: 1rem 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  &--mobile {
    padding: 1rem 0;
  }

  @media (max-width: 480px) {
    padding: 1rem 0;

    &--scrolled {
      padding: 0.8rem 0;
    }
  }

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
    position: relative;
  }

  &__logo-text {
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  &__logo-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: linear-gradient(45deg, #6366f1, #8b5cf6);
    border-radius: 50%;
    margin-left: 4px;
    animation: pulse 2s infinite;
  }

  &__nav {
    display: flex;
    gap: 2rem;

    &--open {
      transform: translateX(0) !important;
    }
  }

  &__nav-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      color: white;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  &__contact-button {
    background: linear-gradient(45deg, #6366f1, #8b5cf6);
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
    }
  }

  &__mobile-menu-button {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 25px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;

    &--active {
      .header__mobile-menu-line {
        &:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
      }
    }

    @media (max-width: 768px) {
      display: flex;
    }
  }

  &__mobile-menu-line {
    width: 100%;
    height: 3px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &__actions {
    @media (max-width: 768px) {
      display: none;
    }
  }
}

.header--mobile {
  .header__nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
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
</style>
