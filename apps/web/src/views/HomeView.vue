<script setup lang="ts">
import HomeComponent from '@/components/HomeComponent.vue'
</script>

<template>
  <main class="w-full h-screen flex items-center justify-center flex-col space-y-4">
    <HomeComponent />
    <nav>
      <RouterLink to="/play" class="text-blue-500 hover:underline">Play</RouterLink>
    </nav>
  </main>
</template>
