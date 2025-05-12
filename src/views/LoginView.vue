<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Sign in to your account</h2>
      <form @submit.prevent="handleLogin" class="login-form">
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
          />
        </div>
        <div>
          <button type="submit" class="login-button">Sign in</button>
        </div>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()

async function handleLogin() {
  try {
    await authStore.login({ username: username.value, password: password.value })

    const role = authStore.user?.role

    // Điều hướng tùy thuộc vào role
    if (role === 'employee') {
      router.push('/employee-dashboard')
    } else {
      router.push('/')
    }
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Login failed'
  }
}
</script>

<style scoped>
/* === Styles như cũ, giữ nguyên === */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('https://advsolutions.vn/wp-content/uploads/2019/12/background-powerpoint-cong-nghe-12.jpg');
}
.login-card {
  background-color: #82b0c6;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.5s ease-in-out;
}
.login-title {
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  margin-bottom: 24px;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}
.form-input {
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.form-input:focus {
  border-color: #3225eb;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
  outline: none;
}
.login-button {
  background-color: #03256f;
  color: #ffffff;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.login-button:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}
.login-button:active {
  transform: translateY(0);
}
.error-message {
  color: #dc2626;
  font-size: 14px;
  text-align: center;
  margin-top: 16px;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
