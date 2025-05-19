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
              <td>{{ formatDate(record.SalaryMonth) }}</td>
              <td>{{ formatCurrency(record.BaseSalary) }}</td>
              <td>{{ formatCurrency(record.Bonus) }}</td>
              <td>{{ formatCurrency(record.Deductions) }}</td>
              <td>{{ formatCurrency(record.NetSalary) }}</td>
              <td>
                <button class="btn-update" @click.stop="updateSalary(record)">Update</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Salary History -->
    <div v-if="currentTab === 'salary' && selectedEmployee" class="card">
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
              <td>{{ formatDate(record.SalaryMonth) }}</td>
              <td>{{ formatCurrency(record.BaseSalary) }}</td>
              <td>{{ formatCurrency(record.Bonus) }}</td>
              <td>{{ formatCurrency(record.Deductions) }}</td>
              <td>{{ formatCurrency(record.NetSalary) }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else class="text-sub">No salary history available for this employee.</p>
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

    <!-- Modal cập nhật lương -->
    <div v-if="showUpdateModal" class="modal-overlay">
      <div class="modal">
        <h2>Cập nhật lương</h2>
        <label>Base Salary:</label>
        <input v-model="editingRecord.BaseSalary" type="number" />
        <label>Bonus:</label>
        <input v-model="editingRecord.Bonus" type="number" />
        <label>Deductions:</label>
        <input v-model="editingRecord.Deductions" type="number" />

        <div class="modal-actions">
          <button @click="submitUpdatedSalary">Lưu</button>
          <button @click="showUpdateModal = false">Hủy</button>
        </div>
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

const editingRecord = ref(null)
const showUpdateModal = ref(false)

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

function updateSalary(record) {
  editingRecord.value = { ...record }
  showUpdateModal.value = true
}

function submitUpdatedSalary() {
  axios.post("http://127.0.0.1:5000/update-salary", {
    SalaryID: editingRecord.value.SalaryID,
    BaseSalary: parseFloat(editingRecord.value.BaseSalary),
    Bonus: parseFloat(editingRecord.value.Bonus),
    Deductions: parseFloat(editingRecord.value.Deductions),
  })
  .then(res => {
    alert(res.data.message)
    showUpdateModal.value = false
    fetchSalaryData()
  })
  .catch(err => {
    alert("Lỗi khi cập nhật lương: " + (err.response?.data?.message || err.message))
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

function formatCurrency(value) {
  if (typeof value === 'number') {
    return `$${value.toFixed(0)}`
  }
  return `$${parseFloat(value).toFixed(0)}`
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${year}`
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

* {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

body {
  background-color: #f3f4f6;
  margin: 0;
  color: #111827;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
}

.main-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  color: #1f2937;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.tab {
  padding: 0.6rem 1.5rem;
  border-radius: 9999px;
  background-color: #e5e7eb;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tab:hover {
  background-color: #d1d5db;
}

.tab.active {
  background-color: #06b37f;
  color: white;
  font-weight: 600;
}

.card {
  background-color: white;
  border-left: 6px solid #3ac52d;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
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
  background-color: white;
  overflow: hidden;
  border-radius: 12px;
}

thead {
  background-color: #dbdedd;
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.95rem;
}

tbody tr:hover {
  background-color: #d2f7f3;
  transition: background-color 0.2s ease;
}

.text-sub {
  font-size: 0.75rem;
  color: #6b7280;
}

.clickable-row {
  cursor: pointer;
}

.btn-update {
  background-color: #129980;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;
}

.btn-update:hover {
  background-color: #154f63;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.modal input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.4rem 0 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.modal-actions button{
  background-color: #288c93;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
}.modal-actions button:hover {
  background-color: #0c5054;
  transform: scale(1.09) ;
  transition: transform 0.599s ease;
}
</style>
