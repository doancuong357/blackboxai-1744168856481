<template>
  <div class="login-container">
    <div class="login-card" :class="{ shake: shakeAnimation }">
      <h2 class="login-title">Sign in to your account</h2>
      <form @submit.prevent="handleLogin" class="login-form" novalidate>
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            required
            class="form-input"
            placeholder="Enter your username"
            v-model="username"
            :disabled="isLoading"
          />
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="form-input"
            placeholder="Enter your password"
            v-model="password"
            :disabled="isLoading"
          />
        </div>
        <div>
          <button type="submit" class="login-button" :disabled="isLoading">
            <span v-if="!isLoading">Sign in</span>
            <span v-else class="spinner"></span>
          </button>
        </div>
      </form>

      <!-- Toast notification -->
      <transition name="fade">
        <div v-if="toast.show" :class="['toast', toast.type]">
          {{ toast.message }}
        </div>
      </transition>

      <!-- Loading overlay -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const shakeAnimation = ref(false)

const toast = ref({
  show: false,
  message: '',
  type: '' // 'success' | 'error'
})

const router = useRouter()
const authStore = useAuthStore()

function showToast(message, type = 'error') {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

async function handleLogin() {
  if (!username.value || !password.value) {
    showToast('Please fill in both username and password', 'error')
    shakeAnimation.value = true
    setTimeout(() => (shakeAnimation.value = false), 500)
    return
  }
  isLoading.value = true
  try {
    await authStore.login({ username: username.value, password: password.value })
    showToast('Login successful!', 'success')
    const role = authStore.user?.role
    setTimeout(() => {
      router.push(role === 'employee' ? '/employee-dashboard' : '/')
    }, 1000)
  } catch (err) {
    showToast(err.response?.data?.message || 'Login failed', 'error')
    shakeAnimation.value = true
    setTimeout(() => (shakeAnimation.value = false), 500)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Nền gradient nhẹ, hiện đại */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("https://www.shutterstock.com/shutterstock/photos/2518716573/display_1500/stock-vector-security-shield-cyber-security-protection-shield-with-check-mark-icon-cyber-data-protection-2518716573.jpg");
  padding: 1rem;
}

/* Thẻ đăng nhập */
.login-card {
  background-color: rgba(255, 255, 255, 0.1); /* nền trắng trong suốt */
  backdrop-filter: blur(12px);                /* làm mờ nền phía sau */
  -webkit-backdrop-filter: blur(12px);        /* hỗ trợ Safari */
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
  animation: fadeInSlide 0.6s ease-in-out;
  position: relative;
  overflow: visible;
  border: 1px solid rgba(255, 255, 255, 0.3); /* viền nhẹ */
}

/* Animation lắc khi sai */
.login-card.shake {
  animation: shake 0.4s ease;
}

/* Tiêu đề */
.login-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Biểu mẫu */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 1rem;
  font-weight: 500;
  color: #171717;
  margin-bottom: 0.4rem;
  font-weight: bold;
}

.form-input {
  padding: 0.7rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f9fafb;
  color: #111827;
}

.form-input:focus {
  border-color: #25ebe8;
  box-shadow: 0 0 0 5px rgba(59, 241, 229, 0.3);
  outline: none;
}

/* Nút đăng nhập */
.login-button {
  background: linear-gradient(90deg, #23ff17, #31adfa);
  color: white;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  margin:auto;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.login-button:hover:not(:disabled) {
  background: linear-gradient(90deg, #46f5f2, #dd0da9);
  transform: translateY(-2px);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.loading-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #cbd5e1;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Animations */
@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0) }
  20%, 60% { transform: translateX(-10px) }
  40%, 80% { transform: translateX(10px) }
}

/* Toast notification */
.toast {
  position: fixed;
  
  transform: translate(20%, 10%);
  min-width: 260px;
  max-width: 90vw;
  padding: 14px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  color: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  z-index: 9999;
  user-select: none;
  pointer-events: none;
  text-align: center;
}

.toast.success {
  background-color: #22c55e; /* xanh lá */
}

.toast.error {
  background-color: #ef4444; /* đỏ */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
