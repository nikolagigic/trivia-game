<script setup lang="ts">
import HomeComponent from '@/components/HomeComponent.vue'
</script>

<template>
  <main class="w-full h-screen flex items-center justify-center flex-col space-y-4">
    <HomeComponent />
    <nav class="flex space-x-4">
      <RouterLink to="/play" class="text-blue-500 hover:underline">Play</RouterLink>
      <RouterLink to="/login" class="text-blue-500 hover:underline">Login</RouterLink>
      <RouterLink to="/register" class="text-blue-500 hover:underline">Register</RouterLink>
    </nav>
  </main>
</template>
