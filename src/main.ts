import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.scss'

import { createI18n } from 'vue-i18n'
import type { LanguageMessages } from './types/I18nMessages'


const ru: LanguageMessages = {
  home: {
    hero: {
      greeting: "Привет, я",
      name: "Кирилл Мазурек",
    }
  }
}

const en: LanguageMessages = {
  home: {
    hero: {
      greeting: "Hello, my name is",
      name: "Kirill Mazurek",
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'ru',
  // fallbackLocale: 'en',
  messages: {
    ru: { ...ru },
    en: { ...en },
  }
})

const app = createApp(App)

app
  .use(router)
  .use(i18n)
  .mount('#app')
