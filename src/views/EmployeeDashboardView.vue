<template>
  <div class="employee-dashboard">
    <div class="tabs">
      <!-- Tab Thông tin với icon người dùng -->
      <button
        :class="{ active: activeTab === 'info' }"
        @click="switchTab('info')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="icon">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
        </svg>
        Thông tin
      </button>

      <!-- Tab Bảng lương với icon ví tiền -->
      <button
        :class="{ active: activeTab === 'salary' }"
        @click="switchTab('salary')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="icon">
          <path d="M21 9V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v2H3v12h18V9h-2zm-2 0H5V7h14v2zm-7 9H8v-2h6v2zm7-4H7v-2h14v2z"></path>
        </svg>
        Bảng lương
      </button>
    </div>

    <div class="tab-content">
      <!-- Tab Thông tin -->
      <div v-if="activeTab === 'info'">
        <div v-if="employee">
          <h2>Thông tin nhân viên</h2>
          <p><strong>Họ và tên:</strong> {{ employee.FullName }}</p>
          <p><strong>Ngày sinh:</strong> {{ formatDate(employee.DateOfBirth) }}</p>
          <p><strong>Giới tính:</strong> {{ employee.Gender }}</p>
          <p><strong>SĐT:</strong> {{ employee.PhoneNumber }}</p>
          <p><strong>Email:</strong> {{ employee.Email }}</p>
          <p><strong>Ngày vào làm:</strong> {{ formatDate(employee.HireDate) }}</p>
          <p><strong>Phòng ban:</strong> {{ employee.DepartmentName }}</p>
          <p><strong>Chức vụ:</strong> {{ employee.PositionName }}</p>
        </div>
        <p v-else>Đang tải thông tin nhân viên...</p>
      </div>

      <!-- Tab Bảng lương -->
      <div v-if="activeTab === 'salary'">
        <div v-if="salaries.length">
          <h3>Bảng lương</h3>
          <table>
            <thead>
              <tr>
                <th>Tháng</th>
                <th>Lương cơ bản</th>
                <th>Thưởng</th>
                <th>Khấu trừ</th>
                <th>Thực nhận</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(salary, index) in salaries" :key="index">
                <td>{{ formatMonth(salary.SalaryMonth) }}</td>
                <td>{{ formatCurrency(salary.BaseSalary) }}</td>
                <td>{{ formatCurrency(salary.Bonus) }}</td>
                <td>{{ formatCurrency(salary.Deductions) }}</td>
                <td>{{ formatCurrency(salary.NetSalary) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else-if="salaryLoaded">Không có dữ liệu lương.</p>
        <p v-else>Đang tải bảng lương...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export default {
  data() {
    return {
      employee: null,
      salaries: [],
      employeeId: null,
      username: '',
      activeTab: 'info',
      infoLoaded: false,
      salaryLoaded: false,
    }
  },
  async created() {
    const authStore = useAuthStore()

    // Lấy employeeId từ store hoặc localStorage
    this.employeeId = authStore.employeeId || localStorage.getItem('employeeId')

    if (this.activeTab === 'info') this.fetchProfile()
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab
      if (tab === 'info' && !this.infoLoaded) this.fetchProfile()
      if (tab === 'salary' && !this.salaryLoaded) this.fetchSalary()
    },
    async fetchProfile() {
      try {
        const res = await axios.get(`http://localhost:5000/profile/${this.employeeId}`)
        this.employee = res.data
        this.infoLoaded = true
      } catch (err) {
        console.error('Lỗi khi lấy thông tin nhân viên:', err)
      }
    },
    async fetchSalary() {
      try {
        const res = await axios.get(`http://localhost:5000/salary/${this.employeeId}`)
        this.salaries = res.data
        this.salaryLoaded = true
      } catch (err) {
        console.error('Lỗi khi lấy lương:', err)
        this.salaryLoaded = true
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // Không hiển thị phần thập phân
        maximumFractionDigits: 0, // Không hiển thị phần thập phân
      }).format(value);
    },
    formatDate(dateStr) {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return date.toLocaleDateString('vi-VN')
    },
    formatMonth(monthStr) {
      const date = new Date(monthStr)
      return `${date.getMonth() + 1}/${date.getFullYear()}`
    },
  },
}
</script>

<style scoped>
.employee-dashboard {
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  background-color: #e0e0e0;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.tabs button svg {
  width: 20px;
  height: 20px;
}

.tabs button:hover {
  background-color: #2563eb;
  color: white;
  border-color: #2563eb;
}

.tabs button.active {
  background-color: #2563eb;
  color: white;
  border-color: #2563eb;
}

.tab-content {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  color: #333;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #e0e0e0;
}
</style>
