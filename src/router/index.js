import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

const page = name => () => import('@/views/'+ name);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/test',
    name: 'test',
    component: page('layout/Index.vue'),
  },
  {
    path: '/',
    name: 'index',
    component: Index,
    alias: '/index',
    children: [
      {
        path: '',
        component: page('Welcome.vue')
      },
      {
        path: '/user',
        component: page('user/Index.vue')
      },
      {
        path: '/jobtype',
        component: page('jobtype/Index.vue')
      },
      {
        path: '/job',
        component: page('job/Index.vue')
      },
    ]
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
