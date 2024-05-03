<script setup lang="ts">
import { computed } from 'vue'
import { socket, state } from '@/lib'

const connected = computed(() => state.connected)

const connect = () => {
  socket.connect()
}

const disconnect = () => {
  socket.disconnect()
}

const findMatch = () => {
  socket.emit('find-match', socket.id)
}
</script>

<template>
  <div class="flex flex-col space-y-4 text-black">
    <h1 class="text-white">Connected: {{ connected }}</h1>
    <div class="flex space-x-2">
      <button
        @click="connect"
        :disabled="connected"
        class="bg-white px-2 py-1"
        :class="{
          'bg-gray-300': connected
        }"
      >
        Connect
      </button>
      <button
        @click="disconnect"
        :disabled="!connected"
        class="bg-white px-2 py-1"
        :class="{
          'bg-gray-300': !connected
        }"
      >
        Disconnect
      </button>
    </div>
    <div v-if="connected">
      <button @click="findMatch" class="bg-white px-2 py-1">Find Match</button>
    </div>
  </div>
</template>
