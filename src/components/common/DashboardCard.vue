<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <div class="flex items-center">
      <div 
        class="p-3 rounded-full mr-4"
        :class="color"
      >
        <component 
          :is="iconComponent" 
          class="h-6 w-6"
        />
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500">{{ title }}</p>
        <p class="text-2xl font-semibold">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  color: String
})

const iconComponent = computed(() => {
  const icons = {
    users: 'UsersIcon',
    'currency-dollar': 'CurrencyDollarIcon',
    'building-office': 'BuildingOfficeIcon',
    'clipboard-list': 'ClipboardListIcon'
  }
  return icons[props.icon] || 'QuestionMarkCircleIcon'
})
</script>
