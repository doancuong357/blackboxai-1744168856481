<template>
  <div class="reports-container">
    <h1 class="reports-title">Reports & Analytics</h1>

    <!-- Biểu đồ nhân sự -->
    <div class="grid-container">
      <div class="report-card">
        <h2 class="report-title">Employee by Status</h2>
        <canvas id="employeeStatusChart"></canvas>
        <p v-if="!chartDataAvailable.status" class="no-data-message">No data available.</p>
      </div>

      <div class="report-card">
        <h2 class="report-title">Employee by Department</h2>
        <canvas id="departmentChart"></canvas>
        <p v-if="!chartDataAvailable.department" class="no-data-message">No data available.</p>
      </div>

      <div class="report-card">
        <h2 class="report-title">Employee by Position</h2>
        <canvas id="positionChart"></canvas>
        <p v-if="!chartDataAvailable.position" class="no-data-message">No data available.</p>
      </div>
    </div>

    <!-- Bảng thống kê lương -->
    <div class="report-card">
      <h2 class="report-title">Payroll Report</h2>
      <div v-if="payrollData.length > 0" class="table-wrapper">
        <table class="payroll-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Month</th>
              <th>Base Salary</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in payrollData" :key="index">
              <td>{{ item.FullName }}</td>
              <td>{{ item.SalaryMonth }}</td>
              <td>{{ formatMoney(item.BaseSalary) }}</td>
              <td>{{ formatMoney(item.Bonus) }}</td>
              <td>{{ formatMoney(item.Deductions) }}</td>
              <td>{{ formatMoney(item.NetSalary) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="no-data-message">No payroll data available.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// Chart references
const chartRefs = {
  status: ref(null),
  department: ref(null),
  position: ref(null),
};

const chartDataAvailable = ref({
  status: false,
  department: false,
  position: false,
});

const payrollData = ref([]);

// Format VND
function formatMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // Không hiển thị phần thập phân
    maximumFractionDigits: 0,
  }).format(value || 0);
}

// Fetch employee report
async function fetchEmployeeReport() {
  try {
    const res = await axios.get('http://127.0.0.1:5000/report-human');
    const data = res.data;

    renderStatusChart(data.theo_trang_thai);
    renderDepartmentChart(data.theo_phong_ban);
    renderPositionChart(data.theo_chuc_vu);
  } catch (error) {
    console.error('Error fetching employee report:', error);
  }
}

// Fetch payroll report
async function fetchPayrollReport() {
  try {
    const res = await axios.get('http://127.0.0.1:5000/report-salaries');
    payrollData.value = Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error('Error fetching payroll report:', error);
  }
}

// Biểu đồ nhân viên theo trạng thái
function renderStatusChart(data) {
  const ctx = document.getElementById('employeeStatusChart');
  if (!ctx || !data || data.length === 0) return;

  const labels = data.map(i => i.Status);
  const values = data.map(i => i.SoLuong);

  if (chartRefs.status.value) chartRefs.status.value.destroy();

  chartRefs.status.value = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Employee Status',
        data: values,
        backgroundColor: ['#3b82f6', '#f87171', '#10b981'],
      }],
    },
    options: {
      responsive: true,
    },
  });

  chartDataAvailable.value.status = true;
}

// Biểu đồ theo phòng ban
function renderDepartmentChart(data) {
  const ctx = document.getElementById('departmentChart');
  if (!ctx || !data || data.length === 0) return;

  const labels = data.map(i => i.DepartmentName || 'Unknown');
  const values = data.map(i => i.SoLuong);

  if (chartRefs.department.value) chartRefs.department.value.destroy();

  chartRefs.department.value = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        label: 'Department',
        data: values,
        backgroundColor: ['#60a5fa', '#fbbf24', '#a3e635', '#f472b6'],
      }],
    },
    options: {
      responsive: true,
    },
  });

  chartDataAvailable.value.department = true;
}

// Biểu đồ theo chức vụ
function renderPositionChart(data) {
  const ctx = document.getElementById('positionChart');
  if (!ctx || !data || data.length === 0) return;

  const labels = data.map(i => i.PositionName || 'Unknown');
  const values = data.map(i => i.SoLuong);

  if (chartRefs.position.value) chartRefs.position.value.destroy();

  chartRefs.position.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Positions',
        data: values,
        backgroundColor: '#34d399',
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });

  chartDataAvailable.value.position = true;
}

onMounted(() => {
  fetchEmployeeReport();
  fetchPayrollReport();
});
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
  text-align: center;
  color: #1f2937;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

.report-card {
  background-color: #ffffff;
  padding: 24px;
  border-left: 6px solid #48cd7d;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.report-card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.report-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1f2937;
}

canvas {
  max-width: 100%;
  height: 300px !important;
}

.no-data-message {
  margin-top: 16px;
  text-align: center;
  color: #9ca3af;
}

.table-wrapper {
  overflow-x: auto;
}

.payroll-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  border-left: 6px solid #aac0f5;
  border-radius: 12px;
  overflow: hidden;
}

.payroll-table th,
.payroll-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.95rem;
}

.payroll-table th {
  background-color: #f3f4f6;
  color: #374151;
  font-weight: 600;
}

/* Hover Effect */
.payroll-table tbody tr {
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.payroll-table tbody tr:hover {
  background-color: #e0f2fe;
  transform: scale(1.01);
  cursor: pointer;
}
</style>
