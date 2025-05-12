import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAuthenticated: !!localStorage.getItem('token'),
    employeeId: null // Thêm employeeId vào state
  }),
  actions: {
    async login({ username, password }) {
      try {
        const response = await axios.post('http://localhost:3009/login', {
          username,
          password
        })

        const token = response.data.token
        this.token = token
        localStorage.setItem('token', token)
        this.isAuthenticated = true

        // Decode token để lấy thông tin user
        const payload = JSON.parse(atob(token.split('.')[1]))
        this.user = {
          id: payload.id,
          username: payload.username,
          role: payload.role
        }

        localStorage.setItem('user', JSON.stringify(this.user))

        // Lấy phần ID từ username
        const employeeId = this.extractEmployeeId(payload.username) // Lấy ID từ username
        this.employeeId = employeeId
        localStorage.setItem('employeeId', employeeId)

        // Cấu hình axios cho các request tiếp theo
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      } catch (error) {
        throw error.response?.data?.message || 'Login failed'
      }
    },
    logout() {
      this.token = null
      this.isAuthenticated = false
      this.user = null
      this.employeeId = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('employeeId')
      delete axios.defaults.headers.common['Authorization']
    },

    // Thêm hàm để trích xuất ID từ username
    extractEmployeeId(username) {
      const match = username.match(/employee_(\d+)/)
      return match ? match[1] : null
    }
  }
})
