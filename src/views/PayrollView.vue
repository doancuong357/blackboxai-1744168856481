<template>
  <div class="container">
    <!-- Main title -->
    <h1 class="main-title">Salary & Attendance Management</h1>

    <!-- Tabs -->
    <div class="tabs">
      <div class="tab" :class="{ active: currentTab === 'salary' }" @click="currentTab = 'salary'">
        💰 Salary Table
      </div>
      <div class="tab" :class="{ active: currentTab === 'timekeeping' }" @click="currentTab = 'timekeeping'">
        📅 Timekeeping
      </div>
    </div>

    <!-- Tab content - Salary Table -->
    <div v-show="currentTab === 'salary'" class="card">
      <div class="card-header">
        <div class="card-title">Employee Salary Table</div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Month</th>
              <th>Base Salary</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="record in salaryData"
              :key="record.SalaryID"
              @click="viewSalaryHistory(record)"
              class="clickable-row"
              title="View salary history"
            >
              <td>
                <div>{{ record.FullName }}</div>
                <div class="text-sub">ID: {{ record.SalaryID }}</div>
              </td>
              <td>{{ record.SalaryMonth }}</td>
              <td>{{ record.BaseSalary }}</td>
              <td>{{ record.Bonus }}</td>
              <td>{{ record.Deductions }}</td>
              <td>{{ record.NetSalary }}</td>
              <td>
                <button class="btn-update" @click.stop="updateSalary(record)">Update</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Salary History for selected employee -->
      <div v-if="selectedEmployee" class="card mt-4">
        <div class="card-header">
          <div class="card-title">Salary History - {{ selectedEmployee?.FullName }}</div>
        </div>
        <div>
          <table v-if="employeeSalaryHistory.length > 0">
            <thead>
              <tr>
                <th>Month</th>
                <th>Base Salary</th>
                <th>Bonus</th>
                <th>Deductions</th>
                <th>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in employeeSalaryHistory" :key="index">
                <td>{{ record.SalaryMonth }}</td>
                <td>{{ record.BaseSalary }}</td>
                <td>{{ record.Bonus }}</td>
                <td>{{ record.Deductions }}</td>
                <td>{{ record.NetSalary }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="text-sub">No salary history available for this employee.</p>
        </div>
      </div>
    </div>

    <!-- Tab content - Timekeeping -->
    <div v-show="currentTab === 'timekeeping'" class="card">
      <div class="card-header">
        <div class="card-title">Timekeeping Table</div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>Working Days</th>
              <th>Absent Days</th>
              <th>Leave Days</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="record in timekeepingData"
              :key="record.EmployeeID + record.AttendanceMonth"
            >
              <td>
                <div>{{ record.FullName }}</div>
                <div class="text-sub">ID: {{ record.EmployeeID }}</div>
              </td>
              <td>{{ getMonth(record.AttendanceMonth) }}</td>
              <td>{{ getYear(record.AttendanceMonth) }}</td>
              <td>{{ record.WorkDays }}</td>
              <td>{{ record.AbsentDays }}</td>
              <td>{{ record.LeaveDays }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const currentTab = ref('salary')
const salaryData = ref([])
const timekeepingData = ref([])
const employeeSalaryHistory = ref([])
const selectedEmployee = ref(null)

onMounted(() => {
  fetchSalaryData()
  fetchTimekeepingData()
})

function fetchSalaryData() {
  axios.get("http://127.0.0.1:5000/show-salaries")
    .then(res => {
      salaryData.value = res.data
    })
    .catch(err => {
      console.error("Error fetching salary data:", err)
    })
}

function fetchTimekeepingData() {
  axios.get("http://127.0.0.1:5000/timekeeping")
    .then(res => {
      timekeepingData.value = res.data
    })
    .catch(err => {
      console.error("Error fetching timekeeping data:", err)
    })
}

function viewSalaryHistory(record) {
  selectedEmployee.value = {
    FullName: record.FullName,
    EmployeeID: record.EmployeeID || record.SalaryID,
  }

  axios.get(`http://127.0.0.1:5000/history-salaries/${selectedEmployee.value.EmployeeID}`)
    .then(response => {
      employeeSalaryHistory.value = response.data
    })
    .catch(error => {
      console.error("Error fetching salary history:", error)
    })
}

function getMonth(dateString) {
  const date = new Date(dateString)
  return date.getMonth() + 1
}

function getYear(dateString) {
  const date = new Date(dateString)
  return date.getFullYear()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
}

.main-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
  text-align: center;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.tab {
  padding: 0.6rem 1.4rem;
  border-radius: 9999px;
  background-color: #e5e7eb;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab:hover {
  background-color: #d1d5db;
}

.tab.active {
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
}

.card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.04);
  margin-bottom: 2rem;
}

.card-header {
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

thead {
  background-color: #f3f4f6;
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.95rem;
}

tr:hover {
  background-color: #f9fafb;
}

.text-sub {
  font-size: 0.75rem;
  color: #6b7280;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}
</style>
