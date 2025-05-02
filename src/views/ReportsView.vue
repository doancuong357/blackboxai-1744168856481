<template>
  <div class="reports-container">
    <h1 class="reports-title">Reports & Analytics</h1>
    
    <!-- Employee Summary -->
    <div class="grid-container">
      <div class="report-card">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Employee Summary</h2>
          <select class="select-input" v-model="employeeSummaryFilter">
            <option value="30">Last 30 Days</option>
            <option value="90">Last Quarter</option>
            <option value="365">Last Year</option>
          </select>
        </div>
        <div class="chart-placeholder">
          <p>Employee summary chart will be displayed here</p>
        </div>
      </div>

      <!-- Payroll Summary -->
      <div class="report-card">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Payroll Summary</h2>
          <select class="select-input" v-model="payrollSummaryFilter">
            <option value="30">Last 30 Days</option>
            <option value="90">Last Quarter</option>
            <option value="365">Last Year</option>
          </select>
        </div>
        <div class="chart-placeholder">
          <p>Payroll summary chart will be displayed here</p>
        </div>
      </div>
    </div>

    <!-- Department Distribution -->
    <div class="report-card">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Department Distribution</h2>
        <select class="select-input" v-model="departmentDistributionFilter">
          <option value="current">Current Month</option>
          <option value="last">Last Month</option>
          <option value="quarter">Last Quarter</option>
        </select>
      </div>
      <div class="chart-placeholder">
        <p>Department distribution chart will be displayed here</p>
      </div>
    </div>

    <!-- Generate Reports -->
    <div class="grid-container">
      <div class="report-card">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Generate Employee Report</h2>
          <button class="report-button" @click="generateEmployeeReport">Generate</button>
        </div>
        <div class="form-group">
          <label class="form-label">Report Type</label>
          <select class="select-input" v-model="employeeReportType">
            <option value="full">Full Employee List</option>
            <option value="department">Department-wise</option>
            <option value="newHires">New Hires</option>
            <option value="terminations">Terminations</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Date Range</label>
          <div class="grid-container">
            <input type="date" class="form-input" v-model="employeeReportStartDate">
            <input type="date" class="form-input" v-model="employeeReportEndDate">
          </div>
        </div>
      </div>

      <div class="report-card">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Generate Payroll Report</h2>
          <button class="report-button" @click="generatePayrollReport">Generate</button>
        </div>
        <div class="form-group">
          <label class="form-label">Report Type</label>
          <select class="select-input" v-model="payrollReportType">
            <option value="monthly">Monthly Payroll</option>
            <option value="quarterly">Quarterly Summary</option>
            <option value="yearly">Yearly Tax Report</option>
            <option value="bonus">Bonus Payments</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Period</label>
          <select class="select-input" v-model="payrollReportPeriod">
            <option v-for="month in months" :key="month.value" :value="month.value">
              {{ month.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Filters for charts
const employeeSummaryFilter = ref('30')
const payrollSummaryFilter = ref('30')
const departmentDistributionFilter = ref('current')

// Employee report data
const employeeReportType = ref('full')
const employeeReportStartDate = ref('')
const employeeReportEndDate = ref('')

// Payroll report data
const payrollReportType = ref('monthly')
const payrollReportPeriod = ref('January 2023')

// Mock data for months
const months = [
  { value: 'January 2023', label: 'January 2023' },
  { value: 'February 2023', label: 'February 2023' },
  { value: 'March 2023', label: 'March 2023' },
  // Add more months as needed
]

function generateEmployeeReport() {
  if (!employeeReportStartDate.value || !employeeReportEndDate.value) {
    alert('Please select a valid date range for the employee report.')
    return
  }
  alert(`Generating ${employeeReportType.value} report from ${employeeReportStartDate.value} to ${employeeReportEndDate.value}.`)
}

function generatePayrollReport() {
  alert(`Generating ${payrollReportType.value} report for ${payrollReportPeriod.value}.`)
}
</script>
<style scoped>
/* Container Styles */
.reports-container {
  padding: 24px;
  background-color: #0f6507; /* Light gray background */
}

/* Title Styles */
.reports-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #111827; /* Dark text */
}

/* Card Styles */
.report-card {
  background-color: #ffffff; /* White background */
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.report-card:hover {
  transform: translateY(-4px); /* Lift effect on hover */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Stronger shadow on hover */
}

/* Chart Placeholder */
.chart-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af; /* Light gray text */
  background-color: #f3f4f6; /* Light gray background */
  border-radius: 8px;
  margin-top: 16px;
}

/* Select Styles */
.select-input {
  padding: 10px 14px;
  border: 1px solid #d1d5db; /* Light gray border */
  border-radius: 8px;
  font-size: 14px;
  color: #374151; /* Gray text */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.select-input:focus {
  border-color: #2563eb; /* Blue border on focus */
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.5); /* Blue shadow on focus */
  outline: none;
}

/* Button Styles */
.report-button {
  background-color: #2563eb; /* Blue */
  color: #ffffff;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.report-button:hover {
  background-color: #1d4ed8; /* Darker blue */
  transform: translateY(-2px); /* Lift effect */
}

.report-button:active {
  transform: translateY(0); /* Reset lift effect */
}

/* Form Styles */
.form-group {
  margin-bottom: 16px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151; /* Gray */
  margin-bottom: 8px;
  display: block;
}

.form-input {
  padding: 10px 14px;
  border: 1px solid #d1d5db; /* Light gray border */
  border-radius: 8px;
  font-size: 14px;
  color: #374151; /* Gray text */
  width: 100%;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
  border-color: #2563eb; /* Blue border on focus */
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.5); /* Blue shadow on focus */
  outline: none;
}

/* Grid Layout */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

/* Responsive Design */
@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>