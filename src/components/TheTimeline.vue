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
  <div class="timeline container timeline__container">
    <div v-for="(job, index) in experiences" :key="index" class="timeline__item"
      :class="index % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'">
      <div class="card timeline__content">
        <h3 class="timeline__job-title">{{ job.position }}</h3>
        <p class="timeline__company">{{ job.company }} • {{ job.period }}</p>
        <p class="timeline__description">{{ job.description }}</p>
      </div>
      <div class="timeline__dot"></div>
    </div>
  </div>
</template>
