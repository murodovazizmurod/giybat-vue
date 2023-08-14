import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Tema from '../views/TemaView.vue'
import PostView from '../views/PostView.vue'
import NotFound from '../components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tema',
      name: 'tema',
      component: Tema
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostView
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound
    }
  ]
})

export default router
