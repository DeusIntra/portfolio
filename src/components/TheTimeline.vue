<script setup lang="ts">
import type { JobExperience } from '@/types/JobExperience';
import { onMounted } from 'vue';

defineProps({
  experiences: { type: Array<JobExperience>, required: true },
})

onMounted(() => {
  const items = document.querySelectorAll<HTMLElement>('.timeline-item')
  items.forEach(item => item.style = 'opacity:1;')
})
</script>

<template>
  <section class="experience-section">
    <div class="container">
      <h2 class="section-title">Опыт работы</h2>
      <div class="timeline">
        <div v-for="(job, index) in experiences" :key="index" class="timeline-item"
          :class="index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'">
          <div class="card timeline-content">
            <h3 class="job-title">{{ job.position }}</h3>
            <p class="company">{{ job.company }} • {{ job.period }}</p>
            <p class="job-description">{{ job.description }}</p>
          </div>
          <div class="timeline-dot"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.experience-section {
  padding: 4rem 0;
  background: rgba(15, 23, 42, 0.3);

  .container {
    max-width: 1200px;
  }
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
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.timeline-item-left {
  left: 0;
  text-align: right;

  .timeline-dot {
    right: -8px;
  }
}

.timeline-item-right {
  left: 50%;

  .timeline-dot {
    left: -8px;
  }
}

.timeline-content {
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
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

.timeline-item.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 968px) {
  .timeline::before {
    left: 20px;
  }

  .timeline-item {
    width: 100%;
    left: 0 !important;
    padding-left: 50px;
    padding-right: 0;
    text-align: left !important;
  }

  .timeline-item-left .timeline-dot,
  .timeline-item-right .timeline-dot {
    left: 12px;
  }
}

@media (max-width: 480px) {
  .timeline-content {
    padding: 1rem;
  }

  .job-title {
    font-size: 1.1rem;
  }

  .company {
    font-size: 0.9rem;
  }

  .job-description {
    font-size: 0.9rem;
  }
}
</style>
