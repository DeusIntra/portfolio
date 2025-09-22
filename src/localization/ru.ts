import type { I18nMessages } from "@/types/I18nMessages";

const ru: I18nMessages = {
  home: {
    header: {
      home: "Главная",
      about: "Обо мне",
      contact: "Связаться",
    },
    hero: {
      greeting: "Привет, я",
      name: "Кирилл Мазурек",
      fullstack: "Fullstack разработчик с",
      fullstackAfter: "годами опыта",
      create: "Создаю современные веб-приложения с использованием Vue, React, Node.js и других технологий. Готов к реализации ваших проектов!",
      contact: "Связавться",
      role: "Fullstack разработчик",
      location: "Тюмень, Россия",
    },
    techStack: {
      title: "Мой стек",
      vue: "Прогрессивный фреймворк",
      nuxt: "Фреймворк для Vue",
      react: "Библиотека для интерфейсов",
      node: "Серверная платформа",
      typescript: "Типизированный javascript",
      javascript: "Браузерный язык программирования",
      csharp: "Язык для .NET разработки",
      php: "Серверный язык",
      postgresql: "Реляционная БД",
      python: "Универсальный язык",
    },
    jobExperiences: {
      title: "Опыт работы",
      experiences: {
        0: {
          position: 'Frontend-разработчик',
          company: 'ООО "Медиа Инстанс"',
          period: 'Апрель 2024 — настоящее время',
          description: 'Разработка фронтендной части веб-приложений, встраиваемых в систему Битрикс24 и их поддержка'
        },
        1: {
          position: 'Веб-разработчик',
          company: 'ООО "ЦКС"',
          period: 'Май 2021 — Апрель 2024',
          description: 'Разработка сайта, поддержка сайта, деплой'
        },
        2: {
          position: 'Преподаватель Roblx, Unity, C#',
          company: 'Школа программирования Coddy',
          period: 'Сентябрь 2018 — Июль 2020',
          description: 'Проводил занятия в группах по 8-10 детей от 8 до 17 лет'
        }
      }
    },
    contactForm: {
      title: "Свяжитесь со мной",
      name: "Имя",
      namePlaceholder: "Ваше имя",
      subject: "Тема",
      subjectPlaceholder: "Тема сообщения",
      message: "Сообщение",
      messagePlaceholder: "Ваше сообщение...",
      send: "Отправить",
      sending: "Отправка..."
    }
  }
}

export default ru;
