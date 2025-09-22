<script setup lang="ts">
import { computed, ref } from 'vue'
import CodeTerminal from '@/components/CodeTerminal.vue'
import TheTimeline from '@/components/TheTimeline.vue'
import ContactForm from '@/components/ContactForm.vue'
import type { JobExperience } from '@/types/JobExperience'
import TechStack from '@/components/TechStack.vue'
import { useI18n } from 'vue-i18n'
import type { I18nMessages } from '@/types/I18nMessages'

const { t, locale } = useI18n();

function diffsInYears(date1: Date, date2: Date): number {
  const ageDifMs = date2.getTime() - date1.getTime();
  const ageDate = new Date(ageDifMs);
  return 1970 - ageDate.getUTCFullYear() - 1;
}

const today = new Date();
const birthday = new Date(1996, 3, 13)
const age = diffsInYears(today, birthday)
const experience = diffsInYears(today, new Date(2021, 4, 1))

function tHero(s: keyof I18nMessages['home']['hero']) { return t(`home.hero.${s}`) }
function tStack(s: keyof I18nMessages['home']['techStack']) { return t(`home.techStack.${s}`) }
function tJobExperiences(s: keyof I18nMessages['home']['jobExperiences']) { return t(`home.jobExperiences.${s}`) }
function tGetExperience(s: number) {
  const experience: JobExperience = {
    position: t(`home.jobExperiences.experiences.${s}.position`),
    period: t(`home.jobExperiences.experiences.${s}.period`),
    company: t(`home.jobExperiences.experiences.${s}.company`),
    description: t(`home.jobExperiences.experiences.${s}.description`),
  }
  return experience
}
function tContact(s: keyof I18nMessages['home']['contactForm']) { return t(`home.contactForm.${s}`)}

const codeLines = ref([
  'const developer = {',
  `  name: "${tHero('name')}",`,
  `  age: ${age},`,
  `  role: "${tHero('role')}",`,
  '  skills: ["Vue", "React", "Node.js", "TypeScript"],',
  `  location: "${tHero('location')}"`,
  '};'
])

const experiences = computed<JobExperience[]>(
  () => new Array(3)
    .fill(undefined)
    .map((_, index) => tGetExperience(index))
)

</script>

<template>
  <div class="home">
    <section class="container hero">
      <div class="container hero-content">
        <h1 class="hero-title">
          {{ tHero('greeting') }} <span class="gradient-text">{{ tHero('name') }}</span>
        </h1>
        <p class="hero-subtitle">{{ tHero('fullstack') }} {{experience}}+ {{tHero('fullstackAfter')}}</p>
        <p class="hero-description">{{ tHero('create') }}</p>
        <div class="hero-actions">
          <a href="#contact" class="button button--primary button--hover">{{ tHero('contact') }}</a>
        </div>
      </div>
      <div class="hero-visual">
        <CodeTerminal :lines="codeLines" :delay="800" :key="locale" />
      </div>
    </section>

    <section class="container">
      <h2 class="section-title">{{ tStack('title') }}</h2>
      <TechStack />
    </section>

    <section class="container">
      <h2 class="section-title">{{ tJobExperiences('title') }}</h2>
      <TheTimeline :experiences="experiences" />
    </section>

    <section class="container">
      <h2 class="section-title">{{ tContact('title') }}</h2>
      <ContactForm />
    </section>
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
  min-height: calc(100vh - 4rem);
  margin-top: 0;
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

.hero-visual {
  position: relative;
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
}
</style>
