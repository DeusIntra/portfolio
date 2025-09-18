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
  <section id="contact" class="contact-section">
    <div class="container">
      <h2 class="section-title">Свяжитесь со мной</h2>
      <form class="card" @submit.prevent="handleSubmit">
        <div class="form-row">
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
        <button type="submit" class="submit-button" :disabled="sendStatus === 'sending'">
          <span v-if="sendStatus !== 'sending'">Отправить сообщение</span>
          <span v-else>Отправка...</span>
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact-section {
  padding: 4rem 0;
  background: rgba(15, 23, 42, 0.5);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: white;
}

input,
textarea {
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.submit-button {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1.8rem;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
}

.submit-button:disabled,
.submit-button:disabled:hover {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
