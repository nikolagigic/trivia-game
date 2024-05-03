<script setup lang="ts">
import { useRouter } from 'vue-router'
import PlayComponent from '@/components/PlayComponent.vue'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')

  router.push('/')
}
</script>

<template>
  <nav>
    <button @click="logout">Logout</button>
  </nav>
  <div class="h-screen w-full flex items-center justify-center">
    <PlayComponent />
  </div>
</template>
