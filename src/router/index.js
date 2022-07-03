import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    meta: {
      layout: "main",
      title: "Главная страница | Unique"
    },
    component: Home
  },
  {
    path: '/levels',
    name: 'Levels',
    meta: {
      layout: "main",
      title: "Биржа | Unique"
    },
    component: () => import('../views/Levels.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router