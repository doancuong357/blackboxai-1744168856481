<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Department & Job Title Management</h1>
      <div class="space-x-2">
        <button 
          class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
          @click="showAddDepartmentModal = true"
        >
          Add Department
        </button>
        <button 
          class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
          @click="showAddJobTitleModal = true"
        >
          Add Job Title
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Departments Section -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-4 border-b">
          <h2 class="text-lg font-semibold">Departments</h2>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head Count</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="dept in departments"
              :key="dept.id"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ dept.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ dept.employeeCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button 
                  class="text-danger-600 hover:text-danger-900"
                  @click="deleteDepartment(dept.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Job Titles Section -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-4 border-b">
          <h2 class="text-lg font-semibold">Job Titles</h2>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="job in jobTitles"
              :key="job.id"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ job.title }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ job.department }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ job.employeeCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button 
                  class="text-danger-600 hover:text-danger-900"
                  @click="deleteJobTitle(job.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Department Modal -->
    <div 
      v-if="showAddDepartmentModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Add New Department</h2>
          <button @click="showAddDepartmentModal = false">
            <XMarkIcon class="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
            <input 
              type="text" 
              class="w-full border rounded-md px-3 py-2"
              v-model="newDepartment.name"
            >
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            class="px-4 py-2 border rounded-md"
            @click="showAddDepartmentModal = false"
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            @click="addDepartment"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Add Job Title Modal -->
    <div 
      v-if="showAddJobTitleModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Add New Job Title</h2>
          <button @click="showAddJobTitleModal = false">
            <XMarkIcon class="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input 
              type="text" 
              class="w-full border rounded-md px-3 py-2"
              v-model="newJobTitle.title"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select 
              class="w-full border rounded-md px-3 py-2"
              v-model="newJobTitle.departmentId"
            >
              <option 
                v-for="dept in departments"
                :key="dept.id"
                :value="dept.id"
              >
                {{ dept.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            class="px-4 py-2 border rounded-md"
            @click="showAddJobTitleModal = false"
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            @click="addJobTitle"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

// Mock data - will be replaced with API calls later
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

const newDepartment = ref({
  name: ''
})

const newJobTitle = ref({
  title: '',
  departmentId: ''
})

function addDepartment() {
  departments.value.push({
    id: departments.value.length + 1,
    name: newDepartment.value.name,
    employeeCount: 0
  })
  newDepartment.value.name = ''
  showAddDepartmentModal.value = false
}

function deleteDepartment(id) {
  departments.value = departments.value.filter(dept => dept.id !== id)
}

function addJobTitle() {
  const department = departments.value.find(d => d.id == newJobTitle.value.departmentId)
  jobTitles.value.push({
    id: jobTitles.value.length + 1,
    title: newJobTitle.value.title,
    department: department.name,
    employeeCount: 0
  })
  newJobTitle.value.title = ''
  newJobTitle.value.departmentId = ''
  showAddJobTitleModal.value = false
}

function deleteJobTitle(id) {
  jobTitles.value = jobTitles.value.filter(job => job.id !== id)
}
</script>
