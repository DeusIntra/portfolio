<script setup lang="ts">
import type { JobExperience } from '@/types/JobExperience';
import { onMounted } from 'vue';

defineProps({
  experiences: { type: Array<JobExperience>, required: true },
})

onMounted(() => {
  const items = document.querySelectorAll<HTMLElement>('.timeline__item')
  items.forEach(item => item.style = 'opacity:1;')
})
</script>

<template>
  <section class="timeline">
    <div class="container">
      <h2 class="section-title">Опыт работы</h2>
      <div class="container timeline__container">
        <div
          v-for="(job, index) in experiences"
          :key="index"
          class="timeline__item"
          :class="index % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'"
        >
          <div class="card timeline__content">
            <h3 class="timeline__job-title">{{ job.position }}</h3>
            <p class="timeline__company">{{ job.company }} • {{ job.period }}</p>
            <p class="timeline__description">{{ job.description }}</p>
          </div>
          <div class="timeline__dot"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.timeline {
  padding: 4rem 0;
  background: rgba(15, 23, 42, 0.3);

  .container {
    max-width: 1200px;
  }
}

.timeline__container {
  position: relative;
  max-width: 800px;
}

.timeline__container::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
}

.timeline__item {
  position: relative;
  margin-bottom: 3rem;
  width: 50%;
  padding: 0 2rem;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.timeline__item--left {
  left: 0;
  text-align: right;

  .timeline__dot {
    right: -8px;
  }
}

.timeline__item--right {
  left: 50%;

  .timeline__dot {
    left: -8px;
  }
}

.timeline__content {
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.timeline__content:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
}

.timeline__dot {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
}

.timeline__job-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.timeline__company {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.timeline__description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.timeline__item.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 968px) {
  .timeline__container::before {
    left: 20px;
  }

  .timeline__item {
    width: 100%;
    left: 0 !important;
    padding-left: 50px;
    padding-right: 0;
    text-align: left !important;
  }

  .timeline__item--left .timeline__dot,
  .timeline__item--right .timeline__dot {
    left: 12px;
  }
}

@media (max-width: 480px) {
  .timeline__content {
    padding: 1rem;
  }

  .timeline__job-title {
    font-size: 1.1rem;
  }

  .timeline__company {
    font-size: 0.9rem;
  }

  .timeline__description {
    font-size: 0.9rem;
  }

  .timeline__dot {
    display: none;
  }

  .timeline__container::before {
    content: none;
  }

  .timeline__item {
    padding: 0;
  }
}
</style>
