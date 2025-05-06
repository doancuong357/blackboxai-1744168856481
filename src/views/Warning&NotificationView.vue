<template>
  <div class="departments-container">
    <!-- Header Section -->
    <div class="header">
      <h1 class="departments-title">Department & Job Title Management</h1>
      <div class="header-buttons">
        <button class="add-button" @click="toggleModal('department', true)">
          Add Department
        </button>
        <button class="add-button" @click="toggleModal('jobTitle', true)">
          Add Job Title
        </button>
      </div>
    </div>

    <!-- Departments Section -->
    <div class="grid-container">
      <div class="section-card">
        <div class="section-header">
          <h2>Departments</h2>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Head Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dept in departments" :key="dept.id">
              <td>{{ dept.name }}</td>
              <td>{{ dept.employeeCount }}</td>
              <td>
                <button class="action-button edit" @click="editDepartment(dept.id)">
                  Edit
                </button>
                <button class="action-button delete" @click="confirmDelete('department', dept.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Job Titles Section -->
      <div class="section-card">
        <div class="section-header">
          <h2>Job Titles</h2>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Employees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in jobTitles" :key="job.id">
              <td>{{ job.title }}</td>
              <td>{{ job.department }}</td>
              <td>{{ job.employeeCount }}</td>
              <td>
                <button class="action-button edit" @click="editJobTitle(job.id)">
                  Edit
                </button>
                <button class="action-button delete" @click="confirmDelete('jobTitle', job.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Department Modal -->
    <Modal
      v-if="showAddDepartmentModal"
      title="Add New Department"
      @close="toggleModal('department', false)"
      @save="addDepartment"
    >
      <div>
        <label class="form-label">Department Name</label>
        <input type="text" class="form-input" v-model="newDepartment.name" />
      </div>
    </Modal>

    <!-- Add Job Title Modal -->
    <Modal
      v-if="showAddJobTitleModal"
      title="Add New Job Title"
      @close="toggleModal('jobTitle', false)"
      @save="addJobTitle"
    >
      <div>
        <label class="form-label">Job Title</label>
        <input type="text" class="form-input" v-model="newJobTitle.title" />
      </div>
      <div>
        <label class="form-label">Department</label>
        <select class="form-input" v-model="newJobTitle.departmentId">
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.name }}
          </option>
        </select>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '@/components/common/Modal.vue'

// Mock data
const departments = ref([
  { id: 1, name: 'Engineering', employeeCount: 24 },
  { id: 2, name: 'HR', employeeCount: 5 },
  { id: 3, name: 'Finance', employeeCount: 8 },
  { id: 4, name: 'Marketing', employeeCount: 12 }
])

const jobTitles = ref([
  { id: 1, title: 'Software Engineer', department: 'Engineering', employeeCount: 15 },
  { id: 2, title: 'HR Manager', department: 'HR', employeeCount: 2 },
  { id: 3, title: 'Accountant', department: 'Finance', employeeCount: 4 },
  { id: 4, title: 'Marketing Specialist', department: 'Marketing', employeeCount: 6 }
])

const showAddDepartmentModal = ref(false)
const showAddJobTitleModal = ref(false)

const newDepartment = ref({ name: '' })
const newJobTitle = ref({ title: '', departmentId: '' })

function toggleModal(type, value) {
  if (type === 'department') showAddDepartmentModal.value = value
  if (type === 'jobTitle') showAddJobTitleModal.value = value
}

function addDepartment() {
  if (!newDepartment.value.name.trim()) return alert('Department name is required!')
  departments.value.push({
    id: departments.value.length + 1,
    name: newDepartment.value.name,
    employeeCount: 0
  })
  newDepartment.value.name = ''
  toggleModal('department', false)
}

function addJobTitle() {
  if (!newJobTitle.value.title.trim() || !newJobTitle.value.departmentId) {
    return alert('Job title and department are required!')
  }
  const department = departments.value.find(d => d.id == newJobTitle.value.departmentId)
  jobTitles.value.push({
    id: jobTitles.value.length + 1,
    title: newJobTitle.value.title,
    department: department.name,
    employeeCount: 0
  })
  newJobTitle.value.title = ''
  newJobTitle.value.departmentId = ''
  toggleModal('jobTitle', false)
}
</script>

<style scoped>
/* Container Styles */
.departments-container {
  padding: 24px;
  background-color: #f9fafb;
}

/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.departments-title {
  font-size: 24px;
  font-weight: bold;
  color: #111827;
}

.header-buttons {
  display: flex;
  gap: 8px;
}

.add-button {
  background-color: #2563eb;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #1d4ed8;
}

/* Grid Layout */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

/* Section Card */
.section-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section-header {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 18px;
  font-weight: bold;
  color: #374151;
}

/* Table Styles */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  font-size: 14px;
  text-align: left;
}

.table th {
  background-color: #f3f4f6;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
}

.table tbody tr:hover {
  background-color: #f9fafb;
}

/* Action Buttons */
.action-button {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.action-button.edit {
  color: #2563eb;
}

.action-button.edit:hover {
  color: #1d4ed8;
}

.action-button.delete {
  color: #dc2626;
}

.action-button.delete:hover {
  color: #b91c1c;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 400px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
}

.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
  outline: none;
}
</style>