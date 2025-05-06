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
    meta: { requiresAuth: true, allowedRoles: ['admin', 'hr_manager', 'payroll_manager', 'employee'] }
  },
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('@/views/EmployeesView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['admin', 'hr_manager'] }
  },
  {
    path: '/payroll',
    name: 'Payroll',
    component: () => import('@/views/PayrollView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['admin', 'payroll_manager'] }
  },
  {
    path: '/warning&notification',
    name: 'Warning&Notification',
    component: () => import('@/views/Warning&NotificationView.vue'), // Fixed component import
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login') // Chuyển hướng đến trang login nếu chưa đăng nhập
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/') // Chuyển hướng về Dashboard nếu đã đăng nhập
  } else if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(authStore.user?.role)) {
    next('/') // Chuyển hướng về Dashboard nếu người dùng không có quyền truy cập
  } else {
    next() // Cho phép truy cập nếu không có vấn đề gì
  }
})

export default router
