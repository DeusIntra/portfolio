<script setup lang="ts">
import type { PropType } from "vue";
import type { JobExperience } from "@/types/JobExperience";

defineProps({
  job: { type: Object as PropType<JobExperience>, required: true },
  right: { type: Boolean, default: false },
});
</script>

<template>
  <div class="timeline__item" :class="right ? 'timeline__item--right' : 'timeline__item--left'">
    <div class="card timeline__content">
      <h3 class="timeline__job-title">{{ job.position }}</h3>
      <p class="timeline__company">{{ job.company }} • {{ job.period }}</p>
      <p class="timeline__description">{{ job.description }}</p>
    </div>
    <div v-if="job.moreInfo" class="card timeline__more-info"></div>
    <div class="timeline__dot"></div>
  </div>
</template>
