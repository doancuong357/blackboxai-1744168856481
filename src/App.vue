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
        <div class="footer-content">
          <p>© 2025 Cuong Developer</p>
          <img src="https://scontent.fdad3-4.fna.fbcdn.net/v/t1.15752-9/494357457_929063372559218_893845112797750541_n.jpg?stp=dst-jpg_p480x480_tt6&_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_ohc=XGgP1oitbVsQ7kNvwG1ImU2&_nc_oc=AdkwcFNrWWhdYWx7O1Aq7r0Y5xIoSJZm6TsY2pFujgweBJmMjtjLo7Y2NJESaKwKjUA&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&oh=03_Q7cD2QFiUOolk5z8URqmBdgFwFy6SpcWIv7tGqVMW6RzRNSTvg&oe=683F5613" alt="QR Code" class="qr-code" />
          <p>Bank: MBMB Bank</p>
          <p>Account Holder: Doan Viet Cuong</p>
        </div>
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
  background-color: #cee1e2; /* Light gray background */
  text-align: center;
  padding: 16px 0;
  font-size: 14px;
  color: #6b7280; /* Gray text */
  border-top: 1px solid #e5e7eb; /* Light gray border */
  margin-top: auto; /* Push footer to the bottom */
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px; /* Khoảng cách giữa các phần tử */
  flex-wrap: wrap; /* Đảm bảo các phần tử xuống dòng trên màn hình nhỏ */
}

.qr-code {
  width: 70px; /* Giảm kích thước hình ảnh */
  height: 70px;
  border: 1px solid #d1d5db; /* Light gray border */
  border-radius: 8px;
}
</style>