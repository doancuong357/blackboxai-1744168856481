<template>
  <div class="payroll-container">
    <h1 class="payroll-title">Payroll Management</h1>

    <!-- Add Employee Button -->
    <div class="header-actions">
      <button class="add-employee-button" @click="showAddEmployeeModal = true">
        Add Employee
      </button>
    </div>

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

    <!-- Add Employee Modal -->
    <div v-if="showAddEmployeeModal" class="modal-overlay">
      <div class="modal">
        <h2>Add New Employee</h2>
        <div class="modal-body">
          <label>Employee Name</label>
          <input type="text" v-model="newEmployee.employeeName" class="form-input" />
          <label>Basic Salary</label>
          <input type="number" v-model="newEmployee.basicSalary" class="form-input" />
          <label>Bonuses</label>
          <input type="number" v-model="newEmployee.bonuses" class="form-input" />
          <label>Deductions</label>
          <input type="number" v-model="newEmployee.deductions" class="form-input" />
          <label>Status</label>
          <select v-model="newEmployee.status" class="form-input">
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div class="modal-footer">
          <button class="cancel-button" @click="showAddEmployeeModal = false">Cancel</button>
          <button class="save-button" @click="addEmployee">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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
const showAddEmployeeModal = ref(false)

const newEmployee = ref({
  employeeName: '',
  basicSalary: 0,
  bonuses: 0,
  deductions: 0,
  status: 'pending'
})

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

function addEmployee() {
  if (!newEmployee.value.employeeName || newEmployee.value.basicSalary <= 0) {
    alert('Please fill in all required fields.')
    return
  }

  const newId = payrollRecords.value.length + 1
  payrollRecords.value.push({
    id: newId,
    employeeId: 1000 + newId,
    month: 'January',
    year: 2023,
    ...newEmployee.value
  })

  // Reset form and close modal
  newEmployee.value = {
    employeeName: '',
    basicSalary: 0,
    bonuses: 0,
    deductions: 0,
    status: 'pending'
  }
  showAddEmployeeModal.value = false
}
</script>

<style scoped>
/* Container Styles */
.payroll-container {
  padding: 24px;
  background-color: #f9fafb; /* Light gray background */
  min-height: 100vh;
}

/* Title Styles */
.payroll-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #1f2937; /* Dark gray */
  text-align: center;
}

/* Add Employee Button */
.add-employee-button {
  background-color: #2563eb; /* Blue */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-bottom: 16px;
}

.add-employee-button:hover {
  background-color: #1d4ed8; /* Darker blue */
  transform: translateY(-2px); /* Lift effect */
}

.add-employee-button:active {
  transform: translateY(0); /* Reset lift effect */
}

/* Search and Filter Section */
.search-filter-container {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-input,
.filter-select {
  padding: 12px 16px;
  border: 1px solid #d1d5db; /* Light gray border */
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus,
.filter-select:focus {
  border-color: #2563eb; /* Blue border on focus */
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.5); /* Blue shadow on focus */
  outline: none;
}

/* Table Styles */
.table-container {
  background-color: #ffffff; /* White background */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f3f4f6; /* Light gray background */
}

th {
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280; /* Gray text */
  padding: 12px;
}

tbody tr {
  border-bottom: 1px solid #e5e7eb; /* Light gray border */
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background-color: #f9fafb; /* Light hover effect */
}

td {
  padding: 12px;
  font-size: 14px;
  color: #374151; /* Dark gray text */
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
}

.badge-paid {
  background-color: #d1fae5; /* Light green */
  color: #065f46; /* Dark green */
}

.badge-pending {
  background-color: #fef3c7; /* Light yellow */
  color: #92400e; /* Dark yellow */
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Stronger shadow */
  width: 400px;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-body label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151; /* Gray */
  margin-bottom: 8px;
}

.modal-body input,
.modal-body select {
  width: 90%;
  padding: 12px 16px;
  border: 1px solid #d1d5db; /* Light gray border */
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.modal-body input:focus,
.modal-body select:focus {
  border-color: #2563eb; /* Blue border on focus */
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.5); /* Blue shadow on focus */
  outline: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.cancel-button {
  background-color: #9ca3af; /* Gray */
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #6b7280; /* Darker gray */
}

.save-button {
  background-color: #2563eb; /* Blue */
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.save-button:hover {
  background-color: #1d4ed8; /* Darker blue */
  transform: translateY(-2px); /* Lift effect */
}

.save-button:active {
  transform: translateY(0); /* Reset lift effect */
}
</style>