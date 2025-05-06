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
            <router-link to="/payroll" class="sidebar-link">Payroll & Attendance</router-link>
          </li>
          <li>
            <router-link to="/reports" class="sidebar-link">Reports</router-link>
          </li>
          <li>
            <router-link to="/warning&notification" class="sidebar-link">Warning & Notification</router-link>
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
          <p>Bank: MB Bank</p>
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
  background-color: #f3f4f6; /* Light gray background */
  font-family: 'Arial', sans-serif; /* Modern font */
}

/* Sidebar Navbar */
.sidebar {
  width: 240px;
  background-color: #111827; /* Tailwind gray-900 */
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);
  transition: width 0.3s ease;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex-grow: 1;
}

.sidebar-brand {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  text-align: center;
  padding: 12px 0;
  border-bottom: 1px solid #374151; /* Tailwind gray-700 */
  transition: color 0.3s ease;
}

.sidebar-brand:hover {
  color: #60a5fa; /* Tailwind blue-400 */
}

.sidebar-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-link {
  display: block;
  font-size: 15px;
  color: #d1d5db; /* Tailwind gray-300 */
  text-decoration: none;
  background-color:#374151;
  padding: 9px 12px;
  border-radius: 8px;
  transition: background 0.5s, color 0.5s;
}

.sidebar-link:hover {
  background-color: #40cae9; /* Tailwind blue-600 */
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
  padding: 10px 16px;
  border-radius: 8px;
}

.logout-button:hover {
  background-color: #ef4444; /* Darker red */
  color: #ffffff;
}

/* Content Container */
.content-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
  background-color: #ffffff; /* White background */
  border-left: 1px solid #e5e7eb; /* Light gray border */
}

/* Main Content */
.main-content {
  flex-grow: 1;
  padding: 24px;
  background-color: #f9fafb; /* Light gray background */
  overflow-y: auto;
  border-bottom: 1px solid #e5e7eb; /* Light gray border */
}

/* Footer */
.footer {
  background-color: #c3c3c3; /* White background */
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
  gap: 24px; /* Khoảng cách giữa các phần tử */
  flex-wrap: wrap; /* Đảm bảo các phần tử xuống dòng trên màn hình nhỏ */
}

.qr-code {
  width: 60px; /* Giảm kích thước hình ảnh */
  height: 60px;
  border: 1px solid #d1d5db; /* Light gray border */
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.qr-code:hover {
  transform: scale(1.1); /* Zoom effect on hover */
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }

  .sidebar-link {
    font-size: 14px;
    padding: 8px 12px;
  }

  .qr-code {
    width: 50px;
    height: 50px;
  }
}
</style>