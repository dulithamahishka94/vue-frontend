import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Forum from '../views/Forum.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/forum',
    name: 'forum',
    component: Forum
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
