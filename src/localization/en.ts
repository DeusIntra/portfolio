import type { I18nMessages } from "@/types/I18nMessages";

const en: I18nMessages = {
  home: {
    header: {
      home: "Home",
      about: "About",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      name: "Kirill Mazurek",
      fullstack: "Full-stack developer with",
      fullstackAfter: "years of experience",
      create:
        "I create modern web applications using Vue, React, Node.js, and other technologies. Ready to bring your projects to life!",
      contact: "Contact",
      role: "Fullstack Developer",
      location: "Tyumen, Russia",
    },
    techStack: {
      title: "My stack",
      vue: "Progressive framework",
      nuxt: "Vue framework",
      react: "Library for user interfaces",
      node: "JavaScript runtime environment",
      typescript: "Typed JavaScript",
      javascript: "Scripting language for Web pages",
      csharp: "The language for .NET platform",
      php: "Most used server language",
      postgresql: "Relational database",
      python: "Universal language",
    },
    jobExperiences: {
      title: "Job Experiences",
      experiences: {
        0: {
          position: "Frontend-developer",
          company: "LLC Media Instance",
          period: "April 2024 – present",
          description:
            "Development of front-end components for web applications integrated into the Bitrix24 system and their support",
        },
        1: {
          position: "Web-Developer",
          company: 'LLC "CKS"',
          period: "May 2021 — April 2024",
          description: "Website development, website support, deployment",
        },
        2: {
          position: "Roblx, Unity and C# teacher",
          company: 'School of programming "Coddy"',
          period: "September 2018 — July 2020",
          description: "Conducted classes in groups of 8-10 children from 8 to 17 years old",
        },
      },
    },
    contactForm: {
      title: "Contact me",
      name: "Name",
      namePlaceholder: "Your name",
      subject: "Subject",
      subjectPlaceholder: "Message subject",
      message: "Message",
      messagePlaceholder: "Your message...",
      send: "Send",
      sending: "Sending...",
    },
  },
};

export default en;
