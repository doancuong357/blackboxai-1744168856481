<template>
  <div class="payroll-container">
    <h1 class="payroll-title">Payroll Management</h1>

    <!-- Search and Filter Section -->
    <div class="search-filter-container">
      <input
        type="text"
        placeholder="Search payroll records..."
        class="search-input"
        v-model="searchQuery"
      />
      <select class="filter-select" v-model="monthFilter">
        <option value="">All Months</option>
        <option v-for="month in months" :key="month.value" :value="month.value">
          {{ month.label }}
        </option>
      </select>
      <select class="filter-select" v-model="yearFilter">
        <option value="">All Years</option>
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <!-- Payroll Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Period</th>
            <th>Basic Salary</th>
            <th>Bonuses</th>
            <th>Deductions</th>
            <th>Net Pay</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in filteredRecords" :key="record.id">
            <td>
              <div>{{ record.employeeName }}</div>
              <div class="employee-id">{{ record.employeeId }}</div>
            </td>
            <td>{{ record.month }} {{ record.year }}</td>
            <td>${{ record.basicSalary.toLocaleString() }}</td>
            <td>${{ record.bonuses.toLocaleString() }}</td>
            <td>${{ record.deductions.toLocaleString() }}</td>
            <td>${{ (record.basicSalary + record.bonuses - record.deductions).toLocaleString() }}</td>
            <td>
              <span
                class="badge"
                :class="record.status === 'paid' ? 'badge-paid' : 'badge-pending'"
              >
                {{ record.status }}
              </span>
            </td>
            <td>
              <button class="action-button edit" @click="editPayroll(record.id)">
                Edit
              </button>
              <button
                class="action-button process"
                @click="processPayroll(record.id)"
                v-if="record.status === 'pending'"
              >
                Process
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Payroll Summary -->
    <div class="summary-container">
      <h2 class="summary-title">Payroll Summary</h2>
      <div class="chart-placeholder">
        <p>Payroll chart will be displayed here</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock data
const payrollRecords = ref([
  {
    id: 1,
    employeeId: 1001,
    employeeName: 'John Doe',
    month: 'January',
    year: 2023,
    basicSalary: 5000,
    bonuses: 500,
    deductions: 200,
    status: 'paid'
  },
  {
    id: 2,
    employeeId: 1002,
    employeeName: 'Jane Smith',
    month: 'January',
    year: 2023,
    basicSalary: 6000,
    bonuses: 300,
    deductions: 150,
    status: 'paid'
  },
  {
    id: 3,
    employeeId: 1003,
    employeeName: 'Robert Johnson',
    month: 'January',
    year: 2023,
    basicSalary: 4500,
    bonuses: 200,
    deductions: 100,
    status: 'pending'
  }
])

const months = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' }
]

const years = [2023, 2022, 2021]

const searchQuery = ref('')
const monthFilter = ref('')
const yearFilter = ref('')

const filteredRecords = computed(() => {
  return payrollRecords.value.filter(record => {
    const matchesSearch =
      record.employeeId.toString().includes(searchQuery.value.toLowerCase()) ||
      record.employeeName.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesMonth = !monthFilter.value || record.month === monthFilter.value
    const matchesYear = !yearFilter.value || record.year.toString() === yearFilter.value

    return matchesSearch && matchesMonth && matchesYear
  })
})

function processPayroll(id) {
  const record = payrollRecords.value.find(r => r.id === id)
  if (record && record.status === 'pending') {
    if (confirm(`Are you sure you want to process payroll for ${record.employeeName}?`)) {
      record.status = 'paid'
    }
  }
}

function editPayroll(id) {
  alert(`Edit payroll for record ID: ${id}`)
}
</script>

<style scoped>
/* Container Styles */
.payroll-container {
  padding: 24px;
  background-color: #f9fafb; /* Light gray background */
}

/* Title Styles */
.payroll-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #1f2937; /* Dark gray */
  text-align: center;
}

/* Search and Filter Section */
.search-filter-container {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.search-input,
.filter-select {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus,
.filter-select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
  outline: none;
}

/* Table Styles */
.table-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f3f4f6;
}

th,
td {
  padding: 12px;
  font-size: 14px;
  text-align: left;
}

tbody tr:hover {
  background-color: #f9fafb;
}

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.badge-paid {
  background-color: #d1fae5;
  color: #065f46;
}

.badge-pending {
  background-color: #fef3c7;
  color: #92400e;
}

/* Chart Placeholder */
.chart-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border-radius: 8px;
  color: #9ca3af;
}
</style>