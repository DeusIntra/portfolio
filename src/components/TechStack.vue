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
    <h2 class="section-title">Мой стек технологий</h2>
    <div class="container tech-stack__grid">
      <div
        v-for="(tech, index) in technologies"
        :key="tech.name"
        class="card tech-stack__card"
        :style="`--delay: ${index * 0.1}s`"
      >
        <div class="tech-stack__icon">
          <img :src="`/svg/${tech.icon.toLowerCase()}_logo.svg`" alt="">
        </div>
        <h3 class="tech-stack__name">{{ tech.name }}</h3>
        <p class="tech-stack__description">{{ tech.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tech-stack {
  padding: 4rem 0;

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    text-align: center;
    opacity: 0;
    transition: all 0.3s ease;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: var(--delay);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      background: rgba(255, 255, 255, 0.1);
    }
  }

  &__icon {
    flex: 1 0 0;
    display: flex;
    margin-bottom: 1rem;
    color: #6366f1;

    img {
      max-width: 100%;
    }
  }

  &__name {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: white;
  }

  &__description {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }

}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
