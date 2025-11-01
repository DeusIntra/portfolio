<script setup lang="ts">
import { ref } from "vue";
import emailjs from "@emailjs/browser";
import { useI18n } from "vue-i18n";
import type { I18nMessages } from "@/types/I18nMessages";

const { t } = useI18n();
function tContact(s: keyof I18nMessages["home"]["contactForm"]) {
  return t(`home.contactForm.${s}`);
}

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const sendStatus = ref<"idle" | "sending" | "success" | "error">("idle");

async function handleSubmit() {
  try {
    const templateParams = { ...form.value };
    sendStatus.value = "sending";
    const result = await emailjs.send(serviceId, templateId, templateParams, { publicKey });
    if (result.status === 200) {
      sendStatus.value = "success";
      alert("Сообщение отправлено!");
      form.value = { name: "", email: "", subject: "", message: "" };
    }
  } catch (error) {
    alert("Не удалось отправить сообщение\n" + error);
  } finally {
    setTimeout(() => {
      sendStatus.value = "idle";
    }, 5000);
  }
}
</script>

<template>
  <form class="container card contact-form" @submit.prevent="handleSubmit">
    <div class="contact-form__form-row">
      <div>
        <label for="name">{{ tContact("name") }} *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          :placeholder="tContact('namePlaceholder')"
        />
      </div>
      <div>
        <label for="email">Email *</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="your.email@example.com"
        />
      </div>
    </div>
    <label for="subject">{{ tContact("subject") }} *</label>
    <input
      id="subject"
      v-model="form.subject"
      type="text"
      required
      :placeholder="tContact('subjectPlaceholder')"
    />
    <label for="message">{{ tContact("message") }} *</label>
    <textarea
      id="message"
      v-model="form.message"
      rows="5"
      required
      :placeholder="tContact('messagePlaceholder')"
    ></textarea>
    <button
      type="submit"
      class="button button--primary button--hover block mt-6"
      :disabled="sendStatus === 'sending'"
    >
      <span v-if="sendStatus !== 'sending'">{{ tContact("send") }}</span>
      <span v-else>{{ tContact("sending") }}</span>
    </button>
  </form>
</template>
