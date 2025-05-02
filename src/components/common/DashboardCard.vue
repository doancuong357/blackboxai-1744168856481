<!-- filepath: d:\Lap trinh androi\blackboxai-1744168856481\src\components\common\DashboardCard.vue -->
<template>
  <div class="dashboard-card">
    <div class="dashboard-card__icon" :style="{ backgroundColor: color || '#e5e7eb' }">
      <component :is="iconComponent" class="dashboard-card__icon-content" />
    </div>
    <div class="dashboard-card__content">
      <p class="dashboard-card__title">{{ title || 'No Title' }}</p>
      <p class="dashboard-card__value">{{ value || 'N/A' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'No Title'
  },
  value: {
    type: [String, Number],
    default: 'N/A'
  },
  icon: {
    type: String,
    default: 'question-mark-circle'
  },
  color: {
    type: String,
    default: '#e5e7eb' // Default light gray background
  }
})

const iconComponent = computed(() => {
  const icons = {
    users: 'UsersIcon',
    'currency-dollar': 'CurrencyDollarIcon',
    'building-office': 'BuildingOfficeIcon',
    'clipboard-list': 'ClipboardListIcon',
    'question-mark-circle': 'QuestionMarkCircleIcon'
  }
  return icons[props.icon] || 'QuestionMarkCircleIcon'
})
</script>

<style scoped>
/* Dashboard Card Styles */
.dashboard-card {
  display: flex;
  align-items: center;
  background-color: #ffffff; /* White background */
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-card:hover {
  transform: translateY(-4px); /* Lift effect on hover */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Stronger shadow on hover */
}

.dashboard-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 16px;
}

.dashboard-card__icon-content {
  width: 24px;
  height: 24px;
  fill: #ffffff; /* White icon color */
}

.dashboard-card__content {
  display: flex;
  flex-direction: column;
}

.dashboard-card__title {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280; /* Gray text */
  margin: 0;
}

.dashboard-card__value {
  font-size: 24px;
  font-weight: 600;
  color: #111827; /* Dark text */
  margin: 4px 0 0;
}
</style>