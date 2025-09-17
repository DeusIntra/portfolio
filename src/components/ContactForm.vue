<script setup lang="ts">
import { ref } from 'vue'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const form = ref<FormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitting = ref(false)

const handleSubmit = () => {
  submitting.value = true

  // Здесь должен быть запрос на сервер для отправки формы
  // POST запрос к API с данными формы
  // Например: axios.post('/api/contact', form.value)

  setTimeout(() => {
    alert('Сообщение отправлено! (в реальном приложении здесь была бы отправка на сервер)')
    form.value = { name: '', email: '', subject: '', message: '' }
    submitting.value = false
  }, 1000)
}
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <h2 class="section-title">Свяжитесь со мной</h2>
      <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Имя</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="Ваше имя"
            >
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="your.email@example.com"
            >
          </div>
        </div>
        <div class="form-group">
          <label for="subject">Тема</label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            required
            placeholder="Тема сообщения"
          >
        </div>
        <div class="form-group">
          <label for="message">Сообщение</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="5"
            required
            placeholder="Ваше сообщение..."
          ></textarea>
        </div>
        <button type="submit" class="submit-button" :disabled="submitting">
          <span v-if="!submitting">Отправить сообщение</span>
          <span v-else>Отправка...</span>
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
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
}

.contact-form {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: white;
}

input, textarea {
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

input::placeholder, textarea::placeholder {
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
  margin-top: 1rem;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
