import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../views/PlayView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

const verifyToken = async (token?: string | null): Promise<boolean> => {
  if (!token) {
    return false
  }

  try {
    const response = await axios.post(
      'http://localhost:3001/api/verify-token',
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )

    Promise.resolve(response)

    return response.status === 200
  } catch (error) {
    console.error('Error verifying token: ', error)
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    const verified = await verifyToken(token)

    if (!verified) {
      next('/login')
    }

    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
