<script setup lang="ts">
import { ref } from 'vue'
import emailjs from '@emailjs/browser'


const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const sendStatus = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

async function handleSubmit() {

  try {
    const templateParams = { ...form.value }
    sendStatus.value = 'sending';
    const result = await emailjs.send(serviceId, templateId, templateParams, { publicKey })
    if (result.status === 200) {
      sendStatus.value = 'success'
      alert('Сообщение отправлено!')
      form.value = { name: '', email: '', subject: '', message: '' }
    }
  } catch (error) {
    alert('Не удалось отправить сообщение\n' + error)
  } finally {
    setTimeout(() => {
      sendStatus.value = 'idle'
    }, 5000)
  }
}
</script>

<template>
  <form class="container card contact-form" @submit.prevent="handleSubmit">
    <div class="contact-form__form-row">
      <div>
        <label for="name">Имя *</label>
        <input id="name" v-model="form.name" type="text" required placeholder="Ваше имя">
      </div>
      <div>
        <label for="email">Email *</label>
        <input id="email" v-model="form.email" type="email" required placeholder="your.email@example.com">
      </div>
    </div>
    <label for="subject">Тема *</label>
    <input id="subject" v-model="form.subject" type="text" required placeholder="Тема сообщения">
    <label for="message">Сообщение *</label>
    <textarea id="message" v-model="form.message" rows="5" required placeholder="Ваше сообщение..."></textarea>
    <button type="submit" class="contact-form__submit-button" :disabled="sendStatus === 'sending'">
      <span v-if="sendStatus !== 'sending'">Отправить сообщение</span>
      <span v-else>Отправка...</span>
    </button>
  </form>
</template>

