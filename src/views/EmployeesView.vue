<template>
  <div class="employee-container">
    <h1 class="title">Employee Management</h1>

    <div class="search-filter-container">
      <input
        type="text"
        placeholder="Search by ID, Name, Department, Position..."
        v-model="searchQuery"
        class="search-input"
      />
    </div>

    <div class="header-actions">
      <button class="add-button" @click="showAddModal = true">
        Add Employee
      </button>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in filteredEmployees" :key="emp.EmployeeID">
            <td>{{ emp.EmployeeID }}</td>
            <td>{{ emp.FullName }}</td>
            <td>{{ emp.DepartmentName }}</td>
            <td>{{ emp.PositionName }}</td>
            <td>{{ emp.Status }}</td>
            <td>
              <button class="edit-btn" @click="openEditModal(emp.EmployeeID)">
                Edit
              </button>
              <button
                class="delete-btn"
                @click="deleteEmployee(emp.EmployeeID)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h2>Add Employee</h2>
        <form @submit.prevent="submitAdd">
          <input v-model="form.FullName" placeholder="Full Name" required />
          <input v-model="form.DateOfBirth" type="date" required />

          <select v-model="form.Gender" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input v-model="form.PhoneNumber" placeholder="Phone Number" required />
          <input v-model="form.Email" type="email" placeholder="Email" required />
          <input v-model="form.HireDate" type="date" required />
          <input
            v-model="form.DepartmentID"
            type="number"
            placeholder="Department ID"
            required
          />
          <input
            v-model="form.PositionID"
            type="number"
            placeholder="Position ID"
            required
          />
          <input v-model="form.Status" placeholder="Status" required />
          <input v-model="form.CreatedAt" type="date" required />
          <input v-model="form.UpdatedAt" type="date" required />

          <button type="submit">Save</button>
          <button type="button" @click="showAddModal = false">Cancel</button>
        </form>
      </div>
    </div>

    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h2>Edit Employee</h2>
        <form @submit.prevent="submitEdit">
          <input
            v-model="form.DepartmentID"
            placeholder="Department ID"
            required
          />
          <input
            v-model="form.PositionID"
            placeholder="Position ID"
            required
          />
          <input v-model="form.Status" placeholder="Status" required />
          <button type="submit">Update</button>
          <button @click="showEditModal = false">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const employees = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedEmployeeId = ref(null)
const form = ref({
  FullName: '',
  DateOfBirth: '',
  Gender: '',
  PhoneNumber: '',
  Email: '',
  HireDate: '',
  DepartmentID: '',
  PositionID: '',
  Status: '',
  CreatedAt: '',
  UpdatedAt: ''
})
const searchQuery = ref('')

const fetchEmployees = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:5000/employees-page')
    employees.value = res.data.employees
  } catch (error) {
    alert('Failed to fetch employees')
  }
}

const submitAdd = async () => {
  // Chuyển đổi DepartmentID và PositionID sang số
  form.value.DepartmentID = Number(form.value.DepartmentID)
  form.value.PositionID = Number(form.value.PositionID)

  console.log(
    'Dữ liệu gửi đi:',
    JSON.stringify(form.value, null, 2)
  ) // In dữ liệu ra console

  try {
    // Gửi yêu cầu POST với dữ liệu
    const response = await axios.post(
      'http://127.0.0.1:5000/add-employee',
      form.value
    )
    if (response.data.message) {
      alert(response.data.message)
    }
    showAddModal.value = false
    form.value = {}
    fetchEmployees()
  } catch (error) {
    alert('Lỗi khi thêm nhân viên')
    console.error(error)
  }
}

const openEditModal = async (id) => {
  selectedEmployeeId.value = id
  try {
    const res = await axios.get(`http://127.0.0.1:5000/cap-nhat-nhan-vien/${id}`)
    form.value = res.data.employee
    showEditModal.value = true
  } catch (err) {
    alert('Failed to load employee data')
  }
}

const submitEdit = async () => {
  try {
    await axios.post(
      `http://127.0.0.1:5000/cap-nhat-nhan-vien/${selectedEmployeeId.value}`,
      form.value
    )
    showEditModal.value = false
    form.value = {}
    fetchEmployees()
  } catch (err) {
    alert('Failed to update employee')
  }
}

const deleteEmployee = async (id) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    try {
      await axios.delete(`http://127.0.0.1:5000/xoa-nhan-vien/${id}`)
      fetchEmployees()
    } catch (err) {
      alert('Cannot delete employee. May have payroll records.')
    }
  }
}

const filteredEmployees = computed(() => {
  return employees.value.filter((emp) => {
    const searchLower = searchQuery.value.toLowerCase()
    return (
      emp.EmployeeID.toString().includes(searchLower) ||
      emp.FullName.toLowerCase().includes(searchLower) ||
      emp.DepartmentName.toLowerCase().includes(searchLower) ||
      emp.PositionName.toLowerCase().includes(searchLower)
    )
  })
})

onMounted(fetchEmployees)
</script>

<style scoped>
.employee-container {
  padding: 24px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.header-actions {
  margin-bottom: 16px;
}
.add-button,
.edit-btn,
.delete-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
select {
  display: block;
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  color: #3d4553;
  background-color: #ffffff;
  border: 1px solid #747474;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.add-button {
  background-color: #2563eb;
  color: white;
}
.edit-btn {
  background-color: #f59e0b;
  color: white;
  margin-right: 8px;
}
.delete-btn {
  background-color: #ef4444;
  color: white;
}
.table-wrapper {
  overflow-x: auto;
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 24px;
  border-radius: 8px;
  min-width: 300px;
}
.modal-content form input {
  display: block;
  margin-bottom: 12px;
  width: 100%;
  padding: 8px;
}
.search-filter-container {
  margin-bottom: 16px;
}

.search-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
}
</style>
