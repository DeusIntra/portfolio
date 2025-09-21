import type { JobExperience } from "./JobExperience";

export interface I18nMessages {
  home: {
    header: {
      home: string;
      about: string;
      contact: string;
    };
    hero: {
      greeting: string;
      name: string;
      fullstack: string;
      create: string;
      contact: string;
      role: string;
      location: string;
    };
    techStack: {
      title: string;
      vue: string;
      nuxt: string;
      react: string;
      node: string;
      typescript: string;
      javascript: string;
      csharp: string;
      php: string;
      postgresql: string;
      python: string;
    };
    jobExperiences: {
      title: string;
      experiences: {
        "0": JobExperience,
        "1": JobExperience,
        "2": JobExperience,
      };
    };
    contactForm: {
      title: string;
      name: string;
      namePlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
    }
  };
}

