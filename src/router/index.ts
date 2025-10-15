import { createRouter, createWebHistory } from 'vue-router'
import TasksView from '@/views/TasksView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/tasks' },
    { path: '/tasks', component: TasksView },
    {
      path: '/tasks/detail',
      component: () => import('@/views/TaskDetailView.vue'),
    },
    { path: '/workers', component: () => import('@/views/WorkersView.vue') },
    {
      path: '/workers/:id/detail',
      name: 'worker-detail',
      component: () => import('@/views/WorkerDetailView.vue'),
    },
    { path: '/tasks/create', component: () => import('@/views/CreateTaskView.vue') },
  ],
})

export default router
