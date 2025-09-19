<script setup lang="ts">
import { ref } from 'vue'
import CodeTerminal from '@/components/CodeTerminal.vue'
import TheTimeline from '@/components/TheTimeline.vue'
import ContactForm from '@/components/ContactForm.vue'
import type { JobExperience } from '@/types/JobExperience'
import TechStack from '@/components/TechStack.vue'


function diffsInYears(date1: Date, date2: Date): number {
  const ageDifMs = date2.getTime() - date1.getTime();
  const ageDate = new Date(ageDifMs);
  return 1970 - ageDate.getUTCFullYear() - 1;
}

const birthday = new Date(1996, 3, 13)
function calculateAge(birthday: Date): number {
  return diffsInYears(new Date(), birthday)
}

const codeLines = ref([
  'const developer = {',
  '  name: "Кирилл Мазурек",',
  `  age: ${calculateAge(birthday)},`,
  '  role: "Fullstack Developer",',
  '  skills: ["Vue", "React", "Node.js", "TypeScript"],',
  '  location: "Тюмень, Россия"',
  '};'
])

const experiences: JobExperience[] = [
  {
    position: 'Frontend-разработчик',
    company: 'ООО "Медиа Инстанс"',
    period: 'Апрель 2024 — настоящее время',
    description: 'Разработка фронтендной части веб-приложений, встраиваемых в систему Битрикс24 и их поддержка'
  },
  {
    position: 'Веб-разработчик',
    company: 'ООО "ЦКС"',
    period: 'Май 2021 — Апрель 2024',
    description: 'Разработка сайта, поддержка сайта, деплой'
  },
  {
    position: 'Преподаватель Roblx, Unity, C#',
    company: 'Школа программирования Coddy',
    period: 'Сентябрь 2018 — Июль 2020',
    description: 'Проводил занятия в группах по 8-10 детей от 8 до 17 лет'
  }
]
</script>

<template>
  <div class="home">
    <section class="container hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Привет, я <span class="gradient-text">Кирилл Мазурек</span>
        </h1>
        <p class="hero-subtitle">Fullstack разработчик с 6+ годами опыта</p>
        <p class="hero-description">
          Создаю современные веб-приложения с использованием Vue, React, Node.js и других технологий.
          Готов к реализации ваших проектов!
        </p>
        <div class="hero-actions">
          <a href="#contact" class="primary-button">Начать проект</a>
          <router-link to="/about" class="secondary-button">Узнать больше</router-link>
        </div>
      </div>
      <div class="hero-visual">
        <CodeTerminal :lines="codeLines" :delay="800" />
      </div>
    </section>

    <TechStack />
    <TheTimeline :experiences="experiences" />
    <ContactForm />
  </div>
</template>

<style scoped lang="scss">
.home {
  padding-top: 80px;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 100vh;
}

.hero-content {
  max-width: 500px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradientMove 3s ease infinite;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.primary-button {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
}

.secondary-button {
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
}

.hero-visual {
  position: relative;
}

// Медиазапросы для мобильных устройств
@media (max-width: 968px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    padding: 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
    max-width: 250px;
  }
}
</style>
