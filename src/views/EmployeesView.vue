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
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
              </button>
              <button
                class="delete-btn"
                @click="deleteEmployee(emp.EmployeeID)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
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
  padding: 32px;
  background-color: #f5f8fb;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #2e3c49;
  text-align: center;
}

.search-filter-container {
  margin-bottom: 20px;
  text-align: center;
}

.search-input {
  padding: 12px 16px;
  border: 1px solid #cbd3da;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.header-actions {
  margin-bottom: 16px;
  text-align: right;
}

.add-button,
.edit-btn,
.delete-btn {
  padding: 4px 6px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-button {
  background-color: #1f79c3;
  color: white;
}

.edit-btn {
  background-color: #d3d3d3;
  color: white;
  margin-right: 8px;
}

.delete-btn {
  background-color: #d3d3d3;
  color: white;
}

.add-button:hover,
.edit-btn:hover,
.delete-btn:hover {
  opacity: 0.9;
  transform: scale(1.11);
  background-color: #434178;
}

.table-wrapper {
  overflow-x: auto;
  border-left: 6px solid #5bcd39;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}
input {
    max-width: 90%;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 14px 18px;
  border-bottom: 1px solid #e1e5ea;
  text-align: left;
  font-size: 0.95rem;
  color: #2e3c49;
}

th {
  background-color: #06b37f;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

tbody tr {
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
}

tbody tr:hover {
  background-color: #d2f2e2;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
  transform: scale(1.01);
  position: relative;
  z-index: 1;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: white;
  padding: 28px;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.modal-content h2 {
  margin-bottom: 20px;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2e3c49;
  text-align: center;
}

.modal-content form input,
.modal-content form select {
  display: block;
  margin-bottom: 14px;
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccd6dd;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.modal-content form input:focus,
.modal-content form select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.modal-content button[type="submit"] {
  background-color: #2563eb;
  color: white;
  margin-top: 10px;
}

.modal-content button[type="button"],
.modal-content button:not([type]) {
  background-color: #64748b;
  color: white;
  margin-left: 8px;
}

.modal-content button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.modal-content button:hover {
  opacity: 0.95;
}

</style>
