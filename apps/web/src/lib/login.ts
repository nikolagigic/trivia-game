import axios from 'axios'

export const login = async (email: string, password: string) => {
  const response = await axios.post('http://localhost:3001/api/login', {
    email,
    password
  })

  if (response.status !== 200) {
    throw new Error('Unable to login')
  }

  const { token } = response.data

  return token
}

export default login
