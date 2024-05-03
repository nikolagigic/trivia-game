<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const token = ref(localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')

  router.push('/')
}
</script>

<template>
  <nav>
    <div v-if="token">
      <button @click="logout">Logout</button>
    </div>
  </nav>
</template>
