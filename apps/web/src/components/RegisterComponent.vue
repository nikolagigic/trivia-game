<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

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
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, {
      email,
      password
    })

    success.value = response.data.message
  } catch (error: any) {
    if (error.response) {
      error.value = error.response.data.message
    } else {
      error.value = 'An error occurred. Please try again later.'
    }
  }

  loading.value = false
}
</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register" class="text-black">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit" class="bg-white px-2 py-1" :disabled="loading">Register</button>
      <p v-if="error">{{ error }}</p>
      <p v-if="success">{{ success }}</p>
    </form>
  </div>
</template>
