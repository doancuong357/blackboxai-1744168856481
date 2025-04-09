<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Reports & Analytics</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Employee Summary</h2>
          <select class="border rounded-md px-3 py-1 text-sm">
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Last Year</option>
          </select>
        </div>
        <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p class="text-gray-500">Employee summary chart will be displayed here</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Payroll Summary</h2>
          <select class="border rounded-md px-3 py-1 text-sm">
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Last Year</option>
          </select>
        </div>
        <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p class="text-gray-500">Payroll summary chart will be displayed here</p>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Department Distribution</h2>
        <select class="border rounded-md px-3 py-1 text-sm">
          <option>Current Month</option>
          <option>Last Month</option>
          <option>Last Quarter</option>
        </select>
      </div>
      <div class="h-96 bg-gray-100 rounded flex items-center justify-center">
        <p class="text-gray-500">Department distribution chart will be displayed here</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Generate Employee Report</h2>
          <button 
            class="bg-primary-600 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-700"
            @click="generateEmployeeReport"
          >
            Generate
          </button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select class="w-full border rounded-md px-3 py-2">
              <option>Full Employee List</option>
              <option>Department-wise</option>
              <option>New Hires</option>
              <option>Terminations</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div class="grid grid-cols-2 gap-2">
              <input type="date" class="border rounded-md px-3 py-2 w-full">
              <input type="date" class="border rounded-md px-3 py-2 w-full">
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Generate Payroll Report</h2>
          <button 
            class="bg-primary-600 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-700"
            @click="generatePayrollReport"
          >
            Generate
          </button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select class="w-full border rounded-md px-3 py-2">
              <option>Monthly Payroll</option>
              <option>Quarterly Summary</option>
              <option>Yearly Tax Report</option>
              <option>Bonus Payments</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Period</label>
            <select class="w-full border rounded-md px-3 py-2">
              <option>January 2023</option>
              <option>February 2023</option>
              <option>March 2023</option>
              <!-- More months -->
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function generateEmployeeReport() {
  // Will be implemented with API calls
  alert('Employee report generation will be implemented with API integration')
}

function generatePayrollReport() {
  // Will be implemented with API calls
  alert('Payroll report generation will be implemented with API integration')
}
</script>
