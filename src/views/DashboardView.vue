<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">HR Dashboard</h1>

    <!-- Cards Section -->
    <div class="dashboard-cards">
      <DashboardCard 
        title="Total Employees" 
        :value="totalEmployees" 
        icon="users"
        color="#4caf50" 
      />
      <DashboardCard 
        title="Active Payroll" 
        :value="activePayroll" 
        icon="currency-dollar"
        color="#2196f3" 
      />
      <DashboardCard 
        title="Departments" 
        :value="departments" 
        icon="building-office"
        color="#ff9800" 
      />
      <DashboardCard 
        title="Pending Tasks" 
        :value="pendingTasks" 
        icon="clipboard-list"
        color="#f44336" 
      />
    </div>

    <!-- Recent Employees Section -->
    <div class="dashboard-section">
      <h2 class="section-title">Recent Employees</h2>
      <ul class="employee-list">
        <li v-for="employee in recentEmployees" :key="employee.id" class="employee-item">
          <span>{{ employee.name }}</span>
          <span class="employee-position">{{ employee.position }}</span>
        </li>
      </ul>
    </div>

    <!-- Payroll Summary Section -->
    <div class="dashboard-section">
      <h2 class="section-title">Payroll Summary</h2>
      <div class="chart-placeholder">
        <p>Payroll chart will be displayed here</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import DashboardCard from '@/components/common/DashboardCard.vue'

// Mock data for the dashboard
const totalEmployees = 124
const activePayroll = '$124,500'
const departments = 8
const pendingTasks = 5

const recentEmployees = [
  { id: 1, name: 'John Doe', position: 'Software Engineer' },
  { id: 2, name: 'Jane Smith', position: 'HR Manager' },
  { id: 3, name: 'Alice Johnson', position: 'Accountant' },
  { id: 4, name: 'Bob Brown', position: 'Marketing Specialist' }
]
</script>

<style scoped>
/* Container Styles */
.dashboard-container {
  padding: 24px;
  background-color: #f9fafb; /* Light gray background */
}

/* Title Styles */
.dashboard-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #111827; /* Dark text */
  text-align: center;
}

/* Cards Section */
.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

/* Section Styles */
.dashboard-section {
  background-color: #ffffff; /* White background */
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  margin-bottom: 24px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #374151; /* Gray text */
}

/* Employee List */
.employee-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.employee-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb; /* Light gray border */
}

.employee-item:last-child {
  border-bottom: none;
}

.employee-position {
  color: #6b7280; /* Gray text */
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
}
</style>