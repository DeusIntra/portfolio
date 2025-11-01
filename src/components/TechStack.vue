<script setup lang="ts">
import type { I18nMessages } from "@/types/I18nMessages";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

function tStack(s: keyof I18nMessages["home"]["techStack"]) {
  return t(`home.techStack.${s}`);
}

interface Technology {
  name: string;
  icon: string;
  description: string;
}

const technologies = computed<Technology[]>(() => [
  { name: "Vue", icon: "Vue", description: tStack("vue") },
  { name: "Nuxt", icon: "Nuxt", description: tStack("nuxt") },
  { name: "React", icon: "React", description: tStack("react") },
  { name: "Node", icon: "Node", description: tStack("node") },
  { name: "TypeScript", icon: "TypeScript", description: tStack("typescript") },
  { name: "JavaScript", icon: "JavaScript", description: tStack("javascript") },
  { name: "C#", icon: "CSharp", description: tStack("csharp") },
  { name: "PHP", icon: "PHP", description: tStack("php") },
  { name: "PostgreSQL", icon: "PostgreSQL", description: tStack("postgresql") },
  { name: "Python", icon: "Python", description: tStack("python") },
]);
</script>

<template>
  <div class="tech-stack">
    <div
      v-for="(tech, index) in technologies"
      :key="tech.description"
      class="card tech-stack__card"
      :style="`--delay: ${index * 0.1}s`"
    >
      <div class="tech-stack__icon">
        <img :src="`/svg/${tech.icon.toLowerCase()}_logo.svg`" alt="" />
      </div>
      <h3 class="tech-stack__name">{{ tech.name }}</h3>
      <p class="tech-stack__description">{{ tech.description }}</p>
    </div>
  </div>
</template>
