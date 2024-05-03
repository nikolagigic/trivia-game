import { reactive } from 'vue'
import io, { Socket } from 'socket.io-client'

const state = reactive({
  connected: false,
  error: null,
  activeRoom: '',
  opponentId: ''
})

const socket: Socket = io('http://localhost:3001')

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('match-found', ({ room, opponentId }: { room: string; opponentId: string }) => {
  console.log(`Joined room: ${room} with opponent: ${opponentId}`)

  state.activeRoom = room
  state.opponentId = opponentId

  socket.emit('join-room', { socket, room })
})

export { socket, state }
