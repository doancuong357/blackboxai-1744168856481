import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    // Thêm thuộc tính isAuthenticated để kiểm tra người dùng đã đăng nhập hay chưa
    isAuthenticated: !!localStorage.getItem('token')
  }),
  actions: {
    async login({ username, password }) {
      try {
        const response = await axios.post('http://localhost:3009/login', {
          username,
          password
        })

        this.token = response.data.token
        localStorage.setItem('token', this.token)
        this.isAuthenticated = true // Cập nhật trạng thái xác thực
        
        // Optionally, có thể decode token để lấy user info nếu cần
        const payload = JSON.parse(atob(this.token.split('.')[1]))
        this.user = {
          id: payload.id,
          username: payload.username,
          role: payload.role
        }

      } catch (error) {
        throw error
      }
    },
    logout() {
      this.token = null
      this.isAuthenticated = false // Cập nhật trạng thái xác thực khi logout
      this.user = null
      localStorage.removeItem('token')
    },
  },
})
