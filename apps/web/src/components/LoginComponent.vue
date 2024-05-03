<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const register = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
      email,
      password
    })

    const { token } = response.data

    localStorage.setItem('token', token)

    success.value = 'Success!'

    router.push('/play')
  } catch (error: any) {
    if (error.response) {
      error.value = 'Invalid email or password. Please try again.'
    } else {
      error.value = 'An error occurred. Please try again later.'
    }
  }

  loading.value = false
}
</script>

<template>
  <div class="flex flex-col space-y-4">
    <h1>Login</h1>
    <form @submit.prevent="register" class="text-black">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit" class="bg-white px-2 py-1" :disabled="loading">Login</button>
      <p v-if="error">{{ error }}</p>
      <p v-if="success" class="text-green-500">{{ success }}</p>
    </form>
  </div>
</template>
