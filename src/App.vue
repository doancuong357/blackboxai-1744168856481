<template>
  <div class="app-container">
    <!-- Sidebar Navbar -->
    <nav v-if="isAuthenticated" class="sidebar">
      <div class="sidebar-content">
        <router-link to="/" class="sidebar-brand">
          HR Dashboard
        </router-link>
        <ul class="sidebar-links">
          <li>
            <router-link to="/employees" class="sidebar-link">Employees</router-link>
          </li>
          <li>
            <router-link to="/departments" class="sidebar-link">Departments</router-link>
          </li>
          <li>
            <router-link to="/payroll" class="sidebar-link">Payroll</router-link>
          </li>
          <li>
            <router-link to="/reports" class="sidebar-link">Reports</router-link>
          </li>
        </ul>
        <button @click="handleLogout">Logout</button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="content-container">
      <main class="main-content">
        <router-view />
      </main>

      <!-- Footer -->
      <footer class="footer">
        <p>© 2025 HR Dashboard. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()
const isAuthenticated = authStore.isAuthenticated

async function  handleLogout() {
  authStore.logout()  // Gọi logout từ Pinia store
  await router.push('/login') // Sau khi logout, chuyển hướng đến trang đăng nhập
}
</script>

<style scoped>
/* App Container */
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb; /* Light gray background */
}

/* Sidebar Navbar */
.sidebar {
  width: 240px;
  background-color: #1f2937; /* Dark gray */
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-brand {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  text-align: center;
  margin-bottom: 16px;
  transition: color 0.3s ease;
}

.sidebar-brand:hover {
  color: #2563eb; /* Blue */
}

.sidebar-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-link {
  font-size: 16px;
  color: #d1d5db; /* Light gray */
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.sidebar-link:hover {
  background-color: #2563eb; /* Blue */
  color: #ffffff;
}

.logout-button {
  background: none;
  border: none;
  font-size: 14px;
  color: #f87171; /* Light red */
  cursor: pointer;
  transition: color 0.3s ease;
  margin-top: auto;
}

.logout-button:hover {
  color: #ef4444; /* Darker red */
}

/* Content Container */
.content-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
}

/* Main Content */
.main-content {
  flex-grow: 1;
  padding: 24px;
  background-color: #f9fafb; /* Light gray background */
  overflow-y: auto;
}

/* Footer */
.footer {
  background-color: #f3f4f6; /* Light gray background */
  text-align: center;
  padding: 16px 0;
  font-size: 14px;
  color: #6b7280; /* Gray text */
  border-top: 1px solid #e5e7eb; /* Light gray border */
  margin-top: auto; /* Push footer to the bottom */
}
</style>