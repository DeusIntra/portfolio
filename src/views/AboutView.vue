<script setup lang="ts">
</script>

<template>
  <div class="about">
    <div class="about-container">
      <h1 class="about-title">Обо мне</h1>
      <div class="about-content">
        <div class="about-text">
          <p>Эта страница пока находится в разработке. Скоро здесь появятся интересные факты о мне и моей работе!</p>
          <p>А пока вы можете ознакомиться с моими навыками и опытом работы на главной странице.</p>
        </div>
        <div class="about-visual">
          <div class="placeholder-animation">
            <div class="pulse-circle"></div>
            <div class="pulse-circle delay-1"></div>
            <div class="pulse-circle delay-2"></div>
          </div>
        </div>
      </div>
      <router-link to="/" class="back-button">Вернуться на главную</router-link>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 120px 2rem 4rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-container {
  max-width: 800px;
  text-align: center;
}

.about-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 3rem;
}

.about-text {
  text-align: left;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.placeholder-animation {
  position: relative;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-circle {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #6366f1;
  animation: pulse 2s ease-out infinite;
}

.delay-1 {
  animation-delay: 0.7s;
  width: 130px;
  height: 130px;
  border-color: #8b5cf6;
}

.delay-2 {
  animation-delay: 1.4s;
  width: 160px;
  height: 160px;
  border-color: #ec4899;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  50% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.7;
  }
}

.back-button {
  display: inline-block;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-text {
    text-align: center;
  }

  .about-title {
    font-size: 2.5rem;
  }
}
</style>
