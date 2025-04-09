<template>
  <div class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
