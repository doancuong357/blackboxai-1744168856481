<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Payroll Management</h1>
    
    <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div class="p-4 border-b">
        <div class="flex items-center">
          <input
            type="text"
            placeholder="Search payroll records..."
            class="border rounded-md px-3 py-2 w-full max-w-md"
            v-model="searchQuery"
          />
          <div class="ml-4 flex space-x-2">
            <select 
              class="border rounded-md px-3 py-2"
              v-model="monthFilter"
            >
              <option value="">All Months</option>
              <option 
                v-for="month in months"
                :key="month.value"
                :value="month.value"
              >
                {{ month.label }}
              </option>
            </select>
            <select 
              class="border rounded-md px-3 py-2"
              v-model="yearFilter"
            >
              <option value="">All Years</option>
              <option 
                v-for="year in years"
                :key="year"
                :value="year"
              >
                {{ year }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonuses</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="record in filteredRecords"
            :key="record.id"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ record.employeeName }}</div>
              <div class="text-sm text-gray-500">{{ record.employeeId }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ record.month }} {{ record.year }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${{ record.basicSalary.toLocaleString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${{ record.bonuses.toLocaleString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${{ record.deductions.toLocaleString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              ${{ (record.basicSalary + record.bonuses - record.deductions).toLocaleString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="record.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
              >
                {{ record.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
              <button class="text-danger-600 hover:text-danger-900">Process</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold mb-4">Payroll Summary</h2>
      <!-- Chart component will go here -->
      <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
        <p class="text-gray-500">Payroll chart will be displayed here</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock data - will be replaced with API calls later
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
  { value: 'March', label: 'March' },
  // ... rest of months
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
</script>
