import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref(null)

  async function login(credentials) {
    loading.value = true
    error.value = null
    
    try {
      // Mock authentication - will be replaced with API calls
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required')
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      user.value = {
        name: 'Admin User',
        email: credentials.email,
        role: 'admin'
      }
      isAuthenticated.value = true
      router.push('/')
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    router.push('/login')
  }

  return { 
    user, 
    isAuthenticated, 
    loading,
    error,
    login, 
    logout 
  }
})
