<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Employee Management</h1>
      <button 
        class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
        @click="showAddEmployeeModal = true"
      >
        Add Employee
      </button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-4 border-b">
        <div class="flex items-center">
          <input
            type="text"
            placeholder="Search employees..."
            class="border rounded-md px-3 py-2 w-full max-w-md"
            v-model="searchQuery"
          />
          <div class="ml-4 flex space-x-2">
            <select 
              class="border rounded-md px-3 py-2"
              v-model="departmentFilter"
            >
              <option value="">All Departments</option>
              <option 
                v-for="dept in departments"
                :key="dept.id"
                :value="dept.id"
              >
                {{ dept.name }}
              </option>
            </select>
            <select 
              class="border rounded-md px-3 py-2"
              v-model="statusFilter"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="employee in filteredEmployees"
            :key="employee.id"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ employee.firstName }} {{ employee.lastName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.department }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.jobTitle }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                {{ employee.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
              <button class="text-danger-600 hover:text-danger-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Employee Modal -->
    <div 
      v-if="showAddEmployeeModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Add New Employee</h2>
          <button @click="showAddEmployeeModal = false">
            <XMarkIcon class="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <!-- Form content will go here -->
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            class="px-4 py-2 border rounded-md"
            @click="showAddEmployeeModal = false"
          >
            Cancel
          </button>
          <button 
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            @click="addEmployee"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

// Mock data - will be replaced with API calls later
const employees = ref([
  { id: 1001, firstName: 'John', lastName: 'Doe', department: 'Engineering', jobTitle: 'Software Engineer', status: 'active' },
  { id: 1002, firstName: 'Jane', lastName: 'Smith', department: 'HR', jobTitle: 'HR Manager', status: 'active' },
  { id: 1003, firstName: 'Robert', lastName: 'Johnson', department: 'Finance', jobTitle: 'Accountant', status: 'inactive' }
])

const departments = ref([
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'HR' },
  { id: 3, name: 'Finance' },
  { id: 4, name: 'Marketing' }
])

const searchQuery = ref('')
const departmentFilter = ref('')
const statusFilter = ref('')
const showAddEmployeeModal = ref(false)

const filteredEmployees = computed(() => {
  return employees.value.filter(emp => {
    const matchesSearch = 
      emp.id.toString().includes(searchQuery.value.toLowerCase()) ||
      emp.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      emp.jobTitle.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesDept = !departmentFilter.value || emp.department === departments.value.find(d => d.id == departmentFilter.value)?.name
    const matchesStatus = !statusFilter.value || emp.status === statusFilter.value

    return matchesSearch && matchesDept && matchesStatus
  })
})

function addEmployee() {
  // Will be implemented with form data
  showAddEmployeeModal.value = false
}
</script>
