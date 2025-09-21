import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.scss'

import { createI18n } from 'vue-i18n'
import ru from './localization/ru'
import en from './localization/en'


const browserLanguage = window.navigator.language.slice(0, 2)

const i18n = createI18n({
  legacy: false,
  locale: browserLanguage,
  fallbackLocale: 'en',
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

