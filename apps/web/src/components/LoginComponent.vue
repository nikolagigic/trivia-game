<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  console.log('>>> ', email.value, password.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4 text-black">
    <input
      :value="email"
      @input="(event) => (email = (event.target as HTMLInputElement)?.value)"
      type="email"
      placeholder="Email"
    />
    <input
      :value="password"
      @input="(event) => (password = (event.target as HTMLInputElement)?.value)"
      type="password"
      placeholder="Password"
    />
    <button type="submit" class="px-2 py-1 bg-white">Login</button>
  </form>
</template>
