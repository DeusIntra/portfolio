<script setup lang="ts">
import type { I18nMessages } from '@/types/I18nMessages'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'


const { t } = useI18n()

const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 768)

function tHeader(s: keyof I18nMessages['home']['header']): string { return t(`home.header.${s}`) }

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
    <div class="container header__content">
      <router-link to="/" class="header__logo">
        <span class="header__logo-text">K.Mazurek</span>
        <span class="header__logo-dot"></span>
      </router-link>

      <button class="header__mobile-menu-button" @click="toggleMobileMenu"
        :class="{ 'header__mobile-menu-button--active': mobileMenuOpen }" v-if="isMobile">
        <span class="header__mobile-menu-line"></span>
        <span class="header__mobile-menu-line"></span>
        <span class="header__mobile-menu-line"></span>
      </button>

      <nav class="header__nav" :class="{ 'header__nav--open': mobileMenuOpen }">
        <router-link to="/" class="header__nav-link" @click="closeMobileMenu">{{ tHeader('home') }}</router-link>
        <router-link to="/about" class="header__nav-link" @click="closeMobileMenu">{{ tHeader('about') }}</router-link>
      </nav>

      <div class="header__actions" v-if="!isMobile">
        <a href="#contact" class="button-sm button--primary">{{ tHeader('contact') }}</a>
      </div>
    </div>
  </header>
</template>

