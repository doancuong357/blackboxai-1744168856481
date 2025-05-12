import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['admin', 'hrmanager', 'payroll'] }
  },
  {
    path: '/employee-dashboard',
    name: 'EmployeeDashboard', // Trang riêng cho nhân viên
    component: () => import('@/views/EmployeeDashboardView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['employee'] }
  },
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('@/views/EmployeesView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['admin', 'hrmanager'] }
  },
  {
    path: '/payroll',
    name: 'Payroll',
    component: () => import('@/views/PayrollView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['admin', 'payroll'] }
  },
  {
    path: '/warning&notification',
    name: 'Warning&Notification',
    component: () => import('@/views/Warning&NotificationView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['admin'] }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/ReportsView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['admin'] }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { requiresGuest: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Router guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Ensure user is loaded from localStorage if page is refreshed
  if (!authStore.user && authStore.token) {
    const user = JSON.parse(localStorage.getItem('user'))
    authStore.user = user
  }

  // Kiểm tra nếu người dùng chưa đăng nhập
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
  } else if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(authStore.user?.role)) {
    next('/') // Chuyển hướng đến trang chính nếu người dùng không có quyền
  } else {
    next()
  }
})

export default router
