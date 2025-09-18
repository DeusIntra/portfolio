<script setup lang="ts">
import ContactForm from '@/components/ContactForm.vue'
import TechStack from '@/components/TechStack.vue'
import CodeTerminal from '@/components/CodeTerminal.vue'

function yearsSinceBirth(birthday: Date) {
  const today = new Date();
  const ageDate = new Date(today.getTime() - birthday.getTime());
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const codeLines = [
  'const developer = {',
  '  name: "Кирилл Мазурек",',
  `  age: ${yearsSinceBirth(new Date(1996, 3, 13))},`,
  '  role: "Fullstack Developer",',
  '  skills: ["Vue", "React", "Node.js", "TypeScript", "C#"],',
  '  location: "Тюмень, Россия"',
  '};'
]

interface JobExperience {
  position: string
  company: string
  period: string
  description: string
}

const experience: JobExperience[] = [
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
    <section class="hero">
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
          <a href="#contact" class="primary-button">Написать</a>
          <router-link to="/about" class="secondary-button">Узнать</router-link>
        </div>
      </div>
      <div class="hero-visual">
        <CodeTerminal :lines="codeLines" :delay="800" />
      </div>
    </section>

    <TechStack />

    <section class="experience-section">
      <div class="container">
        <h2 class="section-title">Опыт работы</h2>
        <div class="timeline">
          <div class="timeline-item" v-for="(job, index) in experience" :key="index">
            <div class="timeline-content">
              <h3 class="job-title">{{ job.position }}</h3>
              <p class="company">{{ job.company }} • {{ job.period }}</p>
              <p class="job-description">{{ job.description }}</p>
            </div>
            <div class="timeline-dot"></div>
          </div>
        </div>
      </div>
    </section>

    <ContactForm />
  </div>
</template>

<style scoped>
.home {
  padding-top: 80px;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
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
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.experience-section {
  padding: 4rem 0;
  background: rgba(15, 23, 42, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  width: 50%;
  padding: 0 2rem;
  box-sizing: border-box;
}

.timeline-item:nth-child(odd) {
  left: 0;
  text-align: right;
}

.timeline-item:nth-child(even) {
  left: 50%;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.timeline-dot {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
}

.timeline-item:nth-child(odd) .timeline-dot {
  right: -8px;
}

.timeline-item:nth-child(even) .timeline-dot {
  left: -8px;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.company {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.job-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

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

  .primary-button, .secondary-button {
    width: 100%;
    max-width: 250px;
  }
}
</style>
