<script setup lang="ts">
// import { Vue, Nuxt, React, Node, TypeScript, JavaScript, CSharp, PHP, PostgreSQL, Python } from '@/assets/icons';

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
    <h2 class="section-title">Мой стек технологий</h2>
    <div class="tech-grid">
      <div v-for="(tech, index) in technologies" :key="tech.name" class="tech-card" :style="`--delay: ${index * 0.1}s`">
        <div class="tech-icon">
          <img :src="`/svg/${tech.icon.toLowerCase()}_logo.svg`" alt="">
        </div>
        <h3 class="tech-name">{{ tech.name }}</h3>
        <p class="tech-description">{{ tech.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tech-stack {
  padding: 4rem 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.tech-card {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: var(--delay);
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
}

.tech-icon {
  flex: 1 0 0;
  display: flex;
  margin-bottom: 1rem;
  color: #6366f1;

  img {
    max-width: 100%;
  }
}

.tech-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.tech-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
