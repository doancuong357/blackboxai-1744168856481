<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">HR Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardCard 
        title="Total Employees" 
        value="124" 
        icon="users"
        color="bg-blue-100 text-blue-800"
      />
      <DashboardCard 
        title="Active Payroll" 
        value="$124,500" 
        icon="currency-dollar"
        color="bg-green-100 text-green-800"
      />
      <DashboardCard 
        title="Departments" 
        value="8" 
        icon="building-office"
        color="bg-purple-100 text-purple-800"
      />
      <DashboardCard 
        title="Pending Tasks" 
        value="5" 
        icon="clipboard-list"
        color="bg-yellow-100 text-yellow-800"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Recent Employees</h2>
        <!-- Employee list component will go here -->
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Payroll Summary</h2>
        <!-- Payroll chart component will go here -->
      </div>
    </div>
  </div>
</template>

<script setup>
import DashboardCard from '@/components/common/DashboardCard.vue'
</script>
