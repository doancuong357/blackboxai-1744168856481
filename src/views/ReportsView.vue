<template>
  <div class="reports-container">
    <h1 class="reports-title">Reports & Analytics</h1>

    <div class="grid-container">
      <div class="report-card">
        <div class="report-header">
          <h2 class="report-title">Employee Summary</h2>
          <select class="report-filter" v-model="employeeSummaryFilter">
            <option value="30">Last 30 Days</option>
            <option value="90">Last Quarter</option>
            <option value="365">Last Year</option>
          </select>
        </div>
        <div class="chart-container">
          <canvas id="employeeSummaryChart"></canvas>
          <p v-if="!chartDataAvailable.employeeSummary" class="no-data-message">No employee data available for the selected period.</p>
        </div>
      </div>

      <div class="report-card">
        <div class="report-header">
          <h2 class="report-title">Payroll Summary</h2>
          <select class="report-filter" v-model="payrollSummaryFilter">
            <option value="30">Last 30 Days</option>
            <option value="90">Last Quarter</option>
            <option value="365">Last Year</option>
          </select>
        </div>
        <div class="chart-container">
          <canvas id="payrollSummaryChart"></canvas>
           <p v-if="!chartDataAvailable.payrollSummary" class="no-data-message">No payroll data available for the selected period.</p>
        </div>
      </div>
    </div>

    <div class="report-card">
      <div class="report-header">
        <h2 class="report-title">Department Distribution</h2>
        <select class="report-filter" v-model="departmentDistributionFilter">
          <option value="current">Current Month</option>
          <option value="last">Last Month</option>
          <option value="quarter">Last Quarter</option>
        </select>
      </div>
      <div class="chart-container">
        <canvas id="departmentDistributionChart"></canvas>
        <p v-if="!chartDataAvailable.departmentDistribution" class="no-data-message">No department data available for the selected period.</p>
      </div>
    </div>

    <div class="report-generation-section">
        <h2>Generate Reports</h2>
        <div class="grid-container">
            <div class="report-card">
                <div class="report-header">
                    <h3 class="report-title">Generate Employee Report</h3>
                    <button class="generate-button" @click="generateEmployeeReport">Generate</button>
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
                    <div class="date-range-inputs">
                        <input type="date" class="date-input" v-model="employeeReportStartDate" placeholder="Start Date">
                        <input type="date" class="date-input" v-model="employeeReportEndDate" placeholder="End Date">
                    </div>
                </div>
            </div>

            <div class="report-card">
                <div class="report-header">
                    <h3 class="report-title">Generate Payroll Report</h3>
                    <button class="generate-button" @click="generatePayrollReport">Generate</button>
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const employeeSummaryFilter = ref('30');
const payrollSummaryFilter = ref('30');
const departmentDistributionFilter = ref('current');

// Report generation
const employeeReportType = ref('full');
const employeeReportStartDate = ref('');
const employeeReportEndDate = ref('');

const payrollReportType = ref('monthly');
const payrollReportPeriod = ref('January 2023');

const months = [
    { value: 'January 2023', label: 'January 2023' },
    { value: 'February 2023', label: 'February 2023' },
    { value: 'March 2023', label: 'March 2023' },
];

// Refs for the charts
const employeeSummaryChartRef = ref(null);
const payrollSummaryChartRef = ref(null);
const departmentDistributionChartRef = ref(null);

const chartDataAvailable = ref({
    employeeSummary: false,
    payrollSummary: false,
    departmentDistribution: false,
});

onMounted(() => {
    renderEmployeeSummaryChart();
    renderPayrollSummaryChart();
    renderDepartmentDistributionChart();
});

// Watch for filter changes and update charts
watch(employeeSummaryFilter, () => {
    renderEmployeeSummaryChart();
});
watch(payrollSummaryFilter, () => {
    renderPayrollSummaryChart();
});
watch(departmentDistributionFilter, () => {
    renderDepartmentDistributionChart();
});

function generateEmployeeReport() {
    if (!employeeReportStartDate.value || !employeeReportEndDate.value) {
        alert('Please select a valid date range for the employee report.');
        return;
    }
    alert(`Generating ${employeeReportType.value} report from ${employeeReportStartDate.value} to ${employeeReportEndDate.value}.`);
    // Call API to generate report
}

function generatePayrollReport() {
    alert(`Generating ${payrollReportType.value} report for ${payrollReportPeriod.value}.`);
      // Call API to generate report
}

// Chart rendering functions (Mock data for demonstration)
function renderEmployeeSummaryChart() {
    const ctx = document.getElementById('employeeSummaryChart');
    if (!ctx) return;

    // Mock data - Replace with actual data from API
    const chartData = {
        labels: ['New Hires', 'Terminations', 'Active Employees'],
        datasets: [{
            label: 'Employee Summary',
            data: employeeSummaryFilter.value === '30' ? [10, 5, 100] :
                    employeeSummaryFilter.value === '90' ? [30, 15, 300] :
                    [120, 60, 1200],
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(75, 192, 192, 0.6)',
            ],
            borderWidth: 1,
        }],
    };

    if (chartData.datasets[0].data.reduce((a, b) => a + b, 0) === 0) {
        chartDataAvailable.employeeSummary = false;
        if (employeeSummaryChartRef.value) {
            employeeSummaryChartRef.value.destroy();
            employeeSummaryChartRef.value = null;
        }
        return;
    }
    chartDataAvailable.employeeSummary = true;

    if (employeeSummaryChartRef.value) {
        employeeSummaryChartRef.value.destroy();
    }

    employeeSummaryChartRef.value = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top'
                },
            },
        },
    });
}

function renderPayrollSummaryChart() {
    const ctx = document.getElementById('payrollSummaryChart');
    if (!ctx) return;

    // Mock data
    const chartData = {
        labels: ['Total Salary', 'Total Bonuses', 'Total Deductions'],
        datasets: [{
            label: 'Payroll Summary',
            data: payrollSummaryFilter.value === '30' ? [150000, 10000, 5000] :
                    payrollSummaryFilter.value === '90' ? [450000, 30000, 15000] :
                    [1800000, 120000, 60000],
            backgroundColor: [
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 159, 64, 0.6)',
            ],
            borderWidth: 1,
        }],
    };

    if (chartData.datasets[0].data.reduce((a, b) => a + b, 0) === 0) {
        chartDataAvailable.payrollSummary = false;
        if (payrollSummaryChartRef.value) {
            payrollSummaryChartRef.value.destroy();
            payrollSummaryChartRef.value = null;
        }
        return;
    }

    chartDataAvailable.payrollSummary = true;

    if (payrollSummaryChartRef.value) {
        payrollSummaryChartRef.value.destroy();
    }

    payrollSummaryChartRef.value = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
            },
        },
    });
}

function renderDepartmentDistributionChart() {
    const ctx = document.getElementById('departmentDistributionChart');
    if (!ctx) return;
  // Mock Data
    const chartData = {
        labels: ['HR', 'Engineering', 'Sales', 'Marketing'],
        datasets: [{
            label: 'Department Distribution',
            data:
                departmentDistributionFilter.value === 'current' ? [20, 30, 25, 15] :
                departmentDistributionFilter.value === 'last' ? [18, 28, 22, 12] :
                [22, 32, 28, 18],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
            ],
            borderWidth: 1,
        }],
    };

    if (chartData.datasets[0].data.reduce((a, b) => a + b, 0) === 0) {
        chartDataAvailable.departmentDistribution = false;
         if (departmentDistributionChartRef.value) {
            departmentDistributionChartRef.value.destroy();
            departmentDistributionChartRef.value = null;
        }
        return;
    }
    chartDataAvailable.departmentDistribution = true;

    if (departmentDistributionChartRef.value) {
        departmentDistributionChartRef.value.destroy();
    }

    departmentDistributionChartRef.value = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top'
                },
            },
        },
    });
}
</script>
<style scoped>
.reports-container {
  padding: 24px;
  background-color: #f9fafb;
}

.reports-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #1f2937;
  text-align: center;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: 1fr 1fr;
  }
}

.report-card {
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.report-title {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
}

.report-filter {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  transition: border-color 0.3s ease;
  min-width: 180px;
}

.report-filter:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.chart-container {
  position: relative;
  width: 100%;
  height: 300px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.select-input,
.date-input {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  width: 100%;
  transition: border-color 0.3s ease;
}

.select-input:focus,
.date-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.date-range-inputs {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}


.generate-button {
  background-color: #3b82f6;
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
}

.generate-button:hover {
  background-color: #2563eb;
}

.report-generation-section {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
}

.no-data-message {
    text-align: center;
    color: #9ca3af;
    padding: 1rem;
    border-radius: 8px;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    margin-top: 1rem;
}
</style>