import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.scss'

import { createI18n } from 'vue-i18n'
import ru from './localization/ru'
import en from './localization/en'


const i18n = createI18n({
  legacy: false,
  locale: 'ru',
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

