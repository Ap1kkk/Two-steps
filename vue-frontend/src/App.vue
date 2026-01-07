<template>
  <div class="app-container">
    <p class="nav-text"> HEllo </p>
  </div>

</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding-bottom: 60px;
  min-height: calc(100vh - 60px);
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-link {
  text-decoration: none;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.icon-placeholder {
  font-size: 24px;
  margin-bottom: 4px;
  transition: color 0.3s ease;
}

.nav-text {
  font-size: 12px;
  color: #99A2AD;
  transition: color 0.3s ease;
}

.nav-text.active {
  color: #2975CC;
  font-weight: 500;
}

/* Состояние при наведении */
.nav-link:hover .nav-text {
  color: #2975CC;
}

.nav-link:hover .icon-placeholder {
  transform: scale(1.1);
}

/* Отладочная информация */
.debug-info {
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  max-width: 300px;
  z-index: 1001;
}

.debug-info p {
  margin: 5px 0;
}

/* Стили для тестовых страниц */
:deep(.page-content) {
  padding: 20px;
  text-align: center;
  font-family: 'VK Sans Display', sans-serif;
}

:deep(h1) {
  color: #2975CC;
  margin-bottom: 20px;
}

:deep(.test-links) {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

:deep(.test-button) {
  padding: 10px 20px;
  background: #2975CC;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'VK Sans Display', sans-serif;
}

:deep(.test-button:hover) {
  background: #1e5ca3;
}
</style>