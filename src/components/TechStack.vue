<script setup lang="ts">
interface Technology {
  name: string
  icon: string
  description: string
}

const technologies: Technology[] = [
  { name: 'Vue', icon: "Vue", description: 'Прогрессивный фреймворк' },
  { name: 'Nuxt', icon: "Nuxt", description: 'Фреймворк для Vue' },
  { name: 'React', icon: "React", description: 'Библиотека для интерфейсов' },
  { name: 'Node', icon: "Node", description: 'Серверная платформа' },
  { name: 'TypeScript', icon: "TypeScript", description: 'Типизированный JavaScript' },
  { name: 'JavaScript', icon: "JavaScript", description: 'Язык программирования' },
  { name: 'C#', icon: "CSharp", description: 'Язык для .NET разработки' },
  { name: 'PHP', icon: "PHP", description: 'Серверный язык' },
  { name: 'PostgreSQL', icon: "PostgreSQL", description: 'Реляционная БД' },
  { name: 'Python', icon: "Python", description: 'Универсальный язык' }
]
</script>

<template>
  <div class="tech-stack">
    <div v-for="(tech, index) in technologies" :key="tech.name" class="card tech-stack__card"
      :style="`--delay: ${index * 0.1}s`">
      <div class="tech-stack__icon">
        <img :src="`/svg/${tech.icon.toLowerCase()}_logo.svg`" alt="">
      </div>
      <h3 class="tech-stack__name">{{ tech.name }}</h3>
      <p class="tech-stack__description">{{ tech.description }}</p>
    </div>
  </div>
</template>

