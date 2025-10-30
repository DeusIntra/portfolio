<script setup lang="ts">
import type { JobExperience } from "@/types/JobExperience";
import { onMounted } from "vue";
import TimelineItem from "./TimelineItem.vue";

defineProps({
  experiences: { type: Array<JobExperience>, required: true },
});

onMounted(() => {
  const items = document.querySelectorAll<HTMLElement>(".timeline__item");
  items.forEach((item) => (item.style = "opacity:1;"));
});
</script>

<template>
  <div class="timeline container timeline__container">
    <TimelineItem
      v-for="(job, index) in experiences"
      :key="index"
      :job="job"
      :right="index % 2 == 0"
    />
  </div>
</template>
